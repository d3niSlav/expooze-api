import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { InterviewAnswer } from './interview-answer.entity';
import { InterviewDto } from '../interview/interview.dto';
import { QuestionDto } from '../question/question.dto';
import { SubjectDto } from '../subject/subject.dto';
import { TopicDto } from '../topic/topic.dto';

export class InterviewAnswerDto implements InterviewAnswer {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  readonly interview: InterviewDto;

  @IsOptional()
  readonly subject?: SubjectDto;

  @IsOptional()
  readonly topic?: TopicDto;

  @IsOptional()
  readonly question?: QuestionDto;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateInterviewAnswerDto {
  @IsString()
  @IsNotEmpty()
  readonly interviewId: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;
}

export class UpdateInterviewAnswerDto extends CreateInterviewAnswerDto {
  @IsOptional()
  readonly id?: string;
}
