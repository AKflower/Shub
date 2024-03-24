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
    getFilesByPath(@Query('path') path: string){
        console.log('eeee: ',path);
        return this.fileService.getFilesByPath(this.contract,path);
    }
    @Post('/new')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file, @Query() params: {filePath: string, userId: string}){
        const { filePath, userId} = params;
        const fileEncrypted = this.fileService.encryptFile(file.buffer);

        const { cid } = await this.ipfsClient.add(fileEncrypted)
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
    @UseGuards(JwtAuthGuard)
    async getFilesByPrefix(@Query('prefix') prefix: string) {
        return this.fileService.getFilesByPrefix(this.contract,prefix);
    }

    @Put('/updatePath')
    @UseGuards(JwtAuthGuard)
    async updateFilePath(@Body() params: {file_id: string, newPath: string}) {
        const {file_id,newPath} = params;
        return this.fileService.updateFilePath(this.contract,file_id,newPath)
    }

    @Post('/ipfslong')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
            const fileBuffer = file.buffer;
            const result = await this.ipfsClient.add(fileBuffer);
            this.ipfsCluster.pin.add(result.cid.toString())
            return { cid: result.cid.toString() };
          }

    @Get(':id/download')
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        // const filePath = `./assets/QmRdQWfRzf287N9pv6dcoKNYCcSjpsmQWAdsQ2monPwTVt.jpg`;
        
        const file1 = this.fileService.getFile(this.contract, id)
        


        // const absoluteFilePath = path.join(__dirname, '../assets', `${(await file1).file_data}.${(await file1).file_type.slice((await file1).file_type.indexOf('/'), (await file1).file_type.length - 1)}}`);
        // const absoluteFilePath = path.join('./assets', `QmWFuBVHBWGDuVx7zJAWQkb4rnz4TCcZp7Dzf9BYNmd9kv.jpg`);
        // const file = await fs.promises.readFile(absoluteFilePath);
        
        // const file = await this.ipfsClient.get('QmWFuBVHBWGDuVx7zJAWQkb4rnz4TCcZp7Dzf9BYNmd9kv')
        // const file = await this.ipfsClient.cat('QmWFuBVHBWGDuVx7zJAWQkb4rnz4TCcZp7Dzf9BYNmd9kv');
        
        // res.send(file);
        // res.setHeader('Content-Type', `application/json`);

        const a = await this.ipfsService.downloadFile('QmWFuBVHBWGDuVx7zJAWQkb4rnz4TCcZp7Dzf9BYNmd9kv') 
        res.setHeader('Content-Disposition', `attachment; filename="QmWFuBVHBWGDuVx7zJAWQkb4rnz4TCcZp7Dzf9BYNmd9kv.jpg"`);
        
        res.send(a)
    }
}

 