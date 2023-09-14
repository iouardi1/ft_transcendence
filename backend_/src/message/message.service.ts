import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDTO } from '../dto/messageDTO';
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
      },
    });
    console.log("AFTER BRUH")
    client.emit('receivedMessage', message)
  }
}
