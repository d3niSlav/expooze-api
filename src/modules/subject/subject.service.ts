import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateSubjectDto, SubjectDto, EditSubjectDto } from './subject.dto';
import { Subject } from './subject.entity';
import { TagDto } from '../tag/tag.dto';
import { TagService } from '../tag/tag.service';
import { TopicDto } from '../topic/topic.dto';
import { TopicService } from '../topic/topic.service';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class SubjectService {
  constructor(
    private tagsService: TagService,
    private topicsService: TopicService,
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async createSubject(subjectData: CreateSubjectDto): Promise<SubjectDto> {
    const { tagIds, topicIds, ...newSubjectData } = subjectData;

    let tags: Pick<TagDto, 'id' | 'title'>[] = [];

    if (tagIds?.length > 0) {
      tags = await this.tagsService.readAllTags({ ids: tagIds });
    }

    const topics: Pick<TopicDto, 'id' | 'title'>[] = [];

    if (topicIds?.length > 0) {
      tags = await this.topicsService.readAllTopics({ ids: topicIds });
    }

    const newSubject = await this.subjectsRepository.create({
      ...newSubjectData,
      tags,
      topics,
    });

    const subject = await this.subjectsRepository.save(newSubject);

    return this.readSubject(subject.id);
  }

  async readSubject(id: string): Promise<SubjectDto> {
    const subject: SubjectDto = await this.subjectsRepository.findOne({
      where: { id },
      relations: ['tags', 'topics'],
    });

    if (!subject) {
      throw new HttpException('Subject not found!', HttpStatus.NOT_FOUND);
    }

    return subject;
  }

  async updateSubject(
    id: string,
    subjectData: EditSubjectDto,
  ): Promise<SubjectDto> {
    const { tagIds, topicIds, ...updatedSubjectData } = subjectData;
    const subject = await this.readSubject(id);

    let tags: Pick<TagDto, 'id' | 'title'>[] = [];

    if (tagIds?.length > 0) {
      tags = await this.tagsService.readAllTags({ ids: tagIds });
    }

    const topics: Pick<TopicDto, 'id' | 'title'>[] = [];

    if (topicIds?.length > 0) {
      tags = await this.topicsService.readAllTopics({ ids: topicIds });
    }

    return await this.subjectsRepository.save({
      ...subject,
      ...updatedSubjectData,
      id,
      tags,
      topics,
    });
  }

  async deleteSubject(id: string): Promise<boolean> {
    const { affected } = await this.subjectsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Subject not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }

  async readSubjectsList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<SubjectDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.subjectsRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
      relations: ['topics', 'tags'],
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(sortOrderDto, this.subjectsRepository),
    };
  }

  async readAllSubjects(filters?: {
    ids?: string[];
  }): Promise<Pick<SubjectDto, 'id' | 'title'>[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.subjectsRepository.find({
      where: filter,
      select: ['id', 'title'],
      order: { order: 'desc' },
    });
  }
}
