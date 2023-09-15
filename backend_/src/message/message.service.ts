import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDTO } from '../dto/messageDTO';
import { userDTO } from '../dto/userDTO';
import { dmDTO } from '../dto/dmDTO';
import { Socket, Server } from 'socket.io';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(client: Socket, payload: messageDTO) {
    console.log(payload)
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
      data : {
        msg: {
          connect: {
            id: message.id
          }
        }
      }
    })
    await this.prismaService.user.update({
      where: {
        id: payload.userId,
      },
      data : {
        messages: {
          connect: {
            id: message.id
          }
        }
      }
    })
    console.log("AFTER BRUH")
    client.emit('createdMessage', message)
  }
  
  async createUser(client: Socket, payload: userDTO) {
    console.log(payload)
    const user = await this.prismaService.user.create({
      data: {
        username: payload.username,
      },
    });
    console.log("AFTER BRUH")
    client.emit('createdUser', user)
  }
  
  async createDm(client: Socket, payload: dmDTO) {
    console.log(payload)
    const dm = await this.prismaService.dM.create({
      data: {
        adminId : payload.adminId
      },
    });
    await this.prismaService.user.update({
      where: {
        id: payload.adminId,
      },
      data : {
        dmAdmin: {
          connect: {
            id: dm.id
          }
        }
      }
    })
    console.log("AFTER BRUH")
    client.emit('createdDm', dm)
  }
}
