import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDTO } from '../dto/messageDTO';
import { userDTO } from '../dto/userDTO';
import { dmDTO } from '../dto/dmDTO';
import { Socket, Server } from 'socket.io';
import { DM } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(client: Socket, payload: messageDTO, server: Server) {
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
    console.log('AFTER BRUH');
    client.to(payload.dmId.toString()).emit('createdMessage', message);
    //client.to("${payload.dmId}").emit('createdMessage', message)
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
    
  }

  async joinRooms(client: Socket, username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
      include: {
        dmAdmin: true,
      },
    });
    user.dmAdmin.forEach((dm) => {
      client.join(dm.id.toString());
    });
  }
}
