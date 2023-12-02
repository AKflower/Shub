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
        ID: item.ID,
        Link: item.Link,
        NameFile: item.NameFile,
        Owner: item.Owner,
        Type: item.Type,

    }));
    
    
    return files;
    
}
  async getFile(contract: Contract, id: string): Promise<File> {
    console.log('\n ---> Submit Transaction: getfile');
    const resultBytes= await contract.submitTransaction('GetFile',id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');
    return result;
  }
  async upload(contract: Contract, newfileDTO: FileDTO): Promise<File> {
    console.log('\n --> Submit Transaction: upload');
    const newfile : File = newfileDTO;
    await contract.submitTransaction('UploadFile',newfile.ID,newfile.Owner,newfile.NameFile,newfile.Type,newfile.Link);

    console.log('*** Transaction committed successfully');
    return newfile;
  }
  async delete(contract: Contract, id: string) : Promise<File> {
    
    const resultBytes= await contract.submitTransaction('GetFile',id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('aloooooo');
    await contract.submitTransaction('DeleteFile', id);

    return result;
  }

}
