import { IsNotEmpty, IsOptional } from 'class-validator';

import { Candidate } from './candidate.entity';
import { Position } from '../position/position.entity';
import { WorkExperience } from '../work-experience/work-experience.entity';

export class CandidateDto implements Candidate {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsOptional()
  readonly middleName?: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsOptional()
  readonly introduction?: string;

  @IsOptional()
  readonly dateOfBirth?: string;

  @IsOptional()
  readonly age?: number;

  @IsOptional()
  readonly currentCountry?: string;

  @IsOptional()
  readonly currentCity?: string;

  @IsOptional()
  readonly currentAddress?: string;

  @IsOptional()
  readonly permanentCountry?: string;

  @IsOptional()
  readonly permanentCity?: string;

  @IsOptional()
  readonly permanentAddress?: string;

  @IsOptional()
  readonly gender?: string;

  @IsOptional()
  readonly desiredSalary?: number;

  @IsOptional()
  readonly desiredLocation?: string;

  @IsOptional()
  readonly relocate?: boolean;

  @IsOptional()
  readonly workModel?: string;

  @IsOptional()
  readonly positions?: Position[];

  @IsOptional()
  readonly experience?: WorkExperience[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateCandidateDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsOptional()
  readonly middleName?: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsOptional()
  readonly introduction?: string;

  @IsOptional()
  readonly dateOfBirth?: string;

  @IsOptional()
  readonly age?: number;

  @IsOptional()
  readonly currentCountry?: string;

  @IsOptional()
  readonly currentCity?: string;

  @IsOptional()
  readonly currentAddress?: string;

  @IsOptional()
  readonly permanentCountry?: string;

  @IsOptional()
  readonly permanentCity?: string;

  @IsOptional()
  readonly permanentAddress?: string;

  @IsOptional()
  readonly gender?: string;

  @IsOptional()
  readonly desiredSalary?: number;

  @IsOptional()
  readonly desiredLocation?: string;

  @IsOptional()
  readonly relocate?: boolean;

  @IsOptional()
  readonly workModel?: string;

  @IsOptional()
  readonly positionIds?: string[];
}

export class UpdateCandidateDto extends CreateCandidateDto {
  @IsOptional()
  readonly id?: string;

  @IsOptional()
  readonly experienceIds?: string[];
}
