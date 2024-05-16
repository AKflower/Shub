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
import { File } from 'src/model/file.model';
import { isDataURI } from 'class-validator';
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
        console.log(newFolder)
        return this.folderService.createFolder(this.contract,newFolder);

    }
    @Post('/upload')
    uploadFolder(@Body() data: {foldersArray : Folder[], filesArray : File[]}) {
        return this.folderService.uploadFolder(this.contract,data.foldersArray,data.filesArray)
    }
    @Get('/bypath')
    @UseGuards(JwtAuthGuard)
    getFoldersByPath(@Query() params : {user_id:string, path: string}) {
        const {user_id,path} = params;
        return this.folderService.getFoldersByPath(this.contract,user_id,path);
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
    @UseGuards(JwtAuthGuard)
    getFoldersByPrefix(@Query('prefix') prefix: string) {
        return this.folderService.getFoldersByPrefix(this.contract,prefix);
    }

    @Put('/updatePath')
    // @UseGuards(JwtAuthGuard)
    updateFolderPath(@Body() params : {folder_id: string,newPath: string,user_id: string}) {
        const {folder_id, newPath,user_id} = params;
        return this.folderService.updateFolderPath(this.contract,folder_id,newPath,user_id)
    }
    @Post('/copy')
    copyFolder(@Query() params : {folder_id: string, newPath: string, user_id: string}) {
        const {folder_id,newPath,user_id} = params;
        return this.folderService.copyFolder(this.contract,folder_id,newPath,user_id);
    }
    
    @Get('/favourite')
    getFilesAndFoldersFavourite(@Query('user_id') user_id: string) {
        return this.folderService.getFilesAndFoldersFavourite(this.contract,user_id);
    }

    @Put('/updateFavourite')
    updateFavourtieFolder(@Body() params : {user_id: string, folder_id: string, isFavourite: boolean}) {
        const {user_id,folder_id,isFavourite} = params;
        console.log(folder_id,user_id,isFavourite);
        return this.folderService.updateFavouriteFolder(this.contract,user_id,folder_id,isFavourite);
    }
    @Get('/trash')
    getTrashFolderAndFiles(@Query('user_id') user_id: string) {
        return this.folderService.getTrashFolderAndFiles(this.contract,user_id);
    }
    @Put('/updateTrash')
    updateTrashFolder(@Body() params : {user_id: string, folder_id: string, isDelete: boolean}) {
        const {user_id,folder_id,isDelete} = params;
        return this.folderService.updateTrashFolder(this.contract,user_id,folder_id,isDelete);
    }
    @Get('/share')
    getShareFolders(@Query('user_id') user_id: string) {
        return this.folderService.getShareFolders(this.contract,user_id);
    }
    @Put('/updateShare')
    updateShareFolder(@Body() params : {user_id: string, folder_id: string,share: string[]}) {
        const {user_id,folder_id,share} = params;
        console.log(user_id, folder_id, share);
        return this.folderService.updateShareFolder(this.contract,user_id,folder_id,share);
    }
    @Get('/byName')
    getFolderByName(@Body() params : {path: string, folderName: string}) {
        const {path,folderName} = params;
        return this.folderService.getFolderByName(this.contract,path,folderName);
    }
    @Put('/changePassword')
    changeFolderPassword(@Body() params : {user_id:string, folder_id: string, folder_password:string}) {
        const {user_id,folder_id,folder_password} = params;
        return this.folderService.changeFolderPassword(this.contract,user_id,folder_id,folder_password);
    }
    @Get('/validate')
    validate(@Body() params : {user_id:string, folder_id: string,folder_password:string}) {
        const {user_id,folder_id,folder_password} = params;
        return this.folderService.validatePassword(this.contract,user_id,folder_id,folder_password);
    }
}
