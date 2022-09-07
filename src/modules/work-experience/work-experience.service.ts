import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateWorkExperienceDto,
  WorkExperienceDto,
  EditWorkExperienceDto,
} from './work-experience.dto';
import { WorkExperience } from './work-experience.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private workExperiencesRepository: Repository<WorkExperience>,
  ) {}

  async createWorkExperience(
    workExperienceData: CreateWorkExperienceDto,
  ): Promise<WorkExperienceDto> {
    const newWorkExperience = await this.workExperiencesRepository.create(
      workExperienceData,
    );

    const workExperience = await this.workExperiencesRepository.save(
      newWorkExperience,
    );

    return this.readWorkExperience(workExperience.id);
  }

  async readWorkExperience(id: string): Promise<WorkExperienceDto> {
    const workExperience: WorkExperienceDto =
      await this.workExperiencesRepository.findOneBy({ id });

    if (!workExperience) {
      throw new HttpException(
        'WorkExperience not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return workExperience;
  }

  async updateWorkExperience(
    id: string,
    workExperienceData: EditWorkExperienceDto,
  ): Promise<WorkExperienceDto> {
    const workExperience = await this.readWorkExperience(id);

    return await this.workExperiencesRepository.save({
      ...workExperience,
      ...workExperienceData,
      id,
    });
  }

  async deleteWorkExperience(id: string): Promise<boolean> {
    const { affected } = await this.workExperiencesRepository.delete(id);

    if (affected === 0) {
      throw new HttpException(
        'WorkExperience not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return affected === 1;
  }

  async readWorkExperiencesList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<WorkExperienceDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.workExperiencesRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(
        sortOrderDto,
        this.workExperiencesRepository,
      ),
    };
  }
}
