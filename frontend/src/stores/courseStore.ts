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
    suggestions: [] as string [],
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
    async fetchSuggestion(queryString: string) {
      const response = await axiosInstance.get('api/search/suggest', { params: { term: queryString } })
      if (response && response.data) {
        const result = response.data
        const results = []

        const courseSuggestions = result['course-suggestion']
        if (courseSuggestions.length > 0) {
          const courseOptions = courseSuggestions[0].options
          const courseTexts = courseOptions.map((option: { text: string }) => option.text)

          results.push(...courseTexts)
        }

        // 处理 teacher-suggestion
        const teacherSuggestions = result['teacher-suggestion']
        if (teacherSuggestions.length > 0) {
          const teacherOptions = teacherSuggestions[0].options
          const teacherTexts = teacherOptions.map((option: { text: string }) => option.text)

          results.push(...teacherTexts)
        }
        this.suggestions = results
      }
    },
  },
})
