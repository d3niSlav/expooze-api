import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTagDto, TagDto, EditTagDto } from './tag.dto';
import { Tag } from './tag.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async createTag(tagData: CreateTagDto): Promise<TagDto> {
    const newTag = await this.tagsRepository.create(tagData);

    const tag = await this.tagsRepository.save(newTag);

    return this.readTag(tag.id);
  }

  async readTag(id: string): Promise<TagDto> {
    const tag: TagDto = await this.tagsRepository.findOneBy({ id });

    if (!tag) {
      throw new HttpException('Tag not found!', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  async updateTag(id: string, tagData: EditTagDto): Promise<TagDto> {
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

  async readTagsList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<TagDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.tagsRepository.findAndCount({
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
      sortOrder: await prepareSortOrder(sortOrderDto, this.tagsRepository),
    };
  }

  async readAllTags(filters?: {
    ids?: string[];
  }): Promise<Pick<TagDto, 'id' | 'title'>[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.tagsRepository.find({
      where: filter,
      select: ['id', 'title'],
      order: { title: 'asc' },
    });
  }
}
