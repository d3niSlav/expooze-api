import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateProgrammingLanguageDto,
  ProgrammingLanguageDto,
  UpdateProgrammingLanguageDto,
} from './programming-language.dto';
import { ProgrammingLanguageService } from './programming-language.service';
import { SuccessResponseDto } from '../../utils/types';
import { SUCCESS } from '../../utils/constants';

@ApiTags('programming-language')
@Controller('programmingLanguage')
export class ProgrammingLanguageController {
  constructor(
    private readonly programmingLanguageService: ProgrammingLanguageService,
  ) {}

  @Get('/list')
  async readAllProgrammingLanguages(): Promise<
    SuccessResponseDto<Pick<ProgrammingLanguageDto, 'id' | 'title'>[]>
  > {
    const languages =
      await this.programmingLanguageService.readAllProgrammingLanguages();

    return {
      message: SUCCESS,
      data: languages,
    };
  }

  @Post()
  createProgrammingLanguage(@Body() data: CreateProgrammingLanguageDto) {
    return this.programmingLanguageService.createProgrammingLanguage(data);
  }

  @Get(':id')
  readProgrammingLanguage(@Param('id') id) {
    return this.programmingLanguageService.readProgrammingLanguage(id);
  }

  @Put(':id')
  updateProgrammingLanguage(
    @Param('id') id,
    @Body() data: UpdateProgrammingLanguageDto,
  ) {
    return this.programmingLanguageService.updateProgrammingLanguage(id, data);
  }

  @Delete(':id')
  deleteProgrammingLanguage(@Param('id') id) {
    return this.programmingLanguageService.deleteProgrammingLanguage(id);
  }
}
