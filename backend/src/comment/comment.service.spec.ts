import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-dto';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a comment', async () => {
    const dto = new CreateCommentDto();
    dto.content = 'test content';

    const result = { id: 1, content: 'test content' };
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await controller.create(dto)).toBe(result);
  });

  it('should get all comments', async () => {
    const result = [{ id: 1, content: 'test content' }];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should get a comment by id', async () => {
    const result = { id: 1, content: 'test content' };
    jest.spyOn(service, 'findById').mockImplementation(async () => result);

    expect(await controller.findById('1')).toBe(result);
  });

  it('should update a comment', async () => {
    const dto = new CreateCommentDto();
    dto.content = 'updated content';

    const result = { id: 1, content: 'updated content' };
    jest.spyOn(service, 'update').mockImplementation(async () => result);

    expect(await controller.update('1', dto)).toBe(result);
  });

  it('should delete a comment', async () => {
    jest.spyOn(service, 'delete').mockImplementation(async () => true);

    expect(await controller.delete('1')).toBe(true);
  });
});
