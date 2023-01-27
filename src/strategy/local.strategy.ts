import { AuthService } from 'src/auth/auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
  
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        //console.log("Inside local strategy constructor");
        super();
    }
  
    async validate(username: string, password: string): Promise < any > {
        //console.log("Inside local strategy validate func");
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException({
                message: "Incorrect credentials"
            });
        }
        return user;
    }
  }