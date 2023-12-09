import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { File } from 'src/model/file.model';
import { FileDTO } from 'src/dto/file.dto';
import { Folder } from 'src/model/folder.model';


@Injectable()
export class FolderService {
    async createFolder(contract: Contract,newFolder:Folder): Promise<string> {

        await contract.submitTransaction('CreateFolder',newFolder.folder_id,newFolder.folder_name,newFolder.folder_path,newFolder.user_id);
        return 'Create thanh cong';
    }
    async getSubFolders(contract: Contract,user_id:string,folder_path:string): Promise<Folder[]> {

        console.log('GetSubFolders');
        const resultBytes = await contract.evaluateTransaction('GetSubFolders',user_id,folder_path);
        console.log('hahaha');
        const utf8Decoder = new TextDecoder();
        const resultJson = utf8Decoder.decode(resultBytes);
        const result = JSON.parse(resultJson);
        console.log('*** Result:', result);
        const subFolders : Folder[] = result.map(item => ({
            folder_id: item.folder_id,
            folder_name: item.folder_name,
            folder_path: item.folder_path,
            user_id: item.user_id,
            

        }));
        
        console.log(subFolders);
        return subFolders;
    }
    async deleteFolder(contract: Contract,user_id:string,folder_path:string,folder_id:string): Promise<string> {
        await contract.submitTransaction('DeleteFolderAndSubFolder',user_id,folder_path,folder_id)
        return 'Delete successfuly!'
    }



}