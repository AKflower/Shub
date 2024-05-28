import { Put,Post, Get, Param, Body, Delete, Controller, ValidationPipe, Query} from '@nestjs/common';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import { FabricService } from '../fabric/fabric.service';
import { RoleService } from './role.service';
import { Role } from 'src/model/role.model';
import { ShubService } from 'src/config/shub.service';
import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { emit } from 'process';

@Controller('/role')
export class RoleController {
    private contract: Contract;
    constructor(private readonly roleService: RoleService, 
        private readonly fabricService: FabricService,
        private readonly shubService: ShubService) {
        this.contract = this.fabricService.getContract('RoleContract');
    }
    @Get()
    getAllRole(): Promise<Role[]>{
        console.log('Khoa');
        return this.roleService.getAllRole(this.contract);
    }
    @Get('/active')
    async getRoleActive(): Promise<Role[]> {
        return this.roleService.getRoleActive(this.contract);
    }
    @Get('/org')
    async getRoleByOrg(@Query('role_organization') role_organization: string): Promise<Role[]> {
        return this.roleService.getRoleByOrg(this.contract, role_organization);
    }
    @Post('/new')
    async createNewRole(@Body() newRole: Role) {
        // console.log('hhiiii');
        // return this.roleService.userEmailExists(this.contract,newUser.email);
        // const res = await this.roleService.createNewUser(this.contract,newUser);
        // return res;
        try {
            const res = await this.roleService.createNewRole(this.contract,newRole);
            return new ResponseData<String>(res,HttpStatus.SUCCESS,HttpMessage.SUCCESS );
        } catch (error) {
            throw new Error('Error new create role!')
        }
    }
    @Delete('/:role_id')
    deleteRole(@Param('role_id') role_id: string) {
        return this.roleService.delete(this.contract,role_id);
    }
    @Put('/updateTypeRole')
    async updateFilePath(@Body() params: {role_id: string, role_type: number}) {
        const {role_id,role_type} = params;
        console.log(role_id,role_type);
        return this.roleService.updateTypeRole(this.contract,role_id,role_type)
    }
    @Put('/updateLevel')
    async updateLevel(@Body() params: {roles: Role[]}){
        const {roles} = params;
        return this.roleService.updateLevel(this.contract,roles);
    }
    @Put('/updatePermissionIds')
    async updatePermissionIds(@Body() params: {role_id: string, role_permissionIds: string[]}) {
        const {role_id,role_permissionIds} = params;
        return this.roleService.updateRolePermissionIds(this.contract,role_id,role_permissionIds)
    }
}