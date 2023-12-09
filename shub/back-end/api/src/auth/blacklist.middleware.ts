// blacklist.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class BlacklistMiddleware implements NestMiddleware {
  constructor(private readonly blacklistService: BlacklistService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Lấy token từ header
    const token = req.headers.authorization?.split(' ')[1];

    if (token && await this.blacklistService.isTokenBlacklisted(token)) {
      // Nếu token thuộc danh sách blacklist, trả về lỗi hoặc thực hiện xử lý phù hợp
      return res.status(401).json({ message: 'Token has been blacklisted' });
    }

    // Nếu token không thuộc danh sách blacklist, tiếp tục xử lý yêu cầu
    next();
  }
}
