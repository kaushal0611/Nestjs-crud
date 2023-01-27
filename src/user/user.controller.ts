import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { DeleteUserDto } from "../dto/delete-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Post('signup')
    create(@Body() createUserDto : CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string) {
        return await this.userService.getUserByEmail(email);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateData: any) {
        return this.userService.updateUserById(id, updateData);
    }
     
    @Delete()
    remove(@Body() deleteUserDto: DeleteUserDto) {
        return this.userService.delete(deleteUserDto);
    }
}