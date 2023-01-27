import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        required : true
    })
    firstName : string;

    @Prop()
    lastName : string
    
    @Prop({
        required: true,
        unique: true
    })
    email : string

    @Prop({
        required: true
    })
    password : string

    @Prop()
    status : string
    
    @Prop()
    userType : string
}

export const UserSchema = SchemaFactory.createForClass(User);