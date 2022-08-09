import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto, TopicDto, UpdateTopicDto } from './topic.dto';
import { Topic } from './topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
  ) {}

  async createTopic(topicData: CreateTopicDto): Promise<TopicDto> {
    const newTopic = await this.topicsRepository.create(topicData);

    return await this.topicsRepository.save(newTopic);
  }

  async readTopic(id: string): Promise<TopicDto> {
    const topic: TopicDto = await this.topicsRepository.findOne(id);

    if (!topic) {
      throw new HttpException('Topic not found!', HttpStatus.NOT_FOUND);
    }

    return topic;
  }

  async readAllTopics(): Promise<TopicDto[]> {
    return await this.topicsRepository.find();
  }

  async updateTopic(id: string, topicData: UpdateTopicDto): Promise<TopicDto> {
    const topic = await this.readTopic(id);

    return await this.topicsRepository.save({ ...topic, ...topicData, id });
  }

  async deleteTopic(id: string): Promise<boolean> {
    const { affected } = await this.topicsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Topic not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }
}
