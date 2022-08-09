import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePositionDto, PositionDto, UpdatePositionDto } from './position.dto';
import { Position } from './position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  async createPosition(positionData: CreatePositionDto): Promise<PositionDto> {
    const newPosition = await this.positionsRepository.create(positionData);

    return await this.positionsRepository.save(newPosition);
  }

  async readPosition(id: string): Promise<PositionDto> {
    const position: PositionDto = await this.positionsRepository.findOne(id);

    if (!position) {
      throw new HttpException('Position not found!', HttpStatus.NOT_FOUND);
    }

    return position;
  }

  async readAllPositions(): Promise<PositionDto[]> {
    return await this.positionsRepository.find();
  }

  async updatePosition(id: string, positionData: UpdatePositionDto): Promise<PositionDto> {
    const position = await this.readPosition(id);

    return await this.positionsRepository.save({ ...position, ...positionData, id });
  }

  async deletePosition(id: string): Promise<boolean> {
    const { affected } = await this.positionsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Position not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }
}
