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
    await Promise.all(asyncOperations);
    console.log(customArray);
    return {
      msgs: customArray,
      roomName: room.RoomName,
      roomImage: room.image,
      roomId: room.id,
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
      },
    });
    const filteredRooms = rooms.filter((room: any) => {
      if (room.visibility != 'private') return room;
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
            displayName: true,
            image: true,
          },
        },
        msg: true,
      },
      orderBy: {
        lastUpdate: 'desc',
      },
    });

    const customArray = dms.map((dm) => ({
      dmId: dm.id,
      messages: dm.msg,
      participants: dm.participants,
    }));

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
        AND: {
          NOT: {
            dms: {
              some: {
                id: {
                  in: dmIds,
                },
              },
            },
            blockedUsers: {
              has: userId,
            },
          },
          userId: {
            not: userId,
          },
        },
      },
    });
    console.log(users);
    return users;
  }
}
