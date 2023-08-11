import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  generateSeed() {
    return `This action returns all seed`;
  }
}
