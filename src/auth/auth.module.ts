import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { LogsService } from "../logs/logs.service";
import { UserLog, UserLogSchema } from "../schema/logs-user.schema";
import { User, UserSchema } from "../schema/user.schema";
import { jwtConstants } from "../strategy/constants";
import { LocalStrategy } from "../strategy/local.strategy";
import { HashService } from "../user/hash.service";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
      MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }]),
      MongooseModule.forFeature([{
        name: UserLog.name,
        schema: UserLogSchema
      }]),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60d'
        },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService, LogsService],
  })
  export class AuthModule {}