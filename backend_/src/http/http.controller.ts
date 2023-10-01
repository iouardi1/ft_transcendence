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
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { HttpService } from './http.service';

  @Controller('chat/groups')
  export class HttpController {
    constructor(private httpService: HttpService) {}
    @Get()
    async fetchRooms(@Query() body: {userId: string}) {
        const userId = body.userId;
        return (await this.httpService.fetchRooms(userId));
    }
  }
  