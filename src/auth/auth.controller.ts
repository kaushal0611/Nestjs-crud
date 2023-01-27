import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //@UseGuards(AuthGuard('local'))

  @Post('/login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.email, req.body.password);
    return this.authService.login(user);
  }
}