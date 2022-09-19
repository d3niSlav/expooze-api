import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreateCandidateDto,
  CandidateDto,
  UpdateCandidateDto,
} from './candidate.dto';
import { Candidate } from './candidate.entity';
import { PositionDto } from '../position/position.dto';
import { PositionService } from '../position/position.service';
import { WorkExperienceService } from '../work-experience/work-experience.service';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
    @Inject(forwardRef(() => PositionService))
    private positionsService: PositionService,
    @Inject(forwardRef(() => WorkExperienceService))
    private workExperienceService: WorkExperienceService,
  ) {}

  async createCandidate(
    candidateData: CreateCandidateDto,
  ): Promise<CandidateDto> {
    const { experience = [], positionIds, ...data } = candidateData;

    let positions: Pick<PositionDto, 'id' | 'title'>[] = [];

    if (positionIds?.length > 0) {
      positions = await this.positionsService.readAllPositions({
        ids: positionIds,
      });
    }

    const newCandidate = await this.candidatesRepository.create({
      ...data,
      positions,
    });

    const candidate = await this.candidatesRepository.save(newCandidate);

    await experience.forEach((experienceData) => {
      this.workExperienceService.createWorkExperience(
        experienceData,
        candidate,
      );
    });

    return this.readCandidate(candidate.id);
  }

  async readCandidate(id: string): Promise<CandidateDto> {
    const candidate: CandidateDto = await this.candidatesRepository.findOne({
      where: { id },
      relations: ['positions', 'experience', 'experience.skills'],
    });

    if (!candidate) {
      throw new HttpException('Candidate not found!', HttpStatus.NOT_FOUND);
    }

    return candidate;
  }

  async updateCandidate(
    id: string,
    candidateData: UpdateCandidateDto,
  ): Promise<CandidateDto> {
    const candidate = await this.readCandidate(id);

    return await this.candidatesRepository.save({
      ...candidate,
      ...candidateData,
      id,
    });
  }

  async deleteCandidate(id: string): Promise<boolean> {
    const { affected } = await this.candidatesRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Candidate not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }

  async readCandidatesList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<CandidateDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.candidatesRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
      relations: ['positions', 'experience', 'experience.skills'],
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
        this.candidatesRepository,
      ),
    };
  }

  async readAllCandidates(filters?: {
    ids?: string[];
  }): Promise<Pick<CandidateDto, 'id' | 'firstName' | 'lastName' | 'email'>[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.candidatesRepository.find({
      where: filter,
      select: ['id', 'firstName', 'lastName', 'email'],
      order: { firstName: 'asc' },
    });
  }
}
