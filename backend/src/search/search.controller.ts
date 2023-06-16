import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/')
  @ApiOperation({ summary: 'Search courses' })
  @ApiQuery({
    name: 'keyword',
    required: true,
    type: String,
    description: 'Search keyword',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Limit per page',
  })
  async searchCourse(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const minScore = 5;
    const result = await this.searchService.searchCourse(
      keyword,
      minScore,
      page,
      limit,
    );
    return result;
  }
}
