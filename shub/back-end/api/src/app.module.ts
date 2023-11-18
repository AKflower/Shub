// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';  // Assuming you have an AuthModule

@Module({
  imports: [AuthModule], // Import other modules if needed
})
export class AppModule {}
