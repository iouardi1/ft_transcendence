import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    ParseIntPipe
  } from '@nestjs/common';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { roomDTO } from 'src/dto/roomDTO';
  import { PrismaService } from 'src/prisma/prisma.service';
  
  @Injectable()
  export class HttpService {
    constructor(
      private prismaService: PrismaService,
    ) {}
    //protect
    async fetchRooms(userId: string) {
        
        const user = await this.prismaService.user.findUnique({
            where: { 
                userId: userId
            },
            include: {
                rooms: true,
            }
        })
        console.log('haha')
        console.log(user);
        const rooms = await Promise.all(user.rooms.map(async (roomMember: any) => {
            const room =  await this.prismaService.room.findUnique({
                where: {
                    id: roomMember.RoomId,
                },
                include: {
                    msgs: true,
                }
            })
            return room
        }))
        console.log(rooms)
        return (rooms);
    }

    async fetchRoomContent(roomId: number, userId: string) {
        const room = await this.prismaService.room.findUnique({
            where: { 
                id: roomId,
            },
            include: {
                msgs: true,
            }
        })

        return room.msgs;
    }
  }
  