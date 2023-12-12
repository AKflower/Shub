import { Module } from "@nestjs/common";

import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ShubService } from "src/config/shub.service";

@Module({

    controllers: [UserController],
    providers: [UserService, FabricService, FabricFactory,ShubService],
    exports: [UserService],
})
export class UserModule {};