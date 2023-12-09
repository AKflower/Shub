import { Module } from "@nestjs/common";

import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { FolderController } from "./folder.controller";
import { FolderService } from "./folder.service";



@Module({

    controllers: [FolderController],
    providers: [FolderService, FabricService, FabricFactory]
})
export class FolderModule {};