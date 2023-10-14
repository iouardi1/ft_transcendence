import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { async } from 'rxjs';
import { roomDTO } from 'src/dto/roomDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { Socket } from 'socket.io';
import { RoomMember, Room, User, DM, Message } from '@prisma/client';

@Injectable()
export class HttpService {
  constructor(private prismaService: PrismaService) {}
  async fetchRooms(userId: string) {
    const rooms = await this.prismaService.room.findMany({
      where: {
        RoomMembers: {
          some: {
            memberId: userId,
          },
        },
      },
      include: {
        msgs: true,
      },
      orderBy: {
        lastUpdate: 'desc',
      },
    });
    return rooms;
  }

  async checkBlocked(userId: string, blockedUserId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });

    return user.blockedUsers.includes(blockedUserId);
  }

  async fetchRoomContent(roomId: number, userId: string) {
    let customArray: [any, string][] = [];
    let muted: boolean = false;
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        image: true,
        rooms: true,
      },
    });
    const room = await this.prismaService.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        msgs: true,
      },
    });
    const asyncOperations = room.msgs.map(async (msg) => {
      if (!(await this.checkBlocked(userId, msg.senderId))) {
        const sender = await this.prismaService.user.findUnique({
          where: {
            userId: msg.senderId,
          },
        });
        customArray.push([msg, sender.image]);
      }
    });
    for (let i = 0; i < user.rooms.length; i++) {
      if (user.rooms[i].RoomId == roomId && user.rooms[i].muted == true)
        muted = true;
    }
    await Promise.all(asyncOperations);
    console.log(customArray);
    return {
      msgs: customArray,
      roomName: room.RoomName,
      roomImage: room.image,
      roomId: room.id,
      userImage: user.image,
      muted: muted,
    };
  }

  async fetchRoomsToJoin(userId: string) {
    const rooms = await this.prismaService.room.findMany({
      where: {
        NOT: {
          RoomMembers: {
            some: {
              memberId: userId,
            },
          },
        },
      },
      select: {
        id: true,
        image: true,
        RoomName: true,
        visibility: true,
        password: true,
        bannedUsers: true,
      },
    });
    const filteredRooms = rooms.filter((room: Room) => {
      if (room.visibility != 'private' && !room.bannedUsers.includes(userId))
        return room;
    });
    return filteredRooms;
  }

  async fetchDMs(userId: string) {
    const dms = await this.prismaService.dM.findMany({
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
        OR: [
          {
            msg: {
              some: {}, // not empty
            },
          },
          {
            NOT: {
              msg: {
                some: {},
              },
            },
            AND: {
              creatorId: userId,
            },
          },
        ],
      },
      include: {
        participants: {
          where: {
            NOT: {
              userId: userId,
            },
          },
          select: {
            userId: true,
            displayName: true,
            image: true,
            blockedUsers: true,
          },
        },
        msg: true,
      },
      orderBy: {
        lastUpdate: 'desc',
      },
    });

    const currentUser = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
    let customArray: [number, Message[], User[]][] = [];
    dms.forEach((dm: { participants: User[]; msg: Message[] } & DM) => {
      console.log(dm.participants[0]);
      if (
        !dm.participants[0].blockedUsers.includes(userId) &&
        !currentUser.blockedUsers.includes(dm.participants[0].userId)
      ) {
        console.log(dm.participants[0].userId);
        customArray.push([dm.id, dm.msg, dm.participants]);
      }
    });
    console.log(customArray);
    return customArray;
  }

  async fetchDMContent(dmId: number, userId: string) {
    const dm = await this.prismaService.dM.findUnique({
      where: {
        id: dmId,
      },
      include: {
        participants: {
          where: {
            NOT: {
              userId: userId,
            },
          },
          select: {
            userId: true,
            displayName: true,
            image: true,
          },
        },
        msg: true,
      },
    });
    const ownImage = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        image: true,
      },
    });
    console.log("DMMMMMM == ", dm);
    return { dm: dm, image: ownImage };
  }

  async addPeopleFetch(userId: string) {
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        dms: true,
      },
    });
    const blockedUserIds = currentUser.blockedUsers.map(
      (blockedUser) => blockedUser,
    );
    const dmIds = currentUser.dms.map((dm) => dm.id);

    const users = await this.prismaService.user.findMany({
      where: {
        NOT: {
          userId: {
            in: blockedUserIds,
          },
        },
        AND: [
          {
            NOT: {
              dms: {
                some: {
                  id: {
                    in: dmIds,
                  },
                },
              },
            },
          },
        ],
        userId: {
          not: userId,
        },
      },
    });
    const filteredUsers = users.filter((user) => {
      if (!user.blockedUsers.includes(userId)) {
        return user;
      }
    })

    return filteredUsers;
  }

  async fetchRoomSuggestions(roomId: number, userId: string) {
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
    const subjectRoom = await this.prismaService.room.findUnique({
        where: {
            id: roomId,
        },
        select: {
            bannedUsers: true,
        },
    })
    const users = await this.prismaService.user.findMany({
      where: {
        OR:[
            {
                rooms: {
                  some: {
                    NOT: {
                      RoomId: roomId,
                    },
                  },
                },
            },
            {
                rooms: {
                    none: {},
                },
            }
        ],
        NOT: {
            OR: [
                {
                      userId: {
                        in: currentUser.blockedUsers,
                      },
                },
                {
                    userId: {
                        in: subjectRoom.bannedUsers,
                      },
                },
            ],
          
              blockedUsers: {
                  has: userId,
              },
        },
        
    }})
    const filteredUsers = users.filter((user) => {
        for (let i = 0; i < currentUser.roomInvites.length; i++) {
            if (currentUser.roomInvites[i][0] == user.userId && currentUser.roomInvites[i][1] == roomId) {
              const date = new Date(currentUser.roomInvites[i][2]);
              const newDate = new Date();
              const dateDiff = (newDate.getTime() - date.getTime()) / (1000 * 60 * 60);
              return dateDiff >= 24;
            }
        }
    })
    console.log(filteredUsers);
    return users;
  }

  sortMembers(members: ({rooms: RoomMember[];} & User)[], room: ({RoomMembers: RoomMember[];} & Room)) {
    let sortedMembers: ({rooms: RoomMember[];} & User)[] = [];
    let owner: ({rooms: RoomMember[];} & User);
    let admins: ({rooms: RoomMember[];} & User)[] = [];
    let users: ({rooms: RoomMember[];} & User)[] = [];
    
    members.forEach((member) => {
      if (member.rooms[0].role == 'OWNER')
          owner = member;
      if (member.rooms[0].role == 'ADMIN')
          admins.push(member);
      if (member.rooms[0].role == 'USER')
          users.push(member);
    })
    sortedMembers.push(owner, ...admins, ...users);
    return sortedMembers;
  }

  async fetchRoomDashboard(roomId: number, userId: string) {
    const room = await this.prismaService.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        RoomMembers: true,
      }
    });
    const members = await this.prismaService.user.findMany({
      where: {
        rooms: {
          some: {
            RoomId: roomId,
          }
        },
      },
      include: {
        rooms: {
          where:{
            RoomId: roomId,
          }
        },
      },
    });
    const fetcher = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        rooms: true,
      },
    });
    let roomMemberId: number;
    for (let i = 0; i < fetcher.rooms.length; i++) {
      if (fetcher.rooms[i].RoomId == roomId)
        roomMemberId = fetcher.rooms[i].id;
    }
    const roomMember = await this.prismaService.roomMember.findUnique({
      where: {
        id: roomMemberId,
      },
      select: {
        role: true,
      },
    });
    console.log(this.sortMembers(members, room))
    return ({room: room, participants: this.sortMembers(members, room), role: roomMember.role});
  }

}