import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDto, TagDto, UpdateTagDto } from './tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async createTag(tagData: CreateTagDto): Promise<TagDto> {
    const newTag = await this.tagsRepository.create(tagData);

    return await this.tagsRepository.save(newTag);
  }

  async readTag(id: string): Promise<TagDto> {
    const tag: TagDto = await this.tagsRepository.findOne(id);

    if (!tag) {
      throw new HttpException('Tag not found!', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  async readAllTags(): Promise<TagDto[]> {
    return await this.tagsRepository.find();
  }

  async updateTag(id: string, tagData: UpdateTagDto): Promise<TagDto> {
    const tag = await this.readTag(id);

    return await this.tagsRepository.save({ ...tag, ...tagData, id });
  }

  async deleteTag(id: string): Promise<boolean> {
    const { affected } = await this.tagsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Tag not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }
}