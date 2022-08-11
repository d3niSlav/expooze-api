import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProgrammingLanguageDto,
  ProgrammingLanguageDto,
  UpdateProgrammingLanguageDto,
} from './programming-language.dto';
import { ProgrammingLanguage } from './programming-language.entity';

@Injectable()
export class ProgrammingLanguageService {
  constructor(
    @InjectRepository(ProgrammingLanguage)
    private programmingLanguagesRepository: Repository<ProgrammingLanguage>,
  ) {}

  async createProgrammingLanguage(
    programmingLanguageData: CreateProgrammingLanguageDto,
  ): Promise<ProgrammingLanguageDto> {
    const newProgrammingLanguage =
      await this.programmingLanguagesRepository.create(programmingLanguageData);

    return await this.programmingLanguagesRepository.save(
      newProgrammingLanguage,
    );
  }

  async readProgrammingLanguage(id: string): Promise<ProgrammingLanguageDto> {
    const programmingLanguage: ProgrammingLanguageDto =
      await this.programmingLanguagesRepository.findOneBy({ id });

    if (!programmingLanguage) {
      throw new HttpException(
        'ProgrammingLanguage not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return programmingLanguage;
  }

  async readAllProgrammingLanguages(): Promise<ProgrammingLanguageDto[]> {
    return await this.programmingLanguagesRepository.find();
  }

  async updateProgrammingLanguage(
    id: string,
    programmingLanguageData: UpdateProgrammingLanguageDto,
  ): Promise<ProgrammingLanguageDto> {
    const programmingLanguage = await this.readProgrammingLanguage(id);

    return await this.programmingLanguagesRepository.save({
      ...programmingLanguage,
      ...programmingLanguageData,
      id,
    });
  }

  async deleteProgrammingLanguage(id: string): Promise<boolean> {
    const { affected } = await this.programmingLanguagesRepository.delete(id);

    if (affected === 0) {
      throw new HttpException(
        'ProgrammingLanguage not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return affected === 1;
  }
}
