import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

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
}
