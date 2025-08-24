import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token')
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  signup: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
  }) => api.post('/auth/signup', userData),
  
  googleAuth: (googleData: {
    googleId: string
    email: string
    firstName: string
    lastName: string
    profileImage?: string
  }) => api.post('/auth/google', googleData),
  
  refreshToken: (token: string) =>
    api.post('/auth/refresh', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  verifyToken: (token: string) =>
    api.get('/auth/verify-token', {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
}

// Courses API
export const coursesAPI = {
  getAll: () => api.get('/courses'),
  
  getById: (id: number) => api.get(`/courses/${id}`),
  
  getPublic: () => api.get('/courses/public'),
  
  getEnrolled: () => api.get('/courses/enrolled'),
  
  enroll: (courseId: number, paymentData?: any) =>
    api.post(`/courses/${courseId}/enroll`, paymentData),
  
  getProgress: (courseId: number) =>
    api.get(`/courses/${courseId}/progress`),
  
  getLessons: (courseId: number) =>
    api.get(`/courses/${courseId}/lessons`),
  
  getLesson: (courseId: number, lessonId: number) =>
    api.get(`/courses/${courseId}/lessons/${lessonId}`),
  
  completeLesson: (courseId: number, lessonId: number) =>
    api.post(`/courses/${courseId}/lessons/${lessonId}/complete`),
}

// Quiz API
export const quizAPI = {
  getQuiz: (lessonId: number) =>
    api.get(`/lessons/${lessonId}/quiz`),
  
  startAttempt: (quizId: number) =>
    api.post(`/quizzes/${quizId}/attempts`),
  
  submitAnswer: (attemptId: number, questionId: number, answer: {
    selectedOptionId?: number
    answerText?: string
  }) => api.post(`/quiz-attempts/${attemptId}/answers`, {
    questionId,
    ...answer
  }),
  
  completeAttempt: (attemptId: number) =>
    api.post(`/quiz-attempts/${attemptId}/complete`),
  
  getAttempts: (quizId: number) =>
    api.get(`/quizzes/${quizId}/attempts`),
  
  getAttemptResults: (attemptId: number) =>
    api.get(`/quiz-attempts/${attemptId}/results`),
}

// Leaderboard API
export const leaderboardAPI = {
  getCourseLeaderboard: (courseId: number) =>
    api.get(`/courses/${courseId}/leaderboard`),
  
  getGlobalLeaderboard: () =>
    api.get('/leaderboard/global'),
  
  getUserRank: (courseId: number) =>
    api.get(`/courses/${courseId}/leaderboard/my-rank`),
}

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  
  updateProfile: (data: {
    firstName?: string
    lastName?: string
    phone?: string
    profileImage?: string
  }) => api.put('/users/profile', data),
  
  changePassword: (data: {
    currentPassword: string
    newPassword: string
  }) => api.put('/users/change-password', data),
  
  getBadges: () => api.get('/users/badges'),
  
  getStats: () => api.get('/users/stats'),
  
  getEnrollments: () => api.get('/users/enrollments'),
}

// Payment API
export const paymentAPI = {
  createOrder: (courseId: number) =>
    api.post('/payments/create-order', { courseId }),
  
  verifyPayment: (paymentData: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    courseId: number
  }) => api.post('/payments/verify', paymentData),
  
  getPaymentHistory: () =>
    api.get('/payments/history'),
}

// Proctoring API
export const proctoringAPI = {
  startSession: (quizId: number) =>
    api.post(`/proctoring/start`, { quizId }),
  
  endSession: (sessionId: number) =>
    api.post(`/proctoring/${sessionId}/end`),
  
  reportViolation: (sessionId: number, violation: {
    type: string
    description: string
    timestamp: string
  }) => api.post(`/proctoring/${sessionId}/violation`, violation),
}

// WebSocket connection for real-time features
export const createWebSocketConnection = (token: string) => {
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8081'
  
  if (typeof window !== 'undefined') {
    const socket = new WebSocket(`${WS_URL}/ws?token=${token}`)
    
    socket.onopen = () => {
      console.log('WebSocket connected')
    }
    
    socket.onclose = () => {
      console.log('WebSocket disconnected')
    }
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    
    return socket
  }
  
  return null
}

export default api