import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getInfo(): any {
    return {
      name: 'Project Name APIs',
      version: '0.0.1-beta',
    };
  }
}
