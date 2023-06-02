import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { Course } from '../course/entities/course.entity'; // Import the Course entity
import { CreateTeacherDto } from './dto/create-teacher-dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>, // Inject the Course repository
  ) {}

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { teacherName, courseIds } = createTeacherDto;
    const courses: Course[] = [];

    for (const courseId of courseIds) {
      const course = await this.courseRepository.findOneBy({
        classID: courseId,
      });
      if (course) {
        courses.push(course);
      } else {
        throw new NotFoundException(`Course with ID ${courseId} not found`);
      }
    }

    const teacher = new Teacher();
    teacher.teacherName = teacherName;
    teacher.courses = courses; // Assign the retrieved courses

    return await this.teacherRepository.save(teacher);
  }

  // Add other methods as needed
}
