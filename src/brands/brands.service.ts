import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Brand 1',
    //   createdAt: new Date().getTime(),
    // }
  ]
  create(createBrandDto: CreateBrandDto) {
    const newBrand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: new Date().getTime(),
    }
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brands = this.brands.find((brand) => brand.id === id);
    if (!brands) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brands;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if(brand.id === id) {
        brand.updatedAt = new Date().getTime();
        brand = {...brand, ...updateBrandDto};
      }
      return brand;
    });    
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
