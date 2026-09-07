import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { CacheClearCommand } from 'typeorm/commands/CacheClearCommand.js';
import { Request } from 'express';

@Injectable()
// implements CanActivate
export class AuthGuard {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('hi');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token);

    if (!token) throw new UnauthorizedException('Missing or invalid JWT');
    try {
      console.log('hi');
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Missing or invalid JWT');
    }
    return true;
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
