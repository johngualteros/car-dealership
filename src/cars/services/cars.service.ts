import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../interfaces/car.interface';
import { v4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from '../dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: v4(),
        //     brand: 'BMW',
        //     model: 'X5'
        // },
    ];

    findAll() {
        return this.cars;
    }

    findCarById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car not found by id ${id}`);
        return car;
    }

    create(createCarDto: CreateCarDto) {
        this.cars.push({
            id: v4(),
            ...createCarDto
        });
        return createCarDto;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        const car = this.findCarById(id);
        const carIndex = this.cars.findIndex(car => car.id === id);
        this.cars[carIndex] = {
            ...car,
            ...updateCarDto 
        };
        return this.cars[carIndex];
    }

    delete(id: string) {
        const carIndex = this.cars.findIndex(car => car.id === id);
        if (carIndex === -1) throw new NotFoundException(`Car not found by id ${id}`);
        this.cars.splice(carIndex, 1);
        return { deleted: true };
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
