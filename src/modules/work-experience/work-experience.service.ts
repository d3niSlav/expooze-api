import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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
import { Candidate } from '../candidate/candidate.entity';
import { TagDto } from '../tag/tag.dto';
import { TagService } from '../tag/tag.service';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private workExperiencesRepository: Repository<WorkExperience>,
    @Inject(forwardRef(() => TagService))
    private tagsService: TagService,
  ) {}

  async createWorkExperience(
    workExperienceData: CreateWorkExperienceDto,
    candidate: Candidate,
  ): Promise<WorkExperienceDto> {
    const { skillIds, ...newExperienceData } = workExperienceData;

    let tags: Pick<TagDto, 'id' | 'title'>[] = [];

    if (skillIds?.length > 0) {
      tags = await this.tagsService.readAllTags({ ids: skillIds });
    }

    const newWorkExperience = await this.workExperiencesRepository.create({
      ...newExperienceData,
      candidate,
      skills: tags,
    });

    const workExperience = await this.workExperiencesRepository.save(
      newWorkExperience,
    );

    return this.readWorkExperience(workExperience.id);
  }

  async readWorkExperience(id: string): Promise<WorkExperienceDto> {
    const workExperience: WorkExperienceDto =
      await this.workExperiencesRepository.findOne({
        where: { id },
        relations: ['skills'],
      });

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
