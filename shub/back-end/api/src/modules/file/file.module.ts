import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";



@Module({

    controllers: [FileController],
    providers: [FileService, FabricService, FabricFactory]
})
export class FileModule {};