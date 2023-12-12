import { Module } from "@nestjs/common";

import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { FolderController } from "./folder.controller";
import { FolderService } from "./folder.service";
import { ShubService } from "src/config/shub.service";



@Module({

    controllers: [FolderController],
    providers: [FolderService, FabricService, FabricFactory,ShubService]
})
export class FolderModule {};