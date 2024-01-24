// import { Controller, Get, Post,  UseInterceptors, UploadedFile, Param, Res, Inject } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { IPFSService } from './ipfs.service';
// import { IPFSHTTPClient } from 'ipfs-http-client';

// @Controller()
// export class IPFSController {
//   constructor(private readonly appService: IPFSService, @Inject("IPFS_CONFIG") private readonly ipfsClient: IPFSHTTPClient) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(@UploadedFile() file)  {
//     return this.appService.uploadFile(file);
//   }

//   @Get('listPinnedFiles')
//   async listPinnedFiles() {
//     return this.appService.listPinnedFiles();
//   }

//   @Get('download/:cid')
//   async downloadFile(@Param('cid') cid: string)  {
//     return this.appService.downloadFile(cid);
//   }

//   @Get('show/:cid')
//   async show(@Param('cid') cid: string) {
//     const asyncArr = await this.appService.cat(cid);
//     return { data: asyncArr };
//   }

//   @Get('url/:cid')
//   async getImageUrl(@Param('cid') cid: string): Promise<{ imageUrl: string }> {
//     const imageUrl = await this.appService.getImageUrl(cid);
//     return { imageUrl };
//   }

//   @Get(':cid')
//   async getImage(@Param('cid') cid: string): Promise<string> {
//     // Assume imageData is your Uint8Array
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

//     // Trả về URL hình ảnh
//     console.log(imageUrl)
//     return imageUrl
//   }
  
// }

