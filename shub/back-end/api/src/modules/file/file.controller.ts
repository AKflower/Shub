import { Post, Get, Param, Body, Controller, ValidationPipe, Query, Delete, UseInterceptors, UploadedFile, Inject, UseGuards, UploadedFiles, Put, Res} from '@nestjs/common';
import { FileService } from './file.service';
import { Request, Response } from "express";

import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { FileDTO } from 'src/dto/file.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { File } from 'src/model/file.model';
import { ShubService } from 'src/config/shub.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ipfsCluster from "ipfs-cluster-api";
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";
import * as path from 'path';
import { IPFSService } from '../ipfs/ipfs.service';

@Controller('/files')
export class FileController {
    //Property
    private contract: Contract;
    //Constructor
    constructor(private readonly fileService: FileService, 
        private readonly fabricService: FabricService,
        private readonly shubService:ShubService,
        private readonly ipfsService: IPFSService,
        @Inject("IPFS_CONFIG") private readonly ipfsClient: IPFSHTTPClient,
        @Inject('IpfsCluster') private readonly ipfsCluster: ipfsCluster
        ) {
        this.contract = this.fabricService.getContract('StorageFileContract');
    
    }
    
    @Post()
    async initLedger(){
        try {
            const res = await this.fileService.initLedger(this.contract);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            return new ResponseData<String>(null,HttpStatus.ERROR,HttpMessage.ERROR );
        }
        
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllFile(){
        try {
            const res = await this.fileService.getAllFile(this.contract);
            return new ResponseData<File[]>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            return new ResponseData<File[]>(null,HttpStatus.ERROR,HttpMessage.ERROR );
        }
        
    }
    // @Get('/:id')
    // getFile(@Param('id') id: number){
    //     console.log(id);
    //     return this.fileService.getFile(this.contract,''+id);
    // }
    @Get('/bypath')
    @UseGuards(JwtAuthGuard)
    getFilesByPath(@Query() params: {user_id: string ,path: string}){
        const {user_id,path} = params;
        return this.fileService.getFilesByPath(this.contract,user_id,path); 
    }
    @Post('/new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file, @Query() params: {filePath: string, userId: string}){
        const { filePath, userId} = params;
        // const fileEncrypted = this.fileService.encryptFile(file.buffer);

        const { cid } = await this.ipfsClient.add(file.buffer)
        

        // this.ipfsCluster.pin.add(cid)
        const fileDTO: FileDTO =  {
            file_name: file.originalname,
            file_path: filePath,
            file_data: ''+cid,
            file_type: file.mimetype,
            file_size: ''+file.size,
            user_id: userId,
        }

        return this.fileService.upload(this.contract,fileDTO);
    }
    @Delete('/:file_id')
    @UseGuards(JwtAuthGuard)
    deleteFile(@Param('file_id') file_id: string) {
        return this.fileService.delete(this.contract,file_id);
    }
    //Get Files By Name
    // @Get('/')
    // // @UseGuards(JwtAuthGuard)
    // getFilesByName(@Query('fileName') fileName: string) {
    //     console.log(fileName);
    //     return this.fileService.getFilesByName(this.contract,fileName);
    // }

    // The API is used to get files whose names start with prefix
    @Get('/search')
    // @UseGuards(JwtAuthGuard)
    async getFilesByPrefix(@Query('user_id') user_id:string,@Query('prefix') prefix: string) {
        return this.fileService.getFilesByPrefix(this.contract,user_id,prefix);
    }
    @Put('/rename')
    renameFolder(@Body() params: {user_id:string,file_id:string,new_file_name:string}){ 
        const {user_id,file_id,new_file_name} = params;
        return this.fileService.renameFile(this.contract,user_id,file_id,new_file_name);
    }
    @Put('/updatePath')
    @UseGuards(JwtAuthGuard)
    async updateFilePath(@Body() params: {file_id: string, newPath: string}) {
        const {file_id,newPath} = params;
        return this.fileService.updateFilePath(this.contract,file_id,newPath)
    }
    @Post('/copy')
    async copyFile(@Body() file: FileDTO) {
        return this.fileService.copyFile(this.contract,file);
    }

 

    @Get('/down')
    @UseGuards(JwtAuthGuard)
    async down(@Query() params: {cid: string}, @Res() res: Response) {
    const {cid} = params;

    const buffer = await this.ipfsService.down(cid); // Sử dụng từ khóa 'await' ở đây
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=file'
    });
    res.end(buffer);
}

    

    @Put('/updateFavourite')
    @UseGuards(JwtAuthGuard)
    updateFavourtieFolder(@Body() params : {user_id: string, file_id: string, isFavourite: boolean}) {
        const {file_id,user_id,isFavourite} = params;
        return this.fileService.updateFavouriteFile(this.contract,user_id,file_id,isFavourite);
    }
    @Put('/updateTrash')
    @UseGuards(JwtAuthGuard)
    updateTrashFile(@Body() params : {user_id: string, file_id: string, isDelete: boolean}) {
        const {file_id,user_id,isDelete} = params;
        return this.fileService.updateTrashFile(this.contract,user_id,file_id,isDelete);
    }
    @Put('/updateShare')
    @UseGuards(JwtAuthGuard)
    updateShareFile(@Body() params : {user_id: string, file_id: string,share: string[]}) {
        const {user_id,file_id,share} = params;
        return this.fileService.updateShareFile(this.contract,user_id,file_id,share);
    }
    @Put('/changePassword')
    changeFilePassword(@Body() params : {user_id:string, file_id: string, file_password:string}) {
        const {user_id,file_id,file_password} = params;
        return this.fileService.changeFilePassword(this.contract,user_id,file_id,file_password);
    }
    @Get('/validate')
    validate(@Query() params : {user_id:string, file_id: string,file_password:string}) {
        const {user_id,file_id,file_password} = params;
        return this.fileService.validatePassword(this.contract,user_id,file_id,file_password);
    }
    @Put('/updateCID')
    updateCID(@Body() params : {user_id:string, file_id: string,cid: string}) {
        const {user_id,file_id,cid} = params;
        return this.fileService.updateCID(this.contract,user_id,file_id,cid);
    }
    @Put('/encrypt')
    encrypt(@Body() params : {user_id: string, file_id: string, data: string, password: string}) {
        const { password, user_id, file_id, data } = params;
        const truePass = password + password + password + password + password + password + password + password
        console.log(truePass, truePass.length)
        return this.fileService.encryptFile(this.contract, truePass, data, user_id, file_id);
    }

    @Put('/decrypt')
    decrypt(@Body() params : {user_id: string, file_id: string, data: string, password: string}) {
        const { password, user_id, file_id, data } = params;
        const truePass = password + password + password + password + password + password + password + password
        return this.fileService.decryptFile(this.contract, truePass, data, user_id, file_id);
    }

    @Put('/open')
    open(@Body() params : {data: string, password: string}) {
        const { password, data } = params;
        const truePass = password + password + password + password + password + password + password + password
        return this.fileService.decrypt( truePass, data);
    }
}

 