import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signup(@Body() dto: Login) {
    console.log({ dto });
    return this.authService.login();
  }

  @Post('register')
  signin(@Body() dto: Register) {
    return this.authService.register();
  }
}
