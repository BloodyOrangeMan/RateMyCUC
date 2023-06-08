import axios from 'axios'
import { defineStore } from 'pinia'

interface Course {
  coursename: string
  teacher: string
  rate: number
  numberofrating: number
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    courseList: [] as Course[],
  }),
  actions: {
    async fetchCourseListByDepartment(departmentName: string) {
      try {
        const response = await axios.get<Course[]>(
          `api/courses/courseList/${departmentName}`
        )
        if (response && response.data) {
          this.courseList = response.data
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
})
