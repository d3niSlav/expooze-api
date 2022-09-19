import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreatePositionDto,
  PositionDto,
  UpdatePositionDto,
} from './position.dto';
import { Position } from './position.entity';
import { JobTitleService } from '../job-title/job-title.service';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
    @Inject(forwardRef(() => JobTitleService))
    private jobTitlesService: JobTitleService,
  ) {}

  async createPosition(positionData: CreatePositionDto): Promise<PositionDto> {
    const { jobTitleId, ...jobPositionData } = positionData;

    const jobTitle = await this.jobTitlesService.readJobTitle(jobTitleId);

    const newPosition = await this.positionsRepository.create({
      ...jobPositionData,
      jobTitle,
    });

    const jobPosition = await this.positionsRepository.save(newPosition);

    return this.readPosition(jobPosition.id);
  }

  async readPosition(id: string): Promise<PositionDto> {
    const position: PositionDto = await this.positionsRepository.findOne({
      where: { id },
      relations: ['jobTitle'],
    });

    if (!position) {
      throw new HttpException('Position not found!', HttpStatus.NOT_FOUND);
    }

    return position;
  }

  async updatePosition(
    id: string,
    positionData: UpdatePositionDto,
  ): Promise<PositionDto> {
    const { jobTitleId, ...jobPositionData } = positionData;

    const jobTitle = await this.jobTitlesService.readJobTitle(jobTitleId);

    const position = await this.readPosition(id);

    return await this.positionsRepository.save({
      ...position,
      ...jobPositionData,
      id,
      jobTitle,
    });
  }

  async deletePosition(id: string): Promise<boolean> {
    const { affected } = await this.positionsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Position not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }

  async readPositionsList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<PositionDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.positionsRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
      relations: ['jobTitle'],
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(sortOrderDto, this.positionsRepository),
    };
  }

  async readAllPositions(filters?: {
    ids?: string[];
  }): Promise<Pick<PositionDto, 'id' | 'title'>[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.positionsRepository.find({
      where: filter,
      select: ['id', 'title'],
      order: { title: 'asc' },
    });
  }
}
