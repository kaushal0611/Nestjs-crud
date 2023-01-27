import { UserService } from 'src/user/user.service';
import { LogsService } from 'src/logs/logs.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private hashService: HashService, private jwtService: JwtService, private logsSerivce : LogsService) {}

    async validateUser(email: string, pass: string): Promise < any > {

        //console.log("Inside auth service validateUser");
        const user = await this.userService.getUserByEmail(email);

        //console.log("after get user by email");
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }
  
    async login(user: any) {
        if(user == null) throw new BadRequestException('Incorrect Credentials');
        const email = user.email;

        //console.log(user);
        const payload = {
            userEmail: email,
            sub: user.id
        };
        
        
        this.logsSerivce.logActivity({
            email : email,
            action : "Log In",
            timeCreated : new Date()
        })

        //console.log("Inside auth service login");
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}