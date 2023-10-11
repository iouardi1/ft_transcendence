import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDTO } from '../dto/messageDTO';
import { dmDTO } from '../dto/dmDTO';
import { roomDTO } from '../dto/roomDTO';
import { roomInviteDTO } from '../dto/roomInviteDTO';
import { friendRequestDTO } from 'src/dto/friendRequestDTO';
import { roomJoinDTO } from 'src/dto/roomJoinDTO';
import { actionDTO } from '../dto/actionDTO';
import { Socket, Server } from 'socket.io';
import { DM, RoomMember } from '@prisma/client';
import { map } from 'rxjs';
import { send } from 'process';
import { join } from 'path';
import { WebSocketServer } from '@nestjs/websockets';

interface notifInfo {
  senderId: string;
  type: string;
  roomId?: number;
  matchId?: number;
}

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(client: Socket, payload: messageDTO, server: Server) {
    console.log(payload);
    const message = await this.prismaService.message.create({
      data: {
        sentAt: payload.sentAt,
        messageContent: payload.messageContent,
        dmId: payload.dmId ? payload.dmId : null,
        roomId: payload.dmId ? null : payload.roomId,
        senderId: payload.userId,
      },
    });
    if (payload.dmId) {
      await this.prismaService.dM.update({
        where: {
          id: payload.dmId,
        },
        data: {
          msg: {
            connect: {
              id: message.id,
            },
          },
          lastUpdate: new Date(),
        },
      });
    } else {
      await this.prismaService.room.update({
        where: {
          id: payload.roomId,
        },
        data: {
          msgs: {
            connect: {
              id: message.id,
            },
          },
          lastUpdate: new Date(),
        },
      });
    }
    await this.prismaService.user.update({
      where: {
        userId: payload.userId,
      },
      data: {
        messages: {
          connect: {
            id: message.id,
          },
        },
      },
    });
    //server vs client emit
    if (payload.dmId)
      client.to(payload.dmId.toString().concat('dm')).emit('createdMessage', message);
    else
    {
      client.to(payload.roomId.toString().concat('room')).emit('createdMessage', message);
    }
  }

  async createDm(client: Socket, payload: dmDTO, mapy: Map<string, Socket>) {
    console.log(payload);
    const user = await this.prismaService.user.findUnique({
      where: {
        username: payload.receiverName,
      },
    });
    console.log(user);
    const dm = await this.prismaService.dM.create({
      data: {
        creatorId: payload.senderId,
        participants: {
          connect: [{userId: payload.senderId}, {userId: user.userId}]
        }
      }
    });
    
    console.log('AFTER BRUH');
    client.emit('createdDm', dm.id);
    /* fetching the socket by its key(username),
    and using it to emit to the addressee.*/
    mapy.get(user.userId).emit('createdDm', dm.id);
    client.join(dm.id.toString().concat('dm'));
    mapy.get(user.userId).join(dm.id.toString().concat('dm'));
  }

  async createRoom(
    client: Socket,
    payload: roomDTO,
    mapy: Map<string, Socket>,
  ) {
    console.log(payload);
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: payload.ownerId,
      },
    });
    console.log(user);
    const room = await this.prismaService.room.create({
      data: {
        image: payload.image ? payload.image : "",
        RoomName: payload.roomName,
        visibility: payload.visibility,
        password: payload.password ? payload.password : null,
      },
    });
    const roomMember = await this.prismaService.roomMember.create({
      data: {
        RoomId: room.id,
        memberId: user.userId,
        role: 'OWNER',
        joinTime: payload.joinTime,
      },
    });
    await this.prismaService.room.update({
      where: {
        id: room.id,
      },
      data: {
        RoomMembers: {
          connect: {
            id: roomMember.id,
          },
        },
      },
    });
    await this.prismaService.user.update({
      where: {
        userId: payload.ownerId,
      },
      data: {
        rooms: {
          connect: {
            id: roomMember.id,
          },
        },
      },
    });
    console.log('AFTER BRUH');
    client.emit('createdRoom', room);
  }

  async changeRoomVisibility(visibilityPair: [number, string, string]) {
    await this.prismaService.room.update({
      where: {
        id: visibilityPair[0],
      },
      data: {
        visibility: visibilityPair[1],
        password: visibilityPair[2] ? visibilityPair[2] : null,
      },
    });
  }

  async getUserNotifications(notifiedUser: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: notifiedUser,
      },
      include: {
        participantNotifs: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    return user.participantNotifs;
  }

  async notifProcessing(
    mapy: Map<string, Socket>,
    subject: string,
    notifInfo: notifInfo,
  ) {
    const notifications = await this.getUserNotifications(subject);
    if (notifications.length < 100) {
      const notif = await this.prismaService.notification.create({
        data: notifInfo,
      });
      await this.prismaService.user.update({
        where: {
          userId: subject,
        },
        data: {
          participantNotifs: {
            connect: {
              id: notif.id,
            },
          },
        },
      });
      mapy.get(subject).emit('notifSent', notif);
    } else {
      const oldestNotification = notifications[0];
      const notif = await this.prismaService.notification.update({
        where: {
          id: oldestNotification.id,
        },
        data: notifInfo,
      });
      mapy.get(subject).emit('notifSent', notif);
    }
  }

  async sendRoomInvite(
    client: Socket,
    payload: roomInviteDTO,
    mapy: Map<string, Socket>,
  ) {
    let info: notifInfo;

    info = {
      senderId: payload.senderId,
      type: 'roomInvite',
      roomId: payload.roomId,
    };
    this.notifProcessing(mapy, payload.invitee, info);
    const invitee = await this.prismaService.user.findUnique({
      where: {
        userId: payload.invitee,
      },
    });
    await this.prismaService.user.update({
      where: {
        userId: payload.senderId,
      },
      data: {
        roomInvites: {
          push: { userId: invitee, roomId: payload.roomId, date: Date() },
        },
      },
    });
  }

  async roomInviteApproval(
    client: Socket,
    payload: roomInviteDTO,
    mapy: Map<string, Socket>,
  ) {
    const roomToJoin = await this.prismaService.room.findUnique({
      where: {
        id: payload.roomId,
      },
      select: {
        bannedUsers: true,
      },
    });
    if (roomToJoin.bannedUsers.includes(payload.invitee))
    {
      client.emit('joinedRoom', "failure | banned");
      return ;
    }
    client.join(payload.roomId.toString().concat('room'));
    //change notif state
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
        interactedWith: true,
      },
    });
    const invitee = await this.prismaService.user.findUnique({
      where: {
        userId: payload.invitee,
      },
    });
    const roomMember = await this.prismaService.roomMember.create({
      data: {
        RoomId: payload.roomId,
        memberId: invitee.userId,
        role: 'USER',
        joinTime: Date(),
        inviterId: payload.senderId,
      },
    });
    const room = await this.prismaService.room.update({
      where: {
        id: payload.roomId,
      },
      data: {
        RoomMembers: {
          connect: {
            id: roomMember.id,
          },
        },
      },
    });
    //update the invitee
    await this.prismaService.user.update({
      where: {
        userId: payload.invitee,
      },
      data: {
        rooms: {
          connect: {
            id: roomMember.id,
          },
        },
      },
    });
    client.emit('joinedRoom', room); //emit room to invitee

    const sender = await this.prismaService.user.findUnique({
      where: {
        userId: payload.senderId,
      },
    });
    let info: notifInfo;

    info = { senderId: payload.senderId, type: 'roomInviteApproved' };
    this.notifProcessing(mapy, sender.userId, info);
    const updatedRoomInvites = sender.roomInvites.filter((element: any) => {
      return element.userId !== invitee.userId;
    });
    await this.prismaService.user.update({
      where: {
        id: sender.id,
      },
      data: {
        roomInvites: updatedRoomInvites,
      },
    });
  }

  async roomInviteRejection(payload: roomInviteDTO, mapy: Map<string, Socket>) {
    //change notif state
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
        interactedWith: true,
      },
    });

    const sender = await this.prismaService.user.findUnique({
      where: {
        userId: payload.senderId,
      },
    });
    let info: notifInfo;

    info = { senderId: payload.senderId, type: 'roomInviteRejected' };
    this.notifProcessing(mapy, sender.userId, info);

    const invitee = await this.prismaService.user.findUnique({
      where: {
        userId: payload.invitee,
      },
    });
    const updatedRoomInvites = sender.roomInvites.filter((element: any) => {
      return element.userId !== invitee.userId;
    });
    await this.prismaService.user.update({
      where: {
        id: sender.id,
      },
      data: {
        roomInvites: updatedRoomInvites,
      },
    });
  }

  async notifClicked(payload: roomInviteDTO) {
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
      },
    });
  }

  async getRoomMemberId(payload: actionDTO) {
    let roomMemberId: number;
  
    const subject = await this.prismaService.user.findUnique({
      where: {
        userId: payload.subjectId,
      },
      include: {
        rooms: true,
      },
    });
    for (let i = 0; i < subject.rooms.length; i++) {
      if (subject.rooms[i].RoomId == payload.roomId)
        roomMemberId = subject.rooms[i].id;
    }
    return {roomMemberId, subject};
  }

  async promoteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    const data = await this.getRoomMemberId(payload);
    
    await this.prismaService.roomMember.update({
      where: {
        id: data.roomMemberId,
      },
      data: {
        role: 'ADMIN',
      },
    });
    let info: notifInfo;

    info = { senderId: payload.userId, type: 'promotion' };
    this.notifProcessing(mapy, data.subject.userId, info);
  }

  async demoteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    const data = await this.getRoomMemberId(payload);
    
    await this.prismaService.roomMember.update({
      where: {
        id: data.roomMemberId,
      },
      data: {
        role: 'USER',
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'demotion' };
    this.notifProcessing(mapy, data.subject.userId, info);
  }

  async muteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    const data = await this.getRoomMemberId(payload);
    
    await this.prismaService.roomMember.update({
      where: {
        id: data.roomMemberId,
      },
      data: {
        muted: true,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'mute' };
    this.notifProcessing(mapy, data.subject.userId, info);
    mapy.get(data.subject.userId).emit('muted');
  }

  async kickUser(payload: actionDTO, mapy: Map<string, Socket>) {
    const data = await this.getRoomMemberId(payload);

    await this.prismaService.roomMember.delete({
      where: {
        id: data.roomMemberId,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'kick' };
    this.notifProcessing(mapy, data.subject.userId, info);
    mapy.get(data.subject.userId).emit('kicked', payload.roomId);
  }

  async banUser(payload: actionDTO, mapy: Map<string, Socket>) {
    const data = await this.getRoomMemberId(payload);
    await this.prismaService.roomMember.delete({
      where: {
        id: data.roomMemberId,
      },
    });

    await this.prismaService.room.update({
      where: {
        id: payload.roomId,
      },
      data: {
        bannedUsers: {
          push: data.subject.userId,
        },
      },
    })

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'ban' };
    this.notifProcessing(mapy, data.subject.userId, info);
    mapy.get(data.subject.userId).emit('banned', payload.roomId);
  }

  async unbanUser(payload: actionDTO, mapy: Map<string, Socket>) {
    const subject = await this.prismaService.user.findUnique({
      where: {
        userId: payload.subjectId,
      },
    });
    const room = await this.prismaService.room.findUnique({
      where: {
        id: payload.roomId,
      },
      select: {
        bannedUsers: true,
      },
    });

    const updatedBannedUsers = room.bannedUsers.filter(userId => userId !== subject.userId);
    await this.prismaService.room.update({
      where: {
        id: payload.roomId,
      },
      data: {
        bannedUsers: updatedBannedUsers,
      },
    })

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'unban' };
    this.notifProcessing(mapy, subject.userId, info);
    mapy.get(subject.userId).emit('unbanned', payload.roomId);
  }

  async OwnershipTransfer(payload: actionDTO, mapy: Map<string, Socket>) {
    const data = await this.getRoomMemberId(payload);
    await this.prismaService.roomMember.update({
      where: {
        id: data.roomMemberId,
      },
      data: {
        role: 'OWNER',
      },
    });
    const owner = await this.prismaService.user.findUnique({
      where: {
        userId: payload.userId,
      },
      include: {
        rooms: true,
      },
    });
    let roomMemberId: number;
    for (let i = 0; i < owner.rooms.length; i++) {
      if (owner.rooms[i].RoomId == payload.roomId)
        roomMemberId = owner.rooms[i].id;
    }
    await this.prismaService.roomMember.update({
      where: {
        id: roomMemberId,
      },
      data: {
        role: 'USER',
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'ownership transfer' };
    this.notifProcessing(mapy, data.subject.userId, info);
  }

  async verifyMessageVisibility(
    client: Socket,
    senderId: string,
    mapy: Map<string, Socket>,
  ) {
    let userId: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) userId = entry[0];
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
    user.blockedUsers.includes(senderId)
      ? client.emit('blockFeedback', 'display')
      : client.emit('blockFeedback', 'no display');
  }

  async blockUser(
    client: Socket,
    blockedUserId: string,
    mapy: Map<string, Socket>,
  ) {
    let blocker: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) blocker = entry[0];
    }
    await this.prismaService.user.update({
      where: {
        userId: blocker,
      },
      data: {
        blockedUsers: {
          push: blockedUserId,
        },
      },
    });
  }

  async sendFriendRequest(
    client: Socket,
    befriendedUserId: number,
    mapy: Map<string, Socket>,
  ) {
    let issuerId: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) issuerId = entry[0];
    }
    //send notif to subject
    const notifSender = await this.prismaService.user.findUnique({
      where: {
        userId: issuerId,
      },
    });
    const befriendedUser = await this.prismaService.user.findUnique({
      where: {
        id: befriendedUserId,
      },
    });
    let info: notifInfo;

    info = {
      senderId: notifSender.userId,
      type: 'friendRequest',
    };
    this.notifProcessing(mapy, befriendedUser.userId, info);
    //modify issuer's friendlist
    await this.prismaService.user.update({
      where: {
        userId: issuerId,
      },
      data: {
        friends: {
          push: { userId: befriendedUser.userId, state: 'pending', date: Date() },
        },
      },
    });
  }

  async friendRequestApproval(
    payload: friendRequestDTO,
    mapy: Map<string, Socket>,
  ) {
    //modify the befriendedUser's notif
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
        interactedWith: true,
      },
    });
    await this.prismaService.user.update({
      where: {
        userId: payload.befriendedUserId,
      },
      data: {
        friends: {
          push: { userId: payload.issuerId, state: 'approved', date: Date() },
        },
      },
    });
    const issuer = await this.prismaService.user.findUnique({
      where: { userId: payload.issuerId },
    });
    const updatedFriends = issuer.friends.map((element: any) => {
      if (element.userId === payload.befriendedUserId) {
        return { userId: payload.issuerId, state: 'approved', date: Date() };
      }
      return element;
    });
    await this.prismaService.user.update({
      where: {
        userId: payload.issuerId,
      },
      data: {
        friends: updatedFriends,
      },
    });
    let info: notifInfo;

    info = {
      senderId: payload.befriendedUserId,
      type: 'friendRequestApproved',
    };
    this.notifProcessing(mapy, issuer.userId, info);
  }

  async friendRequestRejection(
    payload: friendRequestDTO,
    mapy: Map<string, Socket>,
  ) {
    //modify the befriendedUser's notif
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
        interactedWith: true,
      },
    });
    const issuer = await this.prismaService.user.findUnique({
      where: {
        userId: payload.issuerId,
      },
    });
    const updatedFriends = issuer.friends.filter((element: any) => {
      return element.userId !== payload.befriendedUserId;
    });
    await this.prismaService.user.update({
      where: {
        userId: payload.issuerId,
      },
      data: {
        friends: updatedFriends,
      },
    });
    let info: notifInfo;

    info = {
      senderId: payload.befriendedUserId,
      type: 'friendRequestRejected',
    };
    this.notifProcessing(mapy, issuer.userId, info);
  }

  async roomJoinLogic(
    client: Socket,
    payload: roomJoinDTO,
  ) {
    client.join(payload.roomId.toString().concat('room'));

    const joiner = await this.prismaService.user.findUnique({
      where: {
        userId: payload.userId,
      },
    });
    const roomMember = await this.prismaService.roomMember.create({
      data: {
        RoomId: payload.roomId,
        memberId: joiner.userId,
        role: 'USER',
        joinTime: payload.joinDate,
      },
    });
    const room = await this.prismaService.room.update({
      where: {
        id: payload.roomId,
      },
      data: {
        RoomMembers: {
          connect: {
            id: roomMember.id,
          },
        },
      },
    });
    await this.prismaService.user.update({
      where: {
        userId: joiner.userId,
      },
      data: {
        rooms: {
          connect: {
            id: roomMember.id,
          },
        },
      },
    });
    client.emit('joinedRoom', "success");
  }

  async roomJoin(
    client: Socket,
    payload: roomJoinDTO,
  ) {

    const roomToJoin = await this.prismaService.room.findUnique({
      where: {
        id: payload.roomId,
      },
      select: {
        password: true,
        bannedUsers: true,
      },
    });
    if (roomToJoin.bannedUsers.includes(payload.userId))
    {
      client.emit('joinedRoom', "failure | banned");
      return ;
    }


    if (payload.visibility == 'public') {
      console.log("dkhlti hnaa ? (public) :3");
      this.roomJoinLogic(client, payload);
    } else {
      console.log("dkhlti hnaa ? :3");
      if (roomToJoin.password == payload.password) {
        this.roomJoinLogic(client, payload);
      } else {
        console.log(roomToJoin.password, payload.password)
        client.emit('joinedRoom', "failure");
      }
    }
  }

  async roomExit(client: Socket, roomId: number, mapy: Map<string, Socket>) {
    let userId: string;

    for (let entry of mapy.entries()) {
      if (entry[1] == client) userId = entry[0];
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
    const room = await this.prismaService.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        RoomMembers: true,
      },
    });
    let roomMemberId: number;
    for (let i = 0; i < room.RoomMembers.length; i++) {
      if (room.RoomMembers[i].memberId == userId)
        roomMemberId = room.RoomMembers[i].id;
    }
    const roomMember = await this.prismaService.roomMember.findUnique({
      where: {
        id: roomMemberId,
      },
    });
    if (roomMember.inviterId) {
      const inviter = await this.prismaService.user.findUnique({
        where: {
          userId: roomMember.inviterId,
        },
      });
      const updatedRoomInvites = inviter.roomInvites.filter((element: any) => {
        return element.userId !== userId;
      });
      await this.prismaService.user.update({
        where: {
          userId: roomMember.inviterId,
        },
        data: {
          roomInvites: updatedRoomInvites,
        },
      });
    }

    await this.prismaService.room.update({
      where: {
        id: roomId,
      },
      data: {
        RoomMembers: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
    await this.prismaService.user.update({
      where: {
        userId: userId,
      },
      data: {
        rooms: {
          disconnect: {
            id: roomId,
          },
        },
      },
    });
  }

  async fetchState(client: Socket, userId: string) {
    console.log(userId);
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        dms: true,
        rooms: true,
        participantNotifs: true,
      },
    });
    if (user.dms) {
      user.dms.forEach((dm) => {
        client.join(dm.id.toString().concat('dm'));
      });
    }
    if (user.rooms) {
      user.rooms.forEach((room) => {
        client.join(room.RoomId.toString().concat('room'));
      });
    }
  }
}
