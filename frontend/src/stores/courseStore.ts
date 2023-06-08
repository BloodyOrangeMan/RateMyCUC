import axios from 'axios';
import { defineStore } from 'pinia';

// Interface for the Course object
interface Course {
  coursename: string;
  teacher: string;
  rate: number;
  numberofrating: number;
}

// Define the course store using pinia
export const useCourseStore = defineStore('course', {
  state: () => ({
    // Object to store course data by department
    courseMap: {} as Record<string, Course[]>,
  }),
  actions: {
    // Fetch the course list for a specific department
    async fetchCourseListByDepartment(departmentName: string) {
      try {
        // Make a GET request to the course list API
        const response = await axios.get<Course[]>(
          `api/courses/courseList/${departmentName}`
        );

        // If the response is successful and contains data
        if (response && response.data) {
          // Update the courseMap with the fetched course data
          this.courseMap[departmentName] = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
});
