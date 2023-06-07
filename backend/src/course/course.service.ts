import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course-dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
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
    const course = await this.courseRepository.findOneBy({ classID });
    if (!course) {
      throw new NotFoundException(`Course with ID ${classID} not found`);
    }
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

  async findCourseList(): Promise<any[]> {
    const courses = await this.courseRepository.find();

    const departmentsMap = new Map<string, any>();
    for (const course of courses) {
      let department = departmentsMap.get(course.departmentName);
      if (!department) {
        department = {
          departmentName: course.departmentName,
          courseByDepartment: [],
        };
        departmentsMap.set(course.departmentName, department);
      }

      let courseInfo = department.courseByDepartment.find(
        (info) => info.courseName === course.courseName,
      );
      if (!courseInfo) {
        courseInfo = {
          courseName: course.courseName,
          courseList: [],
        };
        department.courseByDepartment.push(courseInfo);
      }

      const { teacherName, credit, numberOfRatings, totalRate } =
        course;
      courseInfo.courseList.push({
        teacherName,
        credit,
        numberOfRating: numberOfRatings,
        rate: totalRate,
      });
    }

    return Array.from(departmentsMap.values());
  }
}
