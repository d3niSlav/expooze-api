import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgrammingLanguageController } from './programming-language.controller';
import { ProgrammingLanguage } from './programming-language.entity';
import { ProgrammingLanguageService } from './programming-language.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgrammingLanguage])],
  providers: [ProgrammingLanguageService],
  controllers: [ProgrammingLanguageController],
  exports: [ProgrammingLanguageService],
})
export class ProgrammingLanguageModule {}
