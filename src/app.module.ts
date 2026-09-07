import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'lost-and-found',
      type: 'postgres',
      host: 'localhost',
      port: 6767,
      username: 'postgres',
      password: 'pass',
      database: 'laf-manag',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Comment, Report],
    }),

    AuthModule,
    UserModule,
    ReportsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
