import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { ShubService } from "src/config/shub.service";
import { Ipfs } from "src/ipfs/ipfs.config";



@Module({

    controllers: [FileController],
    providers: [FileService, FabricService, FabricFactory,ShubService,Ipfs]
})
export class FileModule {};