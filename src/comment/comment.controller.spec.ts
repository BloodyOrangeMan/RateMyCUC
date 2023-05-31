import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    service = {
      // mock object
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [{ provide: CommentService, useValue: service }],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a comment', async () => {
    const dto = { content: 'test' };
    service.create.mockResolvedValue(dto);

    expect(await controller.create(dto)).toBe(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all comments', async () => {
    const result = [{ content: 'test1' }, { content: 'test2' }];
    service.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a comment by id', async () => {
    const result = { content: 'test' };
    service.findById.mockResolvedValue(result);

    expect(await controller.findById('1')).toBe(result);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('should update a comment', async () => {
    const dto = { content: 'test updated' };
    service.update.mockResolvedValue(dto);

    expect(await controller.update('1', dto)).toBe(dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a comment', async () => {
    service.delete.mockResolvedValue(true);

    expect(await controller.delete('1')).toBe(true);
    expect(service.delete).toHaveBeenCalledWith(1);
  });

});
