import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "../auth/auth.service";
import { LogsService } from "../logs/logs.service";
import { User, UserSchema } from "../schema/user.schema";
import { jwtConstants } from "../strategy/constants";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { LocalStrategy } from "../strategy/local.strategy";
import { HashService } from "./hash.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserLog, UserLogSchema } from "../schema/logs-user.schema"

@Module({
    imports : [
        MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema
        },
      ]),
        MongooseModule.forFeature([
        {
          name: UserLog.name,
          schema: UserLogSchema
        },
      ]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '60d'
          },
        }),
      ],
    controllers : [UserController],
    providers : [UserService, HashService, AuthService, JwtStrategy, LocalStrategy, LogsService]
})

export class UserModule {}