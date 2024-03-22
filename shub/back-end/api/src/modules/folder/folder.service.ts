import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { File } from 'src/model/file.model';
import { FileDTO } from 'src/dto/file.dto';
import { Folder } from 'src/model/folder.model';


@Injectable()
export class FolderService {
    async createFolder(contract: Contract,newFolder:Folder): Promise<string> {
        newFolder.created_date=new Date();
        newFolder.updated_date=new Date();
        console.log(newFolder);
        await contract.submitTransaction('CreateFolder',newFolder.folder_name,newFolder.folder_path,newFolder.user_id,''+newFolder.created_date,''+newFolder.updated_date);
        return 'Create thanh cong';
    }
    async uploadFolder(contract: Contract,foldersArray: Folder[],filesArray: File[]): Promise<string> {
        for (const folder of foldersArray) {
            folder.created_date = new Date();
            folder.updated_date = new Date();
        }
        for (const file of filesArray) {
            file.created_date = new Date();
            file.updated_date = new Date();
        }
        const foldersArrayString = JSON.stringify(foldersArray)
        const filesArrayString = JSON.stringify(filesArray)
        await contract.submitTransaction('UploadFolderandFile',foldersArrayString,filesArrayString);
        return 'Upload folder thanh cong'

    }
    async getFoldersByPath(contract: Contract,path:string): Promise<Folder[]> {
        const resultBytes= await contract.evaluateTransaction('GetFoldersByPath',path);
        const utf8Decoder = new TextDecoder();
        const resultJson = utf8Decoder.decode(resultBytes);
        const result = JSON.parse(resultJson);
        console.log('*** Result:', result);
        const folders : Folder[] = result.map(item => ({
            folder_id: item.folder_id,
            folder_name: item.folder_name,
            folder_path: item.folder_path,
            user_id: item.owner,
            created_date: item.created_date,
            updated_date: item.updated_date
    }));
    return folders;
    
    }
    async getSubFolders(contract: Contract,user_id:string,folder_path:string,folder_id:string): Promise<Folder[]> {

        console.log('GetSubFolders');
        console.log(user_id,folder_path)
        const resultBytes = await contract.evaluateTransaction('GetSubFolders',user_id,folder_path,folder_id);
        console.log('hahaha');
        const utf8Decoder = new TextDecoder();
        const resultJson = utf8Decoder.decode(resultBytes);
        const result = JSON.parse(resultJson);
        console.log('*** Result:', result);
        const subFolders : Folder[] = result.map(item => ({
            folder_id: item.folder_id,
            folder_name: item.folder_name,
            folder_path: item.folder_path,
            user_id: item.owner,
            

        }));
        
        console.log(subFolders);
        return subFolders;
    }
    async deleteFolder(contract: Contract,user_id:string,folder_path:string,folder_id:string): Promise<string> {
        await contract.submitTransaction('DeleteFolderAndSubFolder',user_id,folder_path,folder_id)
        return 'Delete successfuly!'
    }
    async renameFolder(contract:Contract, user_id:string,folder_path:string,folder_id:string,new_folder_name:string): Promise<void> {
        await contract.submitTransaction('RenameFolder',user_id,folder_path,folder_id,new_folder_name);
    }

    async getFoldersByPrefix(contract: Contract, prefix:string): Promise<Folder[]> {
        const resultBytes=await contract.evaluateTransaction('GetFoldersByPrefix',prefix);
        const utf8Decoder = new TextDecoder();
        const resultJson = utf8Decoder.decode(resultBytes);
        const result = JSON.parse(resultJson);
        console.log('*** Result:', result);
        const folders : Folder[] = result.map(item => ({
            folder_id: item.folder_id,
            folder_name: item.folder_name,
            folder_path: item.folder_path,
            user_id: item.owner,
            
        }))
        return folders;
    }
    async updateFolderPath(contract: Contract,folder_id: string,newPath:string,user_id:string) : Promise<void> {
        await contract.submitTransaction('UpdateFoldersAndFilesPath',folder_id,newPath,user_id);
       
    }
    async copyFolder(contract: Contract, folder_id: string, newPath: string,user_id:string): Promise<void> {
        await contract.submitTransaction('CopyFolder',folder_id,newPath,user_id,"true");
    }

}