import axios from 'axios'
import { defineStore } from 'pinia'
import { useErrorStore } from './errorStore'

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

interface CourseTag {
  courseId: number
  tagId: number
  upvotes: number
  tag: Tag
}
interface Tag {
  id: number
  name: string
  totalUpvotes: number
}

interface Teacher {
  id: number
  teacherName: string
  courses: SimplifyCourse[]
}

interface SimplifyCourse {
  classID: number
  courseName: string
  tags: []
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
  courseTags: CourseTag[]
  teachers: Teacher[]
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
      const response = await axios.get(`/api/courses/${id}`)

      this.course = await response.data
    },
    async upvoteTag(courseId: number, tagId: number) {
      try {
        await axios.post(`/api/courses/${courseId}/tags/${tagId}/upvote`)

        await this.fetchCourse(courseId)
      }
      catch (error) {
        const errorStore = useErrorStore()

        errorStore.setErrorMessage(error.message)
      }
    },
    async addTag(courseId: number, tagName: string) {
      try {
        await axios.post(`/api/courses/${courseId}/tags`, { tagName })
        await this.fetchCourse(courseId)
      }
      catch (error) {
        const errorStore = useErrorStore()

        errorStore.setErrorMessage(error.message)
      }
    },
  },
})
