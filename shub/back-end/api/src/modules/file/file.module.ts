import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FabricService } from "../fabric/fabric.service";
import { FabricFactory } from "../fabric/fabric.config";
import { ShubService } from "src/config/shub.service";
import { Ipfs } from "src/modules/ipfs/ipfs.config";
import { IpfsFactory } from "../ipfs/ipfsCluster.config";
import { IPFSService } from "../ipfs/ipfs.service";



@Module({

    controllers: [FileController],
    providers: [FileService, FabricService, FabricFactory, ShubService, Ipfs, 
        IpfsFactory, IPFSService
    ]
})
export class FileModule {};