import React from 'react'
import Head from 'next/head'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Award,
  TrendingUp,
  Users,
  Star
} from 'lucide-react'

const DashboardPage = () => {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const stats = [
    {
      name: 'Courses Enrolled',
      value: '3',
      icon: BookOpen,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      name: 'Total Points',
      value: user.totalPoints?.toString() || '0',
      icon: Trophy,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      name: 'Current Streak',
      value: user.currentStreak?.toString() || '0',
      icon: Target,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      name: 'Badges Earned',
      value: '5',
      icon: Award,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: 'Java Programming Fundamentals',
      progress: 65,
      instructor: 'Admin User',
      nextLesson: 'Object-Oriented Programming',
    },
    {
      id: 2,
      title: 'Web Development with React',
      progress: 30,
      instructor: 'Admin User',
      nextLesson: 'React Components',
    },
    {
      id: 3,
      title: 'Data Structures and Algorithms',
      progress: 80,
      instructor: 'Admin User',
      nextLesson: 'Binary Trees',
    },
  ]

  return (
    <>
      <Head>
        <title>Dashboard - EduRace</title>
        <meta name="description" content="Your EduRace learning dashboard" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold gradient-text">EduRace</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.firstName}! 👋
            </h2>
            <p className="text-gray-600">
              Ready to continue your learning journey? Let's see what's new today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={stat.name} className="card p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Courses */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Continue Learning</h3>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <span className="text-sm text-gray-500">{course.progress}%</span>
                      </div>
                      <div className="progress-bar mb-2">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Next: {course.nextLesson}</span>
                        <button className="text-primary-600 hover:text-primary-700 font-medium">
                          Continue
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions & Achievements */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Quick Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-left">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </button>
                  <button className="w-full btn-outline text-left">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </button>
                  <button className="w-full btn-outline text-left">
                    <Users className="w-4 h-4 mr-2" />
                    Join Challenge
                  </button>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">First Steps</p>
                      <p className="text-xs text-gray-500">Completed first lesson</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Quiz Master</p>
                      <p className="text-xs text-gray-500">Scored 100% on quiz</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Streak Warrior</p>
                      <p className="text-xs text-gray-500">7-day learning streak</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage