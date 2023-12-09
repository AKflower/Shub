import { Module } from "@nestjs/common";

import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({

    controllers: [UserController],
    providers: [UserService, FabricService, FabricFactory]
})
export class UserModule {};