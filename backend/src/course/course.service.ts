import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course-dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { CourseTag } from './entities/course-tag.entity';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { UserUpvoteTag } from './entities/user-upvote';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(CourseTag)
    private courseTagRepository: Repository<CourseTag>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(UserUpvoteTag)
    private readonly userUpvoteTagRepository: Repository<UserUpvoteTag>,
    private readonly tagService: TagService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { classID, teacherName } = createCourseDto;

    const existingCourse = await this.courseRepository.findOneBy({ classID });
    if (existingCourse) {
      throw new ConflictException('A course with the same ID already exists');
    }

    let teacher: Teacher;
    if (teacherName) {
      teacher = await this.teacherRepository.findOneBy({ teacherName });
      if (teacher) {
        // Update the existing teacher
        teacher.teacherName = teacherName;
      } else {
        // Create a new teacher
        teacher = this.teacherRepository.create({ teacherName });
      }
    }

    const course = this.courseRepository.create(createCourseDto);
    course.teachers = [teacher]; // Set the teacher array

    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    const courses = this.courseRepository.find();
    if ((await courses).length === 0) {
      throw new NotFoundException('Courses not found');
    }
    return this.courseRepository.find();
  }

  async findById(classID: number): Promise<Course> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.reviews', 'reviews')
      .leftJoinAndSelect('reviews.author', 'author') // 修改了这一行
      .leftJoinAndSelect('course.teachers', 'teachers')
      .leftJoinAndSelect('course.courseTags', 'courseTags')
      .leftJoinAndSelect('courseTags.tag', 'tag')
      .where('course.classID = :classID', { classID })
      .orderBy({
        'courseTags.upvotes': 'DESC',
        'reviews.upvoteCount': 'DESC',
      })
      .getOne();

    if (!course) {
      throw new NotFoundException(`Course with ID ${classID} not found`);
    }

    course.teacherName = course.teachers
      .map((teacher) => teacher.teacherName.replace(/\(.*?\)/g, ''))
      .join(', ');

    // Get related courses for each teacher separately
    for (const teacher of course.teachers) {
      teacher.courses = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoin('course.teachers', 'teacher')
        .select(['course.classID', 'course.courseName'])
        .where('teacher.id = :teacherId', { teacherId: teacher.id })
        .andWhere('course.classID != :classID', { classID: course.classID })
        .limit(5)
        .getMany();
    }

    course.reviews.map((review) => {
      delete review.author.password;
    });

    return course;
  }

  async findByNumber(courseNumber: string): Promise<Course[]> {
    const options: FindManyOptions<Course> = {
      where: { courseNumber },
    };

    const courses = await this.courseRepository.find(options);
    if (courses.length === 0) {
      throw new NotFoundException(
        `Courses with teacherName ${courseNumber} not found`,
      );
    }
    return courses;
  }

  async findByTeacher(teacherName: string): Promise<Course[]> {
    const options: FindManyOptions<Course> = {
      where: { teacherName },
    };

    const courses = await this.courseRepository.find(options);
    if (courses.length === 0) {
      throw new NotFoundException(
        `Courses with teacherName ${teacherName} not found`,
      );
    }
    return courses;
  }

  async findByCourseName(courseName: string): Promise<Course[]> {
    const options: FindManyOptions<Course> = {
      where: { courseName },
    };
    const courses = await this.courseRepository.find(options);
    if (courses.length === 0) {
      throw new NotFoundException(
        `Courses with courseName ${courseName} not found`,
      );
    }
    return courses;
  }

  async update(
    classID: number,
    updateCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const result = await this.courseRepository.update(classID, updateCourseDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${classID} not found`);
    }
    return this.courseRepository.findOneBy({ classID });
  }

  async delete(id: number): Promise<void> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

  async findCourseList(departmentName: string): Promise<any[]> {
    const options: FindManyOptions<Course> = {
      where: { departmentName },
      relations: ['teachers'],
    };

    const courses = await this.courseRepository.find(options);

    const courseList = courses
      .map((course) => {
        const rate =
          course.totalRate == 0
            ? '暂无评分'
            : (course.totalRate / course.numberOfRatings).toFixed(1).toString();
        const numberOfRatings = course.numberOfRatings;

        const teacherNames = course.teachers
          .map((teacher) => teacher.teacherName.replace(/\(.*?\)/g, ''))
          .join(', ');

        return {
          coursename: course.courseName,
          teacher: teacherNames,
          rate,
          numberofrating: numberOfRatings,
          classID: course.classID,
        };
      })
      .flat();

    return courseList;
  }

  async addTagToCourse(courseId: number, tagId: number): Promise<CourseTag> {
    const courseTag = new CourseTag();
    courseTag.course = await this.courseRepository.findOneBy({
      classID: courseId,
    });
    courseTag.tag = await this.tagService.findById(tagId);
    return this.courseTagRepository.save(courseTag);
  }

  async removeTagFromCourse(courseId: number, tagId: number): Promise<void> {
    const courseTag = await this.courseTagRepository.findOne({
      where: { courseId, tagId },
    });
    if (!courseTag) {
      throw new NotFoundException(
        `CourseTag with Course ID ${courseId} and Tag ID ${tagId} not found`,
      );
    }
    await this.courseTagRepository.remove(courseTag);
  }

  async upvoteTagOnCourse(
    userId: number,
    courseId: number,
    tagId: number,
  ): Promise<CourseTag> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['upvotes', 'upvotes.courseTag'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const courseTag = await this.courseTagRepository.findOne({
      where: { courseId, tagId },
      relations: ['tag'],
    });
    if (!courseTag) {
      throw new NotFoundException(
        `CourseTag with Course ID ${courseId} and Tag ID ${tagId} not found`,
      );
    }
    const hasUpvoted = user.upvotes.some(
      (upvote) => upvote.courseTag.tagId === courseTag.tagId,
    );

    if (hasUpvoted) {
      throw new ConflictException(`User has already upvoted this course tag.`);
    }

    await this.userUpvoteTagRepository.save({
      user,
      courseTag,
    });

    courseTag.upvotes++;
    await this.courseTagRepository.save(courseTag);

    courseTag.tag.totalUpvotes++;
    await this.tagRepository.save(courseTag.tag);

    return courseTag;
  }

  async createTagAndAddToCourse(
    courseId: number,
    tagName: string,
  ): Promise<CourseTag> {
    const course = await this.courseRepository.findOne({
      where: { classID: courseId },
      relations: ['courseTags'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    let tag = await this.tagRepository.findOne({ where: { name: tagName } });
    if (!tag) {
      tag = await this.tagRepository.save({ name: tagName });
    }

    let courseTag = await this.courseTagRepository.findOne({
      where: { course: { classID: course.classID }, tag: { id: tag.id } },
    });

    if (courseTag) {
      throw new ConflictException(`The tag is already added to the course.`);
    }

    courseTag = await this.courseTagRepository.save({
      course,
      tag,
      upvotes: 0,
    });

    return courseTag;
  }
}
