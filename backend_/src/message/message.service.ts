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
import { DM } from '@prisma/client';
import { map } from 'rxjs';
import { send } from 'process';
import { join } from 'path';

interface notifInfo {
  senderId: number;
  type: string;
  roomId?: number;
  matchId?: number;
}

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(client: Socket, payload: messageDTO) {
    console.log(payload);

    let conversationType: string;
    payload.dmId ? (conversationType = 'dm') : (conversationType = 'room');
    const message = await this.prismaService.message.create({
      data: {
        sentAt: payload.sentAt,
        messageContent: payload.messageContent,
        dmId: (conversationType = 'dm') ? payload.dmId : -1,
        roomId: (conversationType = 'room') ? payload.roomId : -1,
        userId: payload.userId,
      },
    });
    if ((conversationType = 'dm')) {
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
        },
      });
    }
    await this.prismaService.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        messages: {
          connect: {
            id: message.id,
          },
        },
      },
    });
    if ((conversationType = 'dm'))
      client
        .to(payload.dmId.toString().concat('dm'))
        .emit('createdMessage', message);
    else
      client
        .to(payload.roomId.toString().concat('room'))
        .emit('createdMessage', message);
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
        participantId: user.id,
      },
    });
    await this.prismaService.user.update({
      where: {
        id: payload.senderId,
      },
      data: {
        dmAdmin: {
          connect: {
            id: dm.id,
          },
        },
      },
    });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        dmAdmin: {
          connect: {
            id: dm.id,
          },
        },
      },
    });
    console.log('AFTER BRUH');
    client.emit('createdDm', dm.id);
    /* fetching the socket by its key(username),
    and using it to emit to the addressee.*/
    mapy.get(user.username).emit('createdDm', dm.id);
    client.join(dm.id.toString().concat('dm'));
    mapy.get(user.username).join(dm.id.toString().concat('dm'));
  }

  async createRoom(
    client: Socket,
    payload: roomDTO,
    mapy: Map<string, Socket>,
  ) {
    console.log(payload);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.ownerId,
      },
    });
    console.log(user);
    const room = await this.prismaService.room.create({
      data: {
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
        id: roomMember.id,
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
        id: payload.ownerId,
      },
      data: {
        rooms: {
          connect: {
            id: room.id,
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
        username: notifiedUser,
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
      const notifiedUser = await this.prismaService.user.update({
        where: {
          username: subject,
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
    console.log(payload);
    /* Fetch the inviter's username, will come in handy later */
    let notifSenderName: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) notifSenderName = entry[0];
    }
    const notifSender = await this.prismaService.user.findUnique({
      where: {
        username: notifSenderName,
      },
    });
    let info: notifInfo;

    info = {
      senderId: notifSender.id,
      type: 'roomInvite',
      roomId: payload.roomId,
    };
    this.notifProcessing(mapy, payload.invitee, info);
    const invitee = await this.prismaService.user.findUnique({
      where: {
        username: payload.invitee,
      },
    });
    await this.prismaService.user.update({
      where: {
        id: notifSender.id,
      },
      data: {
        roomInvites: {
          push: { id: invitee.id, state: 'pending', date: Date() },
        },
      },
    });
    // const notifications = await this.getUserNotifications(payload.invitee);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: notifSender.id,
    //       type: 'roomInvite',
    //       roomId: payload.roomId,
    //     },
    //   });
    //   const notifiedUser = await this.prismaService.user.update({
    //     where: {
    //       username: payload.invitee,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   client.emit('inviteSent');
    //   mapy.get(payload.invitee).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: notifSender.id,
    //       type: 'roomInvite',
    //       roomId: payload.roomId,
    //     },
    //   });
    //   client.emit('inviteSent');
    //   mapy.get(payload.invitee).emit('notifSent', notif);
    // }
  }

  async roomInviteApproval(
    client: Socket,
    payload: roomInviteDTO,
    mapy: Map<string, Socket>,
  ) {
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
        username: payload.invitee,
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
        username: payload.invitee,
      },
      data: {
        rooms: {
          connect: {
            id: room.id,
          },
        },
      },
    });
    client.emit('joinedRoom', room); //emit room to invitee

    const sender = await this.prismaService.user.findUnique({
      where: {
        id: payload.senderId,
      },
    });
    let info: notifInfo;

    info = { senderId: payload.senderId, type: 'roomInviteApproved' };
    this.notifProcessing(mapy, sender.username, info);
    // const notifications = await this.getUserNotifications(sender.username);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: payload.senderId,
    //       type: 'roomInviteApproved',
    //     },
    //   });
    //   await this.prismaService.user.update({
    //     where: {
    //       username: sender.username,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   mapy.get(sender.username).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: payload.senderId,
    //       type: 'roomInviteApproved',
    //     },
    //   });
    //   mapy.get(sender.username).emit('notifSent', notif);
    // }
    const updatedRoomInvites = sender.roomInvites.map((element: any) => {
      if (element.id === invitee.id) {
        return { id: invitee.id, state: 'approved', date: Date() };
      }
      return element;
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
        id: payload.senderId,
      },
    });
    let info: notifInfo;

    info = { senderId: payload.senderId, type: 'roomInviteRejected' };
    this.notifProcessing(mapy, sender.username, info);

    const invitee = await this.prismaService.user.findUnique({
      where: {
        username: payload.invitee,
      },
    });
    const updatedRoomInvites = sender.roomInvites.filter((element: any) => {
      return element.id !== invitee.id;
    });
    await this.prismaService.user.update({
      where: {
        id: sender.id,
      },
      data: {
        roomInvites: updatedRoomInvites,
      },
    });
    // const notifications = await this.getUserNotifications(sender.username);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: payload.senderId,
    //       type: 'roomInviteRejected',
    //     },
    //   });
    //   await this.prismaService.user.update({
    //     where: {
    //       username: sender.username,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   mapy.get(sender.username).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: payload.senderId,
    //       type: 'roomInviteRejected',
    //     },
    //   });
    //   mapy.get(sender.username).emit('notifSent', notif);
    // }
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

  async promoteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
      data: {
        role: 'ADMIN',
      },
    });

    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'promotion' };
    this.notifProcessing(mapy, subject.username, info);
    // const notifications = await this.getUserNotifications(subject.username);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: payload.userId,
    //       type: 'promotion',
    //     },
    //   });
    //   await this.prismaService.user.update({
    //     where: {
    //       username: subject.username,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: payload.userId,
    //       type: 'promotion',
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // }
  }

  async demoteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
      data: {
        role: 'USER',
      },
    });

    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'demotion' };
    this.notifProcessing(mapy, subject.username, info);
    // const notifications = await this.getUserNotifications(subject.username);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: payload.userId,
    //       type: 'demotion',
    //     },
    //   });
    //   await this.prismaService.user.update({
    //     where: {
    //       username: subject.username,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: payload.userId,
    //       type: 'demotion',
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // }
  }

  async muteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
      data: {
        muted: true,
      },
    });

    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'mute' };
    this.notifProcessing(mapy, subject.username, info);
    // const notifications = await this.getUserNotifications(subject.username);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: payload.userId,
    //       type: 'mute',
    //     },
    //   });
    //   await this.prismaService.user.update({
    //     where: {
    //       username: subject.username,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: payload.userId,
    //       type: 'mute',
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // }
    mapy.get(subject.username).emit('muted');
  }

  async kickUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.delete({
      where: {
        id: payload.subjectId,
      },
    });

    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'kick' };
    this.notifProcessing(mapy, subject.username, info);
    // const notifications = await this.getUserNotifications(subject.username);
    // if (notifications.length < 10) {
    //   const notif = await this.prismaService.notification.create({
    //     data: {
    //       senderId: payload.userId,
    //       type: 'kick',
    //     },
    //   });
    //   await this.prismaService.user.update({
    //     where: {
    //       username: subject.username,
    //     },
    //     data: {
    //       participantNotifs: {
    //         connect: {
    //           id: notif.id,
    //         },
    //       },
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // } else {
    //   const oldestNotification = notifications[0];
    //   const notif = await this.prismaService.notification.update({
    //     where: {
    //       id: oldestNotification.id,
    //     },
    //     data: {
    //       senderId: payload.userId,
    //       type: 'kick',
    //     },
    //   });
    //   mapy.get(subject.username).emit('notifSent', notif);
    // }
    mapy.get(subject.username).emit('kicked', payload.roomId);
  }

  async OwnershipTransfer(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
	  data: {
		role: 'OWNER',
	  }
    });
	await this.prismaService.roomMember.update({
		where: {
		  id: payload.userId,
		},
		data: {
		  role: 'USER',
		}
	  });

    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      },
    });

    let info: notifInfo;

    info = { senderId: payload.userId, type: 'ownership transfer' };
    this.notifProcessing(mapy, subject.username, info);
  }

  async verifyMessageVisibility(
    client: Socket,
    senderId: number,
    mapy: Map<string, Socket>,
  ) {
    let username: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) username = entry[0];
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
    user.blockedUsers.includes(senderId)
      ? client.emit('blockFeedback', 'display')
      : client.emit('blockFeedback', 'no display');
  }

  async blockUser(
    client: Socket,
    blockedUserId: number,
    mapy: Map<string, Socket>,
  ) {
    let blocker: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) blocker = entry[0];
    }
    await this.prismaService.user.update({
      where: {
        username: blocker,
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
    let issuer: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) issuer = entry[0];
    }
    //send notif to subject
    const notifSender = await this.prismaService.user.findUnique({
      where: {
        username: issuer,
      },
    });
    const befriendedUser = await this.prismaService.user.findUnique({
      where: {
        id: befriendedUserId,
      },
    });
    let info: notifInfo;

    info = {
      senderId: notifSender.id,
      type: 'friendRequest',
    };
    this.notifProcessing(mapy, befriendedUser.username, info);
    //modify issuer's friendlist
    await this.prismaService.user.update({
      where: {
        username: issuer,
      },
      data: {
        friends: {
          push: { id: befriendedUser.id, state: 'pending', date: Date() },
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
        id: payload.befriendedUserId,
      },
      data: {
        friends: {
          push: { id: payload.issuerId, state: 'approved', date: Date() },
        },
      },
    });
    const issuer = await this.prismaService.user.findUnique({
      where: { id: payload.issuerId },
    });
    const updatedFriends = issuer.friends.map((element: any) => {
      if (element.id === payload.befriendedUserId) {
        return { id: payload.issuerId, state: 'approved', date: Date() };
      }
      return element;
    });
    await this.prismaService.user.update({
      where: {
        id: payload.issuerId,
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
    this.notifProcessing(mapy, issuer.username, info);
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
        id: payload.issuerId,
      },
    });
    const updatedFriends = issuer.friends.filter((element: any) => {
      return element.id !== payload.befriendedUserId;
    });
    await this.prismaService.user.update({
      where: {
        id: payload.issuerId,
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
    this.notifProcessing(mapy, issuer.username, info);
  }

  async roomJoinLogic(
    client: Socket,
    payload: roomJoinDTO,
    joinerName: string,
  ) {
    client.join(payload.roomId.toString().concat('room'));

    const joiner = await this.prismaService.user.findUnique({
      where: {
        username: joinerName,
      },
    });
    const roomMember = await this.prismaService.roomMember.create({
      data: {
        RoomId: payload.roomId,
        memberId: joiner.userId,
        role: 'USER',
        joinTime: Date(),
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
        username: joiner.username,
      },
      data: {
        rooms: {
          connect: {
            id: room.id,
          },
        },
      },
    });
    client.emit('joinedRoom', room);
  }

  async roomJoin(
    client: Socket,
    payload: roomJoinDTO,
    mapy: Map<string, Socket>,
  ) {
    let joinerName: string;

    for (let entry of mapy.entries()) {
      if (entry[1] == client) joinerName = entry[0];
    }
    if (payload.visibility == 'public') {
      this.roomJoinLogic(client, payload, joinerName)
    } else {
      const roomToJoin = await this.prismaService.room.findUnique({
        where: {
          id: payload.roomId,
        },
      });
      if (roomToJoin.password == payload.password) {
		this.roomJoinLogic(client, payload, joinerName)
      } else {
        alert('Wrong password, please try again!');
      }
    }
  }

  async roomExit(client: Socket, roomId: number, mapy: Map<string, Socket>) {
    let subjectName: string;

    for (let entry of mapy.entries()) {
      if (entry[1] == client) subjectName = entry[0];
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        username: subjectName,
      },
    });
    const roomMember = await this.prismaService.roomMember.findUnique({
      where: {
        id: user.id,
      },
    });
    if (roomMember.inviterId) {
      const inviter = await this.prismaService.user.findUnique({
        where: {
          id: roomMember.inviterId,
        },
      });
      const updatedRoomInvites = inviter.roomInvites.filter((element: any) => {
        return element.id !== user.id;
      });
      await this.prismaService.user.update({
        where: {
          id: roomMember.inviterId,
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
        username: subjectName,
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

  async fetchState(client: Socket, username: string) {
    console.log(username);
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
      include: {
        dmAdmin: true,
        rooms: true,
        participantNotifs: true,
      },
    });
    user.dmAdmin.forEach((dm) => {
      client.join(dm.id.toString().concat('dm'));
    });

    user.rooms.forEach((room) => {
      client.join(room.id.toString().concat('room'));
    });
    return user.participantNotifs;
  }
}
