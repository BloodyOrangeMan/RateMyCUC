import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course-dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { classID } = createCourseDto;
    
    const existingCourse = await this.courseRepository.findOneBy({ classID });
    if (existingCourse) {
      throw new ConflictException('A course with the same ID already exists');
    }
    
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }
  

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findById(classID: number): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ classID });
    if (!course) {
      throw new ConflictException(`Course with ID ${classID} not found`);
    }
    return course;
  }
  
  // course.service.ts

  async findByTeacher(teacherName: string): Promise<Course[]> {
    const options: FindManyOptions<Course> = {
      where: { teacherName },
    };
  
    const courses = await this.courseRepository.find(options);
    if (courses.length === 0) {
      throw new ConflictException(`Courses with teacherName ${teacherName} not found`);
    }
    return courses;
  }
  

async findByCourseName(courseName: string): Promise<Course[]> {
  const options: FindManyOptions<Course> = {
    where: { courseName },
  };
  const courses = await this.courseRepository.find(options);
    if (courses.length === 0) {
      throw new ConflictException(`Courses with courseName ${courseName} not found`);
    }
    return courses;
}

  async update(classID: number, updateCourseDto: CreateCourseDto): Promise<Course> {
    const result = await this.courseRepository.update(classID, updateCourseDto);
    if (result.affected === 0) {
      throw new ConflictException(`Course with ID ${classID} not found`);
    }
    return this.courseRepository.findOneBy({ classID });
  }
  
  async delete(id: number): Promise<void> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new ConflictException(`Course with ID ${id} not found`);
    }
  }
}

