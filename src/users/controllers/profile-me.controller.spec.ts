import { Test, TestingModule } from '@nestjs/testing';
import { ProfileMeController } from './profile-me.controller';

describe('ProfileMeController', () => {
  let controller: ProfileMeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileMeController],
    }).compile();

    controller = module.get<ProfileMeController>(ProfileMeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
