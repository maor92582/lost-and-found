import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Comment } from '../comments/comment.entity';
import { Report } from '../reports/report.entity';
import { User } from '../user/user.entity';
export const typeOrmConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('PG_PORT'),
    username: configService.get<string>('PG_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    autoLoadEntities: true,
    synchronize: true,
    entities: [User, Comment, Report],
  };
};
