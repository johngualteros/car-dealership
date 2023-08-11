import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
// @UsePipes(new ValidationPipe({ transform: true }))
export class CarsController {

    constructor(private readonly carsService: CarsService) { }

    @Get()
    findAll() {
        return this.carsService.findAll();
    }

    @Get(':id')
    findCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.carsService.findCarById(id);
    }

    @Post()
    create(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCarDto: UpdateCarDto) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.carsService.delete(id);
    }

}
