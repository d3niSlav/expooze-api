import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto, TopicDto, UpdateTopicDto } from './topic.dto';
import { Topic } from './topic.entity';
import { SubjectDto } from '../subject/subject.dto';
import { SubjectService } from '../subject/subject.service';
import { TagDto } from '../tag/tag.dto';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TopicService {
  constructor(
    private subjectsService: SubjectService,
    private tagsService: TagService,
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
  ) {}

  async createTopic(topicData: CreateTopicDto): Promise<TopicDto> {
    const { subjectId, tagIds, ...topic } = topicData;

    const subject = await this.subjectsService.readSubject(subjectId);
    let tags: TagDto[] = [];

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

  async readAllTopics(): Promise<TopicDto[]> {
    return await this.topicsRepository.find();
  }

  async updateTopic(id: string, topicData: UpdateTopicDto): Promise<TopicDto> {
    const { subjectId, tagIds, ...newTopicData } = topicData;

    const topic = await this.readTopic(id);
    let subject: SubjectDto = topic.subject;
    let tags: TagDto[] = topic.tags;

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
}
