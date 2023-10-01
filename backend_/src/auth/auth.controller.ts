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
  
  @Get('42/redirect')
  @UseGuards(AuthGuard('passport-42'))
  async authRedirect(
    @Res({ passthrough: true }) response: Response,
    @Req()
    req,
  ) {
    const accessToken = await this.authService.fortyTwoLogin(req);
    response.cookie('accessToken', accessToken);
    response.redirect('http://localhost:5173/');
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('data')
  async userData(@Body() id: any, @Res({ passthrough: true }) res) {
    return await this.authService.user_data(id);
  }
}
