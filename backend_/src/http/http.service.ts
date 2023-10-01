import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    ParseIntPipe
  } from '@nestjs/common';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
  import { PrismaService } from 'src/prisma/prisma.service';
  
  @Injectable()
  export class HttpService {
    constructor(
      private prismaService: PrismaService,
    ) {}
    async fetchRooms(userId: string) {
        
        const user = await this.prismaService.user.findUnique({
            where: { 
                userId: userId
            },
            include: {
                rooms: true,
            }
        })

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
        return (rooms);
    }
  }
  