import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { File } from 'src/model/file.model';
import { FileDTO } from 'src/dto/file.dto';


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
        cid: item.cid,
        user_id: item.user_id,

    }));
    
    
    return files;
    
}
  async getFile(contract: Contract, file_id: number): Promise<File> {
    console.log('\n ---> Submit Transaction: getfile');
    const resultBytes= await contract.submitTransaction('GetFile',''+file_id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');
    return result;
  }
  async upload(contract: Contract, newfileDTO: FileDTO): Promise<File> {
    console.log('\n --> Submit Transaction: upload');
    const cid = "example";
    const newfile : File = newfileDTO;
    await contract.submitTransaction('UploadFile',''+newfile.file_id,newfile.file_name,newfile.file_path,newfile.cid,''+newfile.user_id);

    console.log('*** Transaction committed successfully');
    return newfile;
  }
  async delete(contract: Contract, id: number) : Promise<File> {
    
    const resultBytes= await contract.submitTransaction('GetFile',''+id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log('aloooooo');
    await contract.submitTransaction('DeleteFile', ''+id);

    return result;
  }

}
