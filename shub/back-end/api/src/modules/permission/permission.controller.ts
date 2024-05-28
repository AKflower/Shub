import { Put,Post, Get, Param, Body, Delete, Controller, ValidationPipe, Query} from '@nestjs/common';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { PermissionService } from './permission.service';
import { Role } from 'src/model/role.model';
import { ShubService } from 'src/config/shub.service';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { Permission } from 'src/model/permission.model';
import { emit } from 'process';

@Controller('/permission')
export class PermissionController {
    private contract: Contract;
    constructor(private readonly permissionService: PermissionService, 
        private readonly fabricService: FabricService,
        private readonly shubService: ShubService) {
        this.contract = this.fabricService.getContract('PermissionContract');
    }
    @Get()
    getAllRole(): Promise<Permission[]>{

        return this.permissionService.getAllPermission(this.contract);
    }
   
    
}