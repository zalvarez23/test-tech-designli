import { Test, TestingModule } from '@nestjs/testing';
import { ParseMailService } from './parse-mail.service';

describe('ParseMailService', () => {
  let service: ParseMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseMailService],
    }).compile();

    service = module.get<ParseMailService>(ParseMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
