import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Repository } from 'typeorm';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
  private readonly client: Client;

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {
    this.client = new Client({
      node: 'http://localhost:9200',
      auth: {
        username: process.env.ES_USERNAME || 'elastic',
        password: process.env.ES_PASSWORD || '123change...',
      },
    });
  }

  async searchCourse(
    keyword: string,
    minScore: number,
    page: number,
    limit: number,
  ) {
    const results = await this.courseRepository.query(
      `
    SELECT * 
    FROM (
      SELECT zdb.score(ctid) AS score, course.* 
      FROM course 
      WHERE course ==> $1 
      ORDER BY score DESC
    ) AS subQuery
    WHERE score > $2
    OFFSET $3 LIMIT $4
  `,
      [keyword, minScore, (page - 1) * limit, limit],
    );

    const totalItems = await this.courseRepository.query(
      `
      SELECT COUNT(*) AS total
      FROM (
        SELECT zdb.score(ctid) AS score, course.*
        FROM course
        WHERE course ==> $1
      ) AS subQuery
      WHERE score > $2
  `,
      [keyword, minScore],
    );

    const courseList = results
      .map((course) => {
        const rate =
          course.totalRate == 0
            ? '暂无评分'
            : (course.totalRate / course.numberOfRatings).toFixed(1).toString();
        const numberOfRatings = course.numberOfRatings;

        const teacherNames = course.teacherName
          .replace(/\(.*?\)|\|\d+\|/g, '')
          .split(',')
          .join(',');

        return {
          coursename: course.courseName,
          teachers: teacherNames,
          rate,
          numberofrating: numberOfRatings,
          classID: course.classID,
        };
      })
      .flat();

    return { courseList, totalItems };
  }

  async suggest(index: string, body: Record<string, any>) {
    const result = await this.client.search({
      index,
      body,
    });
    return result;
  }
}
