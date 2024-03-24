import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { File } from 'src/model/file.model';
import { FileDTO } from 'src/dto/file.dto';
import * as cd from "fs";
import * as crypto from "crypto";
import * as zlib from "zlib";

@Injectable()
export class FileService {
  async initLedger(contract: Contract) : Promise<String> {
    console.log('Hello');
    console.log('contract',contract);
    await contract.submitTransaction('InitLedger');
    console.log('Hellooooooooooo!!!!');
    return 'init thanh cong'
    
  }
  // async updateUploadFile(id: string, chunkNumber: number, file: Express.Multer.File) {
  //   if (!this.uploads[id] || this.uploads[id].chunkReceived === this.uploads[id].totalChunks) return;

  //   while (chunkNumber !== this.uploads[id].chunkReceived + 1) {
  //     await new Promise((r) => setTimeout(r, 1000));
  //   }

  //   if (chunkNumber === this.uploads[id].chunkReceived + 1) {
  //     fs.appendFileSync("./files/" + id, file.buffer);
  //     this.uploads[id].chunkReceived++;
  //   }

  //   return this.uploads[id];
  // }
  async getAllFile(contract: Contract): Promise<File[]> {
    console.log('\n --> Submit Transaction: getAllFile');
    const resultBytes = await contract.evaluateTransaction('GetAllFile');
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    const files : File[] = result.map(item => ({
        file_id: item.file_id,
        file_name: item.file_name,
        file_path: item.file_path,
        file_data: item.cid,
        user_id: item.owner,
        created_date: item.created_date,
        updated_date: item.updated_date,
        file_size: item.file_size,
        file_type: item.file_type
    }));
    
    
    return files;
    
}
  async getFile(contract: Contract, file_id: string): Promise<File> {
    console.log('\n ---> Submit Transaction: getfile');
    const resultBytes= await contract.submitTransaction('GetFile',''+file_id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const file: File = {
      file_id: result.file_id,
      file_name: result.file_name,
      file_path: result.file_path,
      file_data: result.cid,
      user_id: result.owner,
      created_date: result.created_date,
      updated_date: result.updated_date,
      file_size: result.file_size,
      file_type: result.file_type
    }
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');
    return file;
  }
  async getFilesByPath(contract: Contract, path: string): Promise<File[]> {
    const resultBytes= await contract.evaluateTransaction('GetFilesByPath',path);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    const files : File[] = result.map(item => ({
      file_id: item.file_id,
      file_name: item.file_name,
      file_path: item.file_path,
      cid: item.cid,
      user_id: item.owner,
      created_date: item.created_date,
      updated_date: item.updated_date,
      file_size: item.file_size,
      file_type: item.file_type

  }));
  return files;
    
  }
  async upload(contract: Contract, newfileDTO: FileDTO): Promise<File> {
    console.log('\n --> Submit Transaction: upload');
    
    
    const newfile : File = newfileDTO;
    newfile.created_date=new Date();
    newfile.updated_date=new Date();
    
    console.log('Dated: ',newfile.created_date,newfile.updated_date)
    await contract.submitTransaction('UploadFile',newfile.file_name,newfile.file_path,newfile.file_data,''+newfile.user_id,''+newfile.created_date,''+newfile.updated_date,newfile.file_size,newfile.file_type);

    console.log('*** Transaction committed successfully');
    return newfile;
  }
  async delete(contract: Contract, id: string) : Promise<File> {
    
    const resultBytes= await contract.submitTransaction('GetFile',''+id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('aloooooo');
    await contract.submitTransaction('DeleteFile', ''+id);

    return result;
  }
  async getFilesByName(contract: Contract, fileName: string): Promise<File[]> {
    const resultBytes= await contract.evaluateTransaction('GetFilesByName',fileName);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    const files : File[] = result.map(item => ({
      file_id: item.file_id,
      file_name: item.file_name,
      file_path: item.file_path,
      file_data: item.cid,
      user_id: item.owner,
      created_date: item.created_date,
      updated_date: item.updated_date,
      file_size: item.file_size,
      file_type: item.file_type
    }));
      
      
    return files;
  }
  async getFilesByPrefix(contract: Contract, prefix: string): Promise<File[]> {
    const resultBytes= await contract.evaluateTransaction('GetFilesByPrefix',prefix);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    const files : File[] = result.map(item => ({
      file_id: item.file_id,
      file_name: item.file_name,
      file_path: item.file_path,
      file_data: item.cid,
      user_id: item.owner,
      created_date: item.created_date,
      updated_date: item.updated_date,
      file_size: item.file_size,
      file_type: item.file_type
    }));
      
      
    return files;
  }
  async updateFilePath(contract: Contract,file_id: string, newPath: string): Promise<string> {
    await contract.submitTransaction('UpdateFilePath',file_id,newPath);
    return 'Update Successful!'
  }
  async getDir(path: string): Promise<string[]> {
    try {
      const files = await fs.readdir(path);
      return files;
    } catch (error) {
      throw new Error(`Error reading directory: ${error.message}`);
    }
  }

  getCipherKey() {
    if (!process.env.IPFS_SYMMECTRIC_KEY) throw Error("IPFS_SYMMECTRIC_KEY environment variable is required");
    return crypto.createHash("sha256").update(process.env.IPFS_SYMMECTRIC_KEY).digest();
  }

  encryptFile(fileStream: cd.ReadStream) {
    const initVect = Buffer.alloc(16, 0);
    const key = this.getCipherKey();
    const encryptedData = crypto.createCipheriv("aes-256-cbc", key, initVect);
    const gzip = zlib.createGzip();
    // const appendInitVect = new AppendInitVect(initVect);
    return fileStream.pipe(gzip).pipe(encryptedData);
  }

  decryptFile(fileStream: cd.ReadStream) {
    const initVect = Buffer.alloc(16, 0);
    const decryptedData = crypto.createDecipheriv("aes-256-cbc", this.getCipherKey(), initVect);
    const unzip = zlib.createUnzip();

    return fileStream.pipe(decryptedData).pipe(unzip);
  }

}
