import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { roomDTO } from 'src/dto/roomDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HttpService {
  constructor(private prismaService: PrismaService) {}
  async fetchRooms(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        rooms: true,
      },
    });
    const rooms = await Promise.all(
      user.rooms.map(async (roomMember: any) => {
        const room = await this.prismaService.room.findUnique({
          where: {
            id: roomMember.RoomId,
          },
          include: {
            msgs: true,
          },
        });
        //console.log('room : ', room);
        return room;
      }),
    );
    //console.log('rooms : ', rooms);
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
    return {msgs: customArray, roomName: room.RoomName, roomImage: room.image};
  }
}
