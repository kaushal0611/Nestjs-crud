import { BadRequestException, Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { User, UserDocument } from "../schema/user.schema";
import { HashService } from './hash.service';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from "../dto/delete-user.dto";
import { LogsService } from "../logs/logs.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel : Model <UserDocument>, private hashService: HashService, private logsService : LogsService ) {}

    async create(@Body() createUserDto : CreateUserDto): Promise < UserDocument > {
        const createUser = new this.userModel(createUserDto);
        console.log(createUser.email);
        const user = await this.getUserByEmail(createUser.email);
        
        if (user) {
            throw new BadRequestException();
        }
        createUser.password = await this.hashService.hashPassword(createUser.password);
        
        this.logsService.logActivity({
            email : createUser.email,
            action : "Created",
            timeCreated : new Date()
        })

        return createUser.save();
    }

    async findOne(id: string) {
        return this.userModel.findById(id);
    }

    async getUserByEmail(emailID: string): Promise<User> {

        const user = await this.userModel.findOne({ email : emailID });

        this.logsService.logActivity({
            email : emailID,
            action : "Accessed",
            timeCreated : new Date()
        })
        
        return user;
    }

    async updateUserById(id: string, updateData: any): Promise<User> {

        const user = await this.userModel.findOne({ _id: id });
        const email = user.email;

        this.logsService.logActivity({
            email : email,
            action : "Update",
            timeCreated : new Date()
        })

        return await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(@Body() deleteUserDto : DeleteUserDto): Promise <any> {
        const emailID = deleteUserDto.email;
        
        const user = await this.userModel.findOne({ email : emailID });

        const isPasswordValid = await bcrypt.compare(deleteUserDto.password, user.password);
        
        if (isPasswordValid) {
            await this.userModel.deleteOne(user._id);
            return { message: "User Deleted"};
        } else {
            throw new UnauthorizedException();
        }
    }
}

