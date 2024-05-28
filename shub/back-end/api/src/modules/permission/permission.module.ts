import { Module } from "@nestjs/common";

import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { ShubService } from "src/config/shub.service";

@Module({

    controllers: [PermissionController],
    providers: [PermissionService, FabricService, FabricFactory,ShubService],
    exports: [PermissionService],
})
export class PermissionModule {};