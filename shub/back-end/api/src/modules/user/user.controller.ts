import { Put,Post, Get, Param, Body, Controller, ValidationPipe, Query} from '@nestjs/common';
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
    @Get('/session')
    getSession(@Query('user_id') user_id : string) {
        return this.userService.getSession(this.contract,user_id);
    }
    @Get('/org')
    async getRoleByOrg(@Query('organization') organization: string): Promise<User[]> {
        console.log('test: ',organization);
        return this.userService.getUserByOrganization(this.contract, organization);
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
    @Put('/reset-password')
    async resetPassword(@Body() params: {user_id:string}) {
        const {user_id} = params;
        try {
            const res = await this.userService.resetPassword(this.contract,user_id);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Put('/firstAccess')
    async changeUserFirstAccess(@Body() params: {user_id: string, isFirstAccess: boolean}) {
        const {user_id,isFirstAccess} = params;
        try {
            const res = await this.userService.changeUserFirstAccess(this.contract,user_id,isFirstAccess);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Put('/changeStatus')
    async changeUserStatus(@Body() params: {user_id: string, isActive: boolean}) {
        const {user_id,isActive} = params;
        try {
            const res = await this.userService.changeUserStatus(this.contract,user_id,isActive);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Put('/updateRole')
    async updateRole(@Body() params: {user_id: string, role: string}) {
        const {user_id,role} = params;
        try {
            const res = await this.userService.updateRole(this.contract,user_id,role);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    @Put('/updateInfo')
    async updateInfo(@Body() params: {user_id: string, firstName: string, lastName: string}) {
        const { user_id, firstName, lastName } = params;
        try {
            const res = await this.userService.updateInfo(this.contract, user_id, firstName, lastName);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Put('/updateEmail')
    async updateEmail(@Body() params: {user_id: string, email: string}) {
        const { user_id, email } = params;
        try {
            const res = await this.userService.updateEmail(this.contract, user_id, email);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            throw new Error(error.message);
        }
    }
    @Put('/updateSubordinates')
    async updateSubordinates(@Body() params: {user_id: string, subordinates: string[]}) {
        const { user_id, subordinates } = params;
        const subordinatesString = JSON.stringify(subordinates)
        try {
            const res = await this.userService.updateEmail(this.contract, user_id, subordinatesString);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            throw new Error(error.message);
        }
    }
}