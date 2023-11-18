// src/user/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'dung', password: 'dung' },

    // Add more users as needed
  ];

  findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
