import { Module } from "@nestjs/common";

import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { RoleService} from "./role.service";
import { RoleController } from "./role.controller";
import { ShubService } from "src/config/shub.service";

@Module({

    controllers: [RoleController],
    providers: [RoleService, FabricService, FabricFactory,ShubService],
    exports: [RoleService],
})
export class RoleModule {};