import { Injectable } from '@nestjs/common';

@Injectable()
export class ShubService {
  readonly chaincode: string;

  constructor() {
    this.chaincode = 'basic';
  }
}