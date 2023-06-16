import { defineStore } from 'pinia'
import axiosInstance from '../plugins/axios/axios'

// Interface for the Course object
export interface Course {
  coursename: string
  teacher: string
  rate: string
  numberofrating: number
  classID: number
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
      // Make a GET request to the course list API
      const response = await axiosInstance.get<Course[]>(
        `api/courses/courseList/${departmentName}`,
      )

      // If the response is successful and contains data
      if (response && response.data) {
        // Update the courseMap with the fetched course data
        this.courseMap[departmentName] = response.data
      }
    },
    async fetchSearchResult(queryString: string, page: number, limit: number) {
      const response = await axiosInstance.get('api/search/', { params: { keyword: queryString, page, limit } })
      if (response && response.data)
        return response.data
    },
  },
})
