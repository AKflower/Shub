import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { File } from 'src/model/file.model';
import { FileDTO } from 'src/dto/file.dto';


@Injectable()
export class FileService {
  async initLedger(contract: Contract) : Promise<String> {
    console.log('Hello');
    await contract.submitTransaction('InitLedger');
    console.log('Hellooooooooooo!!!!');
    return 'init thanh cong'
    
  }
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
        cid: item.cid,
        user_id: item.user_id,
        created_date: item.created_date,
        updated_date: item.updated_date,
        file_size: item.file_size
    }));
    
    
    return files;
    
}
  async getFile(contract: Contract, id: string): Promise<File> {
    console.log('\n ---> Submit Transaction: getfile');
    const resultBytes= await contract.submitTransaction('GetFile',id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const file: File = {
      file_id: result.file_id,
      file_name: result.file_name,
      file_path: result.file_path,
      cid: result.cid,
      user_id: result.user_id,
      created_date: result.created_date,
      updated_date: result.updated_date,
      file_size: result.file_size
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
      user_id: item.user_id,
      created_date: item.created_date,
      updated_date: item.updated_date,
      file_size: item.file_size

  }));
  return files;
    
  }
  async upload(contract: Contract, newfileDTO: FileDTO): Promise<File> {
    console.log('\n --> Submit Transaction: upload');
    
    
    const newfile : File = newfileDTO;
    newfile.created_date=new Date();
    newfile.updated_date=new Date();
    
    console.log('Dated: ',newfile.created_date,newfile.updated_date)
    await contract.submitTransaction('UploadFile',''+newfile.file_id,newfile.file_name,newfile.file_path,newfile.cid,''+newfile.user_id,''+newfile.created_date,''+newfile.updated_date,newfile.file_size);

    console.log('*** Transaction committed successfully');
    return newfile;
  }

}
