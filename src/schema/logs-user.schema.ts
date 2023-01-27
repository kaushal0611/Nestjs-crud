import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserLogDocument = UserLog & Document;

@Schema()
export class UserLog {
    @Prop()
    email : string

    @Prop()
    action : string

    @Prop({
        default : Date.now
    })
    timeCreated : Date
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);