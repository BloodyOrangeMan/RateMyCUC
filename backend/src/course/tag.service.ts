import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(tagName: string): Promise<Tag> {
    const tag = new Tag();
    tag.name = tagName;
    return this.tagRepository.save(tag);
  }
  async delete(tagId: number): Promise<void> {
    await this.tagRepository.delete(tagId);
  }
  async findById(tagId: number): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ id: tagId });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }
    return tag;
  }
}
