// import { Inject, Injectable, UploadedFile } from "@nestjs/common";
// import * as ipfsCluster from "ipfs-cluster-api";
// import * as fs from "fs";
// import axios from 'axios';
// import * as stream from 'stream';
// import { promisify } from 'util';
// import * as FileType from 'file-type';
// import { IPFSHTTPClient } from "ipfs-http-client";

// @Injectable()
// export class IPFSService {

//   constructor(@Inject('IpfsCluster') private readonly ipfsCluster: ipfsCluster, @Inject("IPFS_CONFIG") private readonly ipfsClient: IPFSHTTPClient) {
//   }


//   async uploadFile(@UploadedFile() file) {
//     const fileBuffer = file.buffer;
//     const result = await this.ipfsClient.add(fileBuffer);
//     // this.ipfsCluster.pin.add(result.cid.toString())
//     return { cid: result.cid.toString() };
//   }

//   async listPinnedFiles() {
//     this.ipfsCluster.pin.ls((err: any, pinset: any) => {
//       if (err) {
//         console.error('Error listing pins:', err)
//       } else {
//         console.log('Pinset:', pinset)
//       }
//     })
//   }

//   async show(cid: string) {
//     const asyncArr = await this.ipfsClient.cat(cid);

//     // Chuyển đổi AsyncIterable<Uint8Array> thành một mảng Uint8Array
//     const dataArray = [];
//     for await (const chunk of asyncArr) {
//       dataArray.push(chunk);
//     }

//     // Nối các phần tử Uint8Array thành một Uint8Array duy nhất
//     const dataUint8Array = new Uint8Array(dataArray.reduce((acc, chunk) => [...acc, ...chunk], []));
//     return dataUint8Array
//   }

//   async downloadFile(cid: string) {
//     // const url = `http://127.0.0.1:8080/ipfs/${cid}`;
//     // const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const asyncArr = await this.ipfsClient.cat(cid);

//     // Chuyển đổi AsyncIterable<Uint8Array> thành một mảng Uint8Array
//     const dataArray = [];
//     for await (const chunk of asyncArr) {
//       dataArray.push(chunk);
//     }

//     // Nối các phần tử Uint8Array thành một Uint8Array duy nhất
//     const dataUint8Array = new Uint8Array(dataArray.reduce((acc, chunk) => [...acc, ...chunk], []));
//     const blob = new Blob([dataUint8Array], { type: 'image/jpeg' }); // Thay đổi kiểu MIME nếu cần
//     const imageUrl = URL.createObjectURL(blob);
//     console.log(imageUrl)

//     // Xác định loại file bằng cách đọc phần đầu của dữ liệu
//     const type = await FileType(dataUint8Array.slice(0, 261)); // Đọc 261 byte đầu tiên (đủ cho việc xác định loại file)
//     const extension = type ? type.ext : 'bin'; // Sử dụng 'bin' nếu không xác định được phần mở rộng
  
//     // Tạo một stream ghi file với đúng phần mở rộng
//     // const writer = fs.createWriteStream(`./files/${cid}.${extension}`);
  
//     // // Chuyển đổi dữ liệu đã tải về thành stream và ghi vào file
//     // const dataStream = stream.Readable.from(asyncArr);
//     // const pipeline = promisify(stream.pipeline);
    
//     // await pipeline(dataStream, writer);
//     const asyncArr2 = await this.ipfsClient.cat(cid);

//     fs.createWriteStream(`C:/Users/tranq/Downloads/${cid}.${extension}`);
//     for await (const chunk of asyncArr2) {
//       fs.appendFileSync(`C:/Users/tranq/Downloads/${cid}.${extension}`, Buffer.from(chunk));
//     }
//     return fs.createReadStream(`C:/Users/tranq/Downloads/${cid}.${extension}`, {});
//   }
  
//   async download(cid: string) {
//     const asyncArr = this.ipfsClient.cat(cid);
//     fs.writeFileSync("/Users/tranq/Downloads/" + cid, "");

//     for await (const chunk of asyncArr) {
//       fs.appendFileSync("./files/" + cid, Buffer.from(chunk));
//     }
//     return fs.createReadStream("./files/" + cid, {});
//   }

//   async cat(cid: string): Promise<AsyncIterable<Uint8Array>> {
//     // Logic to retrieve data from IPFS
//     // Replace the following line with your actual IPFS logic
//     const fakeAsyncArr: AsyncIterable<Uint8Array> = await this.ipfsClient.cat(cid);
//     return fakeAsyncArr;
//   }
//   async getImageUrl(cid: string): Promise<string> {
//     try {
//       const asyncArr = await this.ipfsClient.cat(cid);

//       // Chuyển đổi AsyncIterable<Uint8Array> thành Uint8Array
//       const uint8Array = await (async () => {
//         let result = new Uint8Array();
//         for await (const chunk of asyncArr) {
//           result = new Uint8Array([...result, ...chunk]);
//         }
//         return result;
//       })();

//       // Tạo Blob từ Uint8Array
//       const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Thay đổi kiểu MIME nếu cần

//       // Tạo URL từ Blob
//       const imageUrl = URL.createObjectURL(blob);
//       return imageUrl;
//     } catch (error) {
//       console.error('Error fetching image from IPFS:', error);
//       throw new Error('Failed to fetch image from IPFS');
//     }
//   } 
  
// }

