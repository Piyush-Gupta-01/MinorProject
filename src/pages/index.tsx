import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Zap, 
  Star, 
  ArrowRight,
  Play,
  CheckCircle,
  Award,
  Target,
  Clock,
  DollarSign
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Courses",
      description: "Engage with high-quality courses designed by industry experts"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Learning",
      description: "Compete with peers and climb the leaderboards"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Earn Rewards",
      description: "Win real money rewards based on your performance"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Skill Assessment",
      description: "Test your knowledge with proctored assessments"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "50+", label: "Expert Courses" },
    { number: "₹2,50,000", label: "Rewards Distributed" },
    { number: "95%", label: "Success Rate" }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Developer",
      content: "EduRace transformed my learning experience. The competitive element kept me motivated!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Data Scientist",
      content: "Won ₹15,000 in my first course completion. Amazing platform for serious learners!",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Product Manager",
      content: "The quality of courses and the gamification makes learning addictive in the best way.",
      rating: 5
    }
  ]

  return (
    <>
      <Head>
        <title>EduRace - Gamified Online Learning Platform</title>
        <meta name="description" content="Learn, compete, and earn rewards with EduRace's gamified learning platform. Join thousands of learners in interactive courses." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold gradient-text">EduRace</h1>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#features" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    Features
                  </a>
                  <a href="#courses" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    Courses
                  </a>
                  <a href="#about" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    About
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-600 hover:text-primary-600 font-medium">
                  Login
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Learn. Compete. <span className="gradient-text">Win.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join the ultimate gamified learning experience where education meets competition. 
                Master new skills, compete with peers, and earn real rewards.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
                  Start Learning Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button className="btn-outline text-lg px-8 py-3">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose EduRace?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience learning like never before with our innovative platform that combines education with gamification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card-hover p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-primary-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How EduRace Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple steps to start your learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Course</h3>
                <p className="text-gray-600">Browse our catalog and enroll in courses that match your interests and goals.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Compete</h3>
                <p className="text-gray-600">Complete lessons, take quizzes, and compete with other learners on the leaderboard.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-gray-600">Top performers win cash rewards while everyone gets permanent access to the course.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Learners Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already competing, learning, and earning on EduRace.
            </p>
            <Link href="/auth/signup" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">EduRace</h3>
                <p className="text-gray-400">
                  The ultimate gamified learning platform where education meets competition.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Rewards</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 EduRace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default HomePage