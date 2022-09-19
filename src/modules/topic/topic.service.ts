import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTopicDto, TopicDto, EditTopicDto } from './topic.dto';
import { Topic } from './topic.entity';
import { SubjectDto } from '../subject/subject.dto';
import { SubjectService } from '../subject/subject.service';
import { TagDto } from '../tag/tag.dto';
import { TagService } from '../tag/tag.service';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    @Inject(forwardRef(() => SubjectService))
    private subjectsService: SubjectService,
    @Inject(forwardRef(() => TagService))
    private tagsService: TagService,
  ) {}

  async createTopic(topicData: CreateTopicDto): Promise<TopicDto> {
    const { subjectId, tagIds, ...topic } = topicData;

    const subject = await this.subjectsService.readSubject(subjectId);
    let tags: Pick<TagDto, 'id' | 'title'>[] = [];

    if (tagIds?.length > 0) {
      tags = await this.tagsService.readAllTags({ ids: tagIds });
    }

    const newTopic = await this.topicsRepository.create({
      ...topic,
      subject,
      tags,
    });

    return await this.topicsRepository.save(newTopic);
  }

  async readTopic(id: string): Promise<TopicDto> {
    const topic: TopicDto = await this.topicsRepository.findOne({
      where: { id },
      relations: ['tags', 'subject'],
    });

    if (!topic) {
      throw new HttpException('Topic not found!', HttpStatus.NOT_FOUND);
    }

    return topic;
  }

  async updateTopic(id: string, topicData: EditTopicDto): Promise<TopicDto> {
    const { subjectId, tagIds, ...newTopicData } = topicData;

    const topic = await this.readTopic(id);
    let subject: SubjectDto = topic.subject;
    let tags: Pick<TagDto, 'id' | 'title'>[] = topic.tags;

    if (tagIds?.length > 0) {
      const newTagIds = tagIds.filter(
        (tagId) => tags.findIndex((tag) => tag.id === tagId) < 0,
      );
      const updatedTags = tags.filter((tag) => tagIds.includes(tag.id));

      tags = [...updatedTags];

      if (newTagIds.length > 0) {
        tags = [
          ...tags,
          ...(await this.tagsService.readAllTags({ ids: newTagIds })),
        ];
      }
    }

    if (topic.subject.id !== subjectId) {
      subject = await this.subjectsService.readSubject(subjectId);
    }

    return await this.topicsRepository.save({
      ...topic,
      ...newTopicData,
      id,
      subject,
      tags,
    });
  }

  async deleteTopic(id: string): Promise<boolean> {
    const { affected } = await this.topicsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Topic not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }

  async readTopicsList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<TopicDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.topicsRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
      relations: ['tags', 'subject', 'questions'],
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(sortOrderDto, this.topicsRepository),
    };
  }

  async readAllTopics(filters?: {
    ids?: string[];
  }): Promise<Pick<TopicDto, 'id' | 'title'>[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.topicsRepository.find({
      where: filter,
      select: ['id', 'title'],
      order: { order: 'asc' },
    });
  }
}
