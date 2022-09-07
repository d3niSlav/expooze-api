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
  UpdateProgrammingLanguageDto,
} from './programming-language.dto';
import { ProgrammingLanguageService } from './programming-language.service';

@ApiTags('programming-language')
@Controller('programmingLanguage')
export class ProgrammingLanguageController {
  constructor(
    private readonly programmingLanguageService: ProgrammingLanguageService,
  ) {}

  @Post()
  createProgrammingLanguage(@Body() data: CreateProgrammingLanguageDto) {
    return this.programmingLanguageService.createProgrammingLanguage(data);
  }

  @Get()
  readAllProgrammingLanguages() {
    return this.programmingLanguageService.readAllProgrammingLanguages();
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
