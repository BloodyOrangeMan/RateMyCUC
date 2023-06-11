import { defineStore } from 'pinia'

interface Review {
  id: number
  difficulty: string
  gain: string
  score: string
  rate: string
  publishTime: string
  updateTime: string
  content: string
  upvoteCount: number
  downvoteCount: number
  numberOfComments: number
}

interface Course {
  classID: number
  courseNumber: string
  courseName: string
  limitDesc: string
  departmentName: string
  courseTypeName: string
  teacherName: string
  credit: string
  hours: number
  totalDifficulty: number
  totalGain: number
  totalRate: number
  totalScore: number
  numberOfRatings: number
  reviews: Review[]
}

export const useReviewStore = defineStore({
  id: 'review',
  state: (): { course: Course | null } => ({
    course: null,
  }),
  getters: {
    averageDifficulty(state) {
      return (state.course?.totalDifficulty ?? 0) / (state.course?.numberOfRatings ?? 1)
    },
    averageGain(state) {
      return (state.course?.totalGain ?? 0) / (state.course?.numberOfRatings ?? 1)
    },
    averageRate(state) {
      return (state.course?.totalRate ?? 0) / (state.course?.numberOfRatings ?? 1)
    },
    averageScore(state) {
      return (state.course?.totalScore ?? 0) / (state.course?.numberOfRatings ?? 1)
    },
  },
  actions: {
    async fetchCourse(id: number) {
      const response = await fetch(`/api/courses/id/${id}`)

      this.course = await response.json()
    },
  },
})
