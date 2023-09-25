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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('42')
  @UseGuards(AuthGuard('passport-42'))
  async auth(@Res() res: Response) {}
  /** this if for auth header */
  // @Get('42/redirect')
  // @UseGuards(AuthGuard('passport-42'))
  // async authRedirect(
  //   @Req()
  //   req,
  // ) {
  //   return this.authService.fortyTwoLogin(req);
  // }

  /* -- this is for cookie -----*/
  @Get('42/redirect')
  @UseGuards(AuthGuard('passport-42'))
  async authRedirect(
    @Res({ passthrough: true }) response: Response,
    @Req()
    req,
  ) {
    const accessToken = await this.authService.fortyTwoLogin(req);
    console.log(accessToken);
    response.cookie('accessToken', accessToken);
    response.redirect('http://localhost:5173/');
  }
}
