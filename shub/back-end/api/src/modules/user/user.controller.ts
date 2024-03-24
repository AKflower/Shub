import { Put,Post, Get, Param, Body, Controller, ValidationPipe} from '@nestjs/common';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { UserService } from './user.service';
import { User } from 'src/model/user.model';
import { ShubService } from 'src/config/shub.service';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { emit } from 'process';

@Controller('/user')
export class UserController {
    private contract: Contract;
    constructor(private readonly userService: UserService, 
        private readonly fabricService: FabricService,
        private readonly shubService: ShubService) {
        this.contract = this.fabricService.getContract('UserContract');
    }
    @Get()
    getAllUser(): Promise<User[]>{
        return this.userService.getAllUser(this.contract);
    }
    @Get('/:user_id')
    getUserByID(@Param('user_id') user_id: string): Promise<User>{
        console.log('khoa: ',user_id);
        return this.userService.getUserByID(this.contract,user_id);
    }
    @Post('/new')
    async createNewUser(@Body() newUser: User) {
        // console.log('hhiiii');
        // return this.userService.userEmailExists(this.contract,newUser.email);
        // const res = await this.userService.createNewUser(this.contract,newUser);
        // return res;
        try {
            const res = await this.userService.createNewUser(this.contract,newUser);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            throw new Error('Error new create user!')
        }
    }
    @Put('/change-password')
    async changePassword(@Body() params: {user_id: string, currentPassword:string, newPassword: string}) {
        const {user_id,currentPassword,newPassword} = params;
        try {
        const res = await this.userService.changePassword(this.contract,user_id,currentPassword,newPassword);
        return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    

}