import { CreateCommentDto } from './create-comment-dto';
import { validate } from 'class-validator';

describe('CreateCommentDto', () => {
  let createCommentDto: CreateCommentDto;

  beforeEach(() => {
    createCommentDto = new CreateCommentDto();
  });

  it('should be defined', () => {
    expect(createCommentDto).toBeDefined();
  });

  it('should fail validation if content is not a string', async () => {
    createCommentDto.content = {} as any;
    const errors = await validate(createCommentDto);
    expect(errors).toHaveLength(1);
  });

  it('should fail validation if content length is not between 1 and 500', async () => {
    createCommentDto.content = 'a'.repeat(501);
    const errors = await validate(createCommentDto);
    expect(errors).toHaveLength(1);
  });

  it('should pass validation if content is a string with length between 1 and 500', async () => {
    createCommentDto.content = 'a'.repeat(500);
    const errors = await validate(createCommentDto);
    expect(errors).toHaveLength(0);
  });
});
