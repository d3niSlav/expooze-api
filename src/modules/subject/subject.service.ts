import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectDto, SubjectDto, EditSubjectDto } from './subject.dto';
import { Subject } from './subject.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async createSubject(subjectData: CreateSubjectDto): Promise<SubjectDto> {
    const newSubject = await this.subjectsRepository.create(subjectData);

    const subject = await this.subjectsRepository.save(newSubject);

    return this.readSubject(subject.id);
  }

  async readSubject(id: string): Promise<SubjectDto> {
    const subject: SubjectDto = await this.subjectsRepository.findOneBy({ id });

    if (!subject) {
      throw new HttpException('Subject not found!', HttpStatus.NOT_FOUND);
    }

    return subject;
  }

  async updateSubject(
    id: string,
    subjectData: EditSubjectDto,
  ): Promise<SubjectDto> {
    const subject = await this.readSubject(id);

    return await this.subjectsRepository.save({
      ...subject,
      ...subjectData,
      id,
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

  async readAllSubjects(): Promise<SubjectDto[]> {
    return await this.subjectsRepository.find();
  }
}
