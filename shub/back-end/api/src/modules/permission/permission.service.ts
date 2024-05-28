import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { Permission } from 'src/model/permission.model';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from "bcrypt";
import { FabricService } from '../fabric/fabric.service';




@Injectable()
export class PermissionService {
  private contract: Contract;

  constructor(
    private readonly fabricService: FabricService,
  ) {
    this.contract = this.fabricService.getContract('PermissionContract');

  }
  async getAllPermission(contract: Contract): Promise<Permission[]> {
    const resultBytes= await contract.evaluateTransaction('GetAllPermission');
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log(result);
    const permissions : Permission[] = [];
    for (const item of result) {
      const permission : Permission = {
        permission_id: item.permission_id,
        permission_name: item.permission_name
      }
      permissions.push(permission);
    }
    return permissions;
  }
  
  
}
