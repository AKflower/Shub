import { Post, Get, Param, Body, Controller, ValidationPipe, Delete} from '@nestjs/common';
import { FileService } from './file.service';
import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { FileDTO } from 'src/dto/file.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { File } from 'src/model/file.model';

@Controller('/file')
export class FileController {
    //Property
    private contract: Contract;
    //Constructor
    constructor(private readonly fileService: FileService, private readonly fabricService: FabricService) {
        this.contract = this.fabricService.getContract('basic');
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
    async getAllFile(){
        try {
            const res = await this.fileService.getAllFile(this.contract);
            return new ResponseData<File[]>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            return new ResponseData<File[]>(null,HttpStatus.ERROR,HttpMessage.ERROR );
        }
        
    }
    @Get('/:id')
    async getFile(@Param('id') id: number){
        try {
            const res = await this.fileService.getFile(this.contract,id);
            return new ResponseData<File>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            return new ResponseData<File>(null,HttpStatus.ERROR,HttpMessage.ERROR );
        }
        
    }
    @Post('/new')
    async upload(@Body(new ValidationPipe()) fileDTO: FileDTO){
        try {
            const res = await this.fileService.upload(this.contract,fileDTO);
            return new ResponseData<File>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            return new ResponseData<File>(null,HttpStatus.ERROR,HttpMessage.ERROR );
        }
        
    }
    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
        try {
            const res = await this.fileService.delete(this.contract,id);
            return new ResponseData<File>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            return new ResponseData<File>(null,HttpStatus.ERROR,HttpMessage.ERROR );
        }
    }
}

 