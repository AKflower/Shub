import { Post, Get, Param, Body, Controller, ValidationPipe, Delete,Query, Put, UseGuards} from '@nestjs/common';
import { FolderService } from './folder.service';
import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { FileDTO } from 'src/dto/file.dto';
import { Folder } from 'src/model/folder.model';
import { Context } from 'vm';
import { ShubService } from 'src/config/shub.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/folders')
export class FolderController {
    private contract: Contract;
    constructor(private readonly folderService: FolderService, 
        private readonly fabricService: FabricService,
        private readonly shubService: ShubService) {
        this.contract = this.fabricService.getContract('StorageFileContract');
    }
    @Post('/new')
    @UseGuards(JwtAuthGuard)
    createFolder(@Body() newFolder: Folder){
        console.log('sao ga v', newFolder)
        return this.folderService.createFolder(this.contract,newFolder);

    }
    @Get('/bypath')
    @UseGuards(JwtAuthGuard)
    getFoldersByPath(@Query('path') path: string) {
        return this.folderService.getFoldersByPath(this.contract,path);
    }
    @Get()
    
    getSubFolders(@Body() params: {user_id:string, folder_path:string,folder_id:string}){
        const {user_id,folder_path,folder_id} = params;
        console.log(typeof user_id,folder_id)
        return this.folderService.getSubFolders(this.contract,user_id,folder_path,folder_id);
    }
    
    @Delete('/delete')
    @UseGuards(JwtAuthGuard)
    deleteFolder(@Query() params: {user_id:string,folder_path:string,folder_id:string}){
        const {user_id,folder_path,folder_id} = params;
        console.log('delete',user_id,folder_path,folder_id)
        return this.folderService.deleteFolder(this.contract,user_id,folder_path,folder_id)
    }
    @Put('/rename')
    @UseGuards(JwtAuthGuard)
    renameFolder(@Body() params: {user_id:string,folder_path:string,folder_id:string,new_folder_name:string}){ 
        const {user_id,folder_path,folder_id,new_folder_name} = params;
        return this.folderService.renameFolder(this.contract,user_id,folder_path,folder_id,new_folder_name);
    }

    @Get('/search')
    getFoldersByPrefix(@Query('prefix') prefix: string) {
        return this.folderService.getFoldersByPrefix(this.contract,prefix);
    }
}