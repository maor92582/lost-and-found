import { forwardRef, Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsRepository } from './reports.repository';
import { UserModule } from 'src/user/user.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report], 'lost-and-found'),
    forwardRef(() => UserModule),
    forwardRef(() => CommentsModule),
  ],

  controllers: [ReportsController],
  providers: [ReportsRepository, ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
