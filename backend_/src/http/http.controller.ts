import {
    Controller,
    Get,
    UseGuards,
    Req,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Res,
    Query,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { HttpService } from './http.service';

  @Controller('chat')
  export class HttpController {
    constructor(private httpService: HttpService) {}
    @Get('groups')
    async fetchRooms(@Query() body: {userId: string}) {
        const userId = body.userId;
        return (await this.httpService.fetchRooms(userId));
    }

    @Get('groups/:id')
    async fetchRoomContent(@Param('id', ParseIntPipe) roomId: number, @Query() body: {userId: string}) {
        const userId = body.userId;
        return (await this.httpService.fetchRoomContent(roomId, userId));
    }

    @Get('groupsList')
    async fetchRoomsToJoin(@Query() body: {userId: string}) {
        const userId = body.userId;
        return (await this.httpService.fetchRoomsToJoin(userId));
    }
  }

  