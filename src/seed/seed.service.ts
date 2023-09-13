import { Inject, Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/services/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  @Inject('CarsService') private readonly carsService: CarsService;
  @Inject('BrandsService') private readonly brandsService: BrandsService;

  generateSeed() {
    // CARS_SEED;
    // BRANDS_SEED;
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    return `Seed executed succesfully`;
  }
}
