import { Post, Get, Param, Body, Controller, ValidationPipe} from '@nestjs/common';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { UserService } from './user.service';
import { User } from 'src/model/user.model';

@Controller('/user')
export class UserController {
    private contract: Contract;
    constructor(private readonly userService: UserService, private readonly fabricService: FabricService) {
        this.contract = this.fabricService.getContract('basic');
    }
    @Get('/:user_id')
    getUserByID(@Param('user_id') user_id: string): Promise<User>{
        console.log('khoa: ',user_id);
        return this.userService.getUserByID(this.contract,user_id);
    }

}