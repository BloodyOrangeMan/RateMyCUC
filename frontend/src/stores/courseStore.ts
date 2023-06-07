import axios from 'axios';
import { defineStore } from 'pinia';

interface Course {
  departmentName: string;
  courseByDepartment: {
    courseName: string;
    courseList: {
      teacherName: string;
      credit: string;
      numberOfRating: number;
      rate: number;
    }[];
  }[];
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    courseList: [] as Course[],
  }),
  actions: {
    async fetchCourseList() {
      try {
        const response = await axios.get<Course[]>('/courseList');
        if (response && response.data) {
          this.courseList = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
});
