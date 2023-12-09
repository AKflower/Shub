import { Post, Get, Param, Body, Controller, ValidationPipe, Delete} from '@nestjs/common';
import { FolderService } from './folder.service';
import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { FileDTO } from 'src/dto/file.dto';
import { Folder } from 'src/model/folder.model';

@Controller('/folders')
export class FolderController {
    private contract: Contract;
    constructor(private readonly folderService: FolderService, private readonly fabricService: FabricService) {
        this.contract = this.fabricService.getContract('basic');
    }
    @Post('/new')
    createFolder(@Body() newFolder: Folder){
        return this.folderService.createFolder(this.contract,newFolder);

    }
    @Get()
    getSubFolders(@Body() params: {user_id:string, folder_path:string}){
        const {user_id,folder_path} = params;
        return this.folderService.getSubFolders(this.contract,user_id,folder_path);
    }
    
    @Delete('/delete')
    deleteFolder(@Body() params: {user_id:string,folder_path:string,folder_id:string}){
        const {user_id,folder_path,folder_id} = params;
        return this.folderService.deleteFolder(this.contract,user_id,folder_path,folder_id)
    }
}