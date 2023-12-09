import { Inject, Injectable, UploadedFile } from "@nestjs/common";
import * as ipfsCluster from "ipfs-cluster-api";
import * as fs from "fs";
import axios from 'axios';
import * as stream from 'stream';
import { promisify } from 'util';
import * as FileType from 'file-type';
import { IPFSHTTPClient } from "ipfs-http-client";

@Injectable()
export class IPFSService {

  constructor(@Inject('IpfsCluster') private readonly ipfsCluster: ipfsCluster, @Inject("IPFS_CONFIG") private readonly ipfsClient: IPFSHTTPClient) {
  }


  async uploadFile(@UploadedFile() file) {
    const fileBuffer = file.buffer;
    const filePath = file.originalname;

    const result = await this.ipfsClient.add(fileBuffer);
    this.ipfsCluster.pin.add(result.cid.toString())
    return { cid: result.cid.toString() };
  }

  async listPinnedFiles() {
    this.ipfsCluster.pin.ls((err: any, pinset: any) => {
      if (err) {
        console.error('Error listing pins:', err)
      } else {
        console.log('Pinset:', pinset)
      }
    })
  }

  async downloadFile(cid: string): Promise<void> {
    const url = `http://127.0.0.1:8080/ipfs/${cid}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
  
    // Xác định phần mở rộng của file
    const type = await FileType(response.data);
    const extension = type ? type.ext : 'bin'; // Sử dụng 'bin' nếu không xác định được phần mở rộng
  
    // Tạo một stream ghi file với đúng phần mở rộng
    const writer = fs.createWriteStream(`./files/${cid}.${extension}`);
  
    // Chuyển đổi dữ liệu đã tải về thành stream và ghi vào file
    const dataStream = stream.Readable.from(response.data);
    const pipeline = promisify(stream.pipeline);
    await pipeline(dataStream, writer);
  }

  
}

