import { Post, Get, Param, Body, Controller, ValidationPipe, Query} from '@nestjs/common';
import { FileService } from './file.service';
import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { FileDTO } from 'src/dto/file.dto';

@Controller('/files')
export class FileController {
    private contract: Contract;
    constructor(private readonly fileService: FileService, private readonly fabricService: FabricService) {
        this.contract = this.fabricService.getContract('basic');
    }
    
    @Post()
    initLedger(){
        return this.fileService.initLedger(this.contract);
    }

    @Get()
    getAllFile(){
        return this.fileService.getAllFile(this.contract);
    }
    // @Get('/:id')
    // getFile(@Param('id') id: number){
    //     console.log(id);
    //     return this.fileService.getFile(this.contract,''+id);
    // }
    @Get('/bypath')
    getFilesByPath(@Query('path') path: string){
        console.log('eeee: ',path);
        return this.fileService.getFilesByPath(this.contract,path);
    }
    @Post('/new')
    upload(@Body(new ValidationPipe()) fileDTO: FileDTO){
        return this.fileService.upload(this.contract,fileDTO);
    }

    
}

 