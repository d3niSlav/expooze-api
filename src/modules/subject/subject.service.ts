import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectDto, SubjectDto, UpdateSubjectDto } from './subject.dto';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async createSubject(subjectData: CreateSubjectDto): Promise<SubjectDto> {
    const newSubject = await this.subjectsRepository.create(subjectData);

    return await this.subjectsRepository.save(newSubject);
  }

  async readSubject(id: string): Promise<SubjectDto> {
    const subject: SubjectDto = await this.subjectsRepository.findOne(id);

    if (!subject) {
      throw new HttpException('Subject not found!', HttpStatus.NOT_FOUND);
    }

    return subject;
  }

  async readAllSubjects(): Promise<SubjectDto[]> {
    return await this.subjectsRepository.find();
  }

  async updateSubject(id: string, subjectData: UpdateSubjectDto): Promise<SubjectDto> {
    const subject = await this.readSubject(id);

    return await this.subjectsRepository.save({ ...subject, ...subjectData, id });
  }

  async deleteSubject(id: string): Promise<boolean> {
    const { affected } = await this.subjectsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Subject not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }
}
