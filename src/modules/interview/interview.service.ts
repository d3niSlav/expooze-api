import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateInterviewDto,
  InterviewDto,
  UpdateInterviewDto,
} from './interview.dto';
import { Interview } from './interview.entity';
import { ProgrammingLanguageService } from '../programmingLanguage/programming-language.service';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';
import { PositionService } from '../position/position.service';
import { CandidateService } from '../candidate/candidate.service';
import { TagService } from '../tag/tag.service';
import { TagDto } from '../tag/tag.dto';
import { CandidateDto } from '../candidate/candidate.dto';

@Injectable()
export class InterviewService {
  constructor(
    private programmingLanguagesService: ProgrammingLanguageService,
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
    @Inject(forwardRef(() => PositionService))
    private positionsService: PositionService,
    @Inject(forwardRef(() => CandidateService))
    private candidatesService: CandidateService,
    @Inject(forwardRef(() => TagService))
    private tagsService: TagService,
  ) {}

  async createInterview(
    interviewData: CreateInterviewDto,
  ): Promise<InterviewDto> {
    const {
      programmingLanguageId,
      positionId,
      candidatesIds,
      tagIds,
      ...interview
    } = interviewData;

    const programmingLanguage =
      await this.programmingLanguagesService.readProgrammingLanguage(
        programmingLanguageId,
      );

    const position = await this.positionsService.readPosition(positionId);

    let tags: Pick<TagDto, 'id' | 'title'>[] = [];

    if (tagIds?.length > 0) {
      tags = await this.tagsService.readAllTags({ ids: tagIds });
    }

    let candidates: Pick<
      CandidateDto,
      'id' | 'firstName' | 'lastName' | 'email'
    >[] = [];

    if (candidatesIds?.length > 0) {
      candidates = await this.candidatesService.readAllCandidates({
        ids: candidatesIds,
      });
    }

    const newInterview = await this.interviewsRepository.create({
      ...interview,
      programmingLanguage,
      position,
      tags,
      candidates,
    });

    const savedInterview = await this.interviewsRepository.save(newInterview);

    return this.readInterview(savedInterview.id);
  }

  async readInterview(id: string): Promise<InterviewDto> {
    const interview: InterviewDto = await this.interviewsRepository.findOne({
      where: { id },
      relations: ['candidates', 'position', 'tags', 'programmingLanguage'],
    });

    if (!interview) {
      throw new HttpException('Interview not found!', HttpStatus.NOT_FOUND);
    }

    return interview;
  }

  async updateInterview(
    id: string,
    interviewData: UpdateInterviewDto,
  ): Promise<InterviewDto> {
    const { programmingLanguageId, ...newInterviewData } = interviewData;

    const programmingLanguage =
      await this.programmingLanguagesService.readProgrammingLanguage(
        programmingLanguageId,
      );

    const interview = await this.readInterview(id);

    return await this.interviewsRepository.save({
      ...interview,
      ...newInterviewData,
      id,
      programmingLanguage,
    });
  }

  async deleteInterview(id: string): Promise<boolean> {
    const { affected } = await this.interviewsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Interview not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }

  async readInterviewsList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<Interview>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.interviewsRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
      relations: ['programmingLanguage', 'tags', 'position', 'candidates'],
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(
        sortOrderDto,
        this.interviewsRepository,
      ),
    };
  }

  async readAllInterviews(): Promise<InterviewDto[]> {
    return await this.interviewsRepository.find();
  }
}
