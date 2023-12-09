// blacklist.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistService {
  private readonly blacklist: Set<string> = new Set();

  async addToBlacklist(token: string): Promise<void> {
    this.blacklist.add(token);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }
}
