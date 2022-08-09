import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateJobTitleDto } from './job-title.dto';
import { JobTitle } from './job-title.entity';
import { JobTitleService } from './job-title.service';

describe('JobTitleService', () => {
  let jobTitleService: JobTitleService;
  let create: jest.Mock;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    create = jest.fn();
    findOne = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobTitleService,
        {
          provide: getRepositoryToken(JobTitle),
          useValue: {
            create,
            findOne,
            save,
          },
        },
      ],
    }).compile();

    jobTitleService = module.get<JobTitleService>(JobTitleService);
  });

  const jobTitle: JobTitle = new JobTitle();
  jobTitle.key = 'test-job-title';
  jobTitle.title = 'Test job title';
  jobTitle.shortTitle = 'TJT';
  jobTitle.description = 'Some text';
  jobTitle.minSalary = 1000;
  jobTitle.averageSalary = 1500;
  jobTitle.maxSalary = 2000;
  jobTitle.createdAt = '2021-01-13 21:45:21.067860';
  jobTitle.updatedAt = '2021-01-13 21:45:21.067860';

  it('should be defined', () => {
    expect(jobTitleService).toBeDefined();
  });

  describe('on getting a job title by key', () => {
    it('should return the job title', async () => {
      findOne.mockReturnValue(Promise.resolve(jobTitle));

      const foundUser = await jobTitleService.getJobTitleByKey(
        'test-job-title',
      );
      expect.assertions(3);
      expect(findOne).toBeCalledWith({ key: jobTitle.key });
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(foundUser).toEqual(jobTitle);
    });

    it('should throw error when job title is not existing in the database', async () => {
      findOne.mockReturnValue(Promise.resolve(undefined));

      expect.assertions(3);

      await expect(
        jobTitleService.getJobTitleByKey('fake-key'),
      ).rejects.toStrictEqual(
        new HttpException('Job title not found!', HttpStatus.NOT_FOUND),
      );

      expect(findOne).toBeCalledWith({ key: 'fake-key' });
      expect(findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('on creating a new job title', () => {
    beforeEach(() => {
      create.mockResolvedValue(jobTitle);
      save.mockReturnValue(Promise.resolve(jobTitle));
    });

    it('should return the new job title', async () => {
      const newJobTitleData: CreateJobTitleDto = {
        title: jobTitle.title,
        shortTitle: jobTitle.shortTitle,
        description: jobTitle.description,
        minSalary: jobTitle.minSalary,
        averageSalary: jobTitle.averageSalary,
        maxSalary: jobTitle.maxSalary,
      };

      const newJobTitle = await jobTitleService.createJobTitle(newJobTitleData);
      expect.assertions(5);
      expect(create).toBeCalledWith({
        ...newJobTitleData,
        key: 'test-job-title',
      });
      expect(create).toHaveBeenCalledTimes(1);
      expect(save).toBeCalledWith(newJobTitle);
      expect(save).toHaveBeenCalledTimes(1);
      expect(newJobTitle).toEqual(jobTitle);
    });
  });
});
