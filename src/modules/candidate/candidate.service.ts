import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreateCandidateDto,
  CandidateDto,
  UpdateCandidateDto,
} from './candidate.dto';
import { Candidate } from './candidate.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';
import { PositionDto } from '../position/position.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  async createCandidate(
    candidateData: CreateCandidateDto,
  ): Promise<CandidateDto> {
    const newCandidate = await this.candidatesRepository.create(candidateData);

    const candidate = await this.candidatesRepository.save(newCandidate);

    return this.readCandidate(candidate.id);
  }

  async readCandidate(id: string): Promise<CandidateDto> {
    const candidate: CandidateDto = await this.candidatesRepository.findOneBy({
      id,
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
