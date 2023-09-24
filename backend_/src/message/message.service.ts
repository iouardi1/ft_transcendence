import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDTO } from '../dto/messageDTO';
import { userDTO } from '../dto/userDTO';
import { dmDTO } from '../dto/dmDTO';
import { roomDTO } from '../dto/roomDTO';
import { roomInviteDTO } from '../dto/roomInviteDTO';
import { actionDTO } from '../dto/actionDTO';
import { Socket, Server } from 'socket.io';
import { DM } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(client: Socket, payload: messageDTO) {
    console.log(payload);
    const message = await this.prismaService.message.create({
      data: {
        sentAt: payload.sentAt,
        messageContent: payload.messageContent,
        dmId: payload.dmId,
        userId: payload.userId,
      },
    });
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
    //improve to handle rooms aswell
    console.log('AFTER BRUH');
    client.to(payload.dmId.toString()).emit('createdMessage', message);
  }

  async createUser(client: Socket, payload: userDTO) {
    console.log(payload);
    const user = await this.prismaService.user.create({
      data: {
        username: payload.username,
      },
    });
    console.log('AFTER BRUH');
    client.emit('createdUser', user);
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
    client.join(dm.id.toString());
    mapy.get(user.username).join(dm.id.toString());
    
  }

  async createRoom(client: Socket, payload: roomDTO, mapy: Map<string, Socket>) {
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
      },
    });
    const roomMember = await this.prismaService.roomMember.create({
      data: {
        RoomId: room.id,
        memberId: user.id,
        role: 'OWNER',
        joinTime: payload.joinTime,
      },
    });
    await this.prismaService.room.update({
      where : {
        id: roomMember.id,
      },
      data: {
        RoomMembers : {
          connect: {
            id: roomMember.id,
          }
        }
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

  async sendRoomInvite(client: Socket, payload: roomInviteDTO, mapy: Map<string, Socket>) {
    console.log(payload);
    /* Fetch the inviter's username, will come in handy later */
    let notifSenderName: string;
    for (let entry of mapy.entries()) {
      if (entry[1] == client) notifSenderName = entry[0];
    }
    const notifSender = await this.prismaService.user.findUnique({
      where: {
        username: notifSenderName,
      }
    })
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: notifSender.id,
        type: 'roomInvite',
        roomId: payload.roomId,
      },
    });
    const notifiedUser = await this.prismaService.user.update({
      where: {
        username: payload.invitee,
      },
      data: {
        participantNotifs: {
          connect: {
            id: notif.id,
          },
        },
      },
    });
    console.log('AFTER BRUH');
    client.emit('inviteSent');
    mapy.get(payload.invitee).emit('notifSent', notif);
  }

  async roomInviteApproval(client: Socket, payload: roomInviteDTO, mapy: Map<string, Socket>) {
    client.join(payload.roomId.toString());
    //change notif state
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
        interactedWith: true,
      }
    })
    const room = await this.prismaService.room.findUnique({
      where: {
        id: payload.roomId,
      }
    })
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
    
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: payload.senderId,
        type: "roomInviteApproved",
      }
    })
    //get sender's name using their ID
    const sender = await this.prismaService.user.update({
      where: {
        id: payload.senderId,
      },
      data: {
        participantNotifs: {
          connect: {
            id: notif.id,
          }
        }
      }
    })

    const data = {
      invitee: payload.invitee,
      roomName: room.RoomName
    };
    //update this to include the notif AND other necessary data (e.g roomname)
    mapy.get(sender.username).emit('notifSent', notif);
    mapy.get(sender.username).emit('roomInviteApproved', data);
  }

  async roomInviteRejection(client: Socket, payload: roomInviteDTO, mapy: Map<string, Socket>) {
    //change notif state
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
        interactedWith: true,
      }
    })
    const room = await this.prismaService.room.findUnique({
      where: {
        id: payload.roomId,
      }
    })
    
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: payload.senderId, //change to invitee
        type: "roomInviteRejected",
      }
    })
    //get sender's name using their ID
    const sender = await this.prismaService.user.update({
      where: {
        id: payload.senderId,
      },
      data: {
        participantNotifs: {
          connect: {
            id: notif.id,
          }
        }
      }
    })

    const data = {
      invitee: payload.invitee,
      roomName: room.RoomName
    };
    //update this to include the notif AND other necessary data (e.g roomname)
    mapy.get(sender.username).emit('notifSent', notif);
    mapy.get(sender.username).emit('roomInviteRejected', data);
  }

  //notifClick event handler(sets read to true)
  async notifClicked(payload: roomInviteDTO) {
    await this.prismaService.notification.update({
      where: {
        id: payload.notifId,
      },
      data: {
        read: true,
      }
    })
  }

  async promoteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
      data: {
        role: 'ADMIN',
      }
    })
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: payload.userId,
        type: 'promotion',
      }
    })
    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      }
    })
    //update this to include the notif AND other necessary data (e.g roomname)
    mapy.get(subject.username).emit('notifSent', notif);
  }

  async demoteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
      data: {
        role: 'USER',
      }
    })
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: payload.userId,
        type: 'demotion',
      }
    })
    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      }
    })
    //update this to include the notif AND other necessary data (e.g roomname)
    mapy.get(subject.username).emit('notifSent', notif);
  }

  async muteUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.update({
      where: {
        id: payload.subjectId,
      },
      data: {
        muted: true,
      }
    })
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: payload.userId,
        type: 'mute',
      }
    })
    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      }
    })
    //update this to include the notif AND other necessary data (e.g roomname)
    mapy.get(subject.username).emit('notifSent', notif);
    mapy.get(subject.username).emit('muted');
  }

  async kickUser(payload: actionDTO, mapy: Map<string, Socket>) {
    await this.prismaService.roomMember.delete({
      where: {
        id: payload.subjectId,
      }
    })
    const notif = await this.prismaService.notification.create({
      data: {
        senderId: payload.userId,
        type: 'kick',
      }
    })
    const subject = await this.prismaService.user.findUnique({
      where: {
        id: payload.subjectId,
      }
    })
    //update this to include the notif AND other necessary data (e.g roomname)
    mapy.get(subject.username).emit('notifSent', notif);
    mapy.get(subject.username).emit('kicked', payload.roomId);
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
      client.join(dm.id.toString());
    });

    user.rooms.forEach((room) => {
      client.join(room.id.toString());
    });
    return user.participantNotifs;
  }

}
