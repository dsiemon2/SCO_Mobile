import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Star, Utensils } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDragScroll } from '../hooks/useDragScroll'

function CountdownTimer() {
  const eventDate = new Date('2025-10-19T11:00:00')
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const diff = eventDate.getTime() - new Date().getTime()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{value}</span>
          </div>
          <span className="text-white/80 text-xs mt-1 uppercase tracking-wider">
            {unit}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const scrollRef = useDragScroll<HTMLDivElement>()

  const quickActions = [
    { icon: Utensils, label: 'View Chefs', path: '/chefs', color: 'bg-brand-coral' },
    { icon: Calendar, label: 'Get Tickets', path: '/tickets', color: 'bg-brand-burgundy' },
    { icon: MapPin, label: 'Event Info', path: '/event', color: 'bg-brand-wine' },
  ]

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full native-scroll hide-scrollbar"
    >
      {/* Hero Section */}
      <div className="relative h-72 bg-brand-gradient overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-wine/90" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-white font-display text-3xl font-bold mb-1">
              Soup Cook Off
            </h1>
            <p className="text-white/90 text-lg font-medium mb-1">
              Sample. Savor. Vote.
            </p>
            <p className="text-white/70 text-sm mb-6">
              October 19, 2025 | Harrisburg, PA
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CountdownTimer />
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-6 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-card p-4"
        >
          <div className="flex justify-around">
            {quickActions.map(({ icon: Icon, label, path, color }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex flex-col items-center pressable"
              >
                <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-2`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Logo Banner */}
      <div className="px-4 mt-6 pb-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-card"
        >
          <img
            src="/logo-banner.png"
            alt="Soup Cook Off"
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Event Highlights Card */}
      <div className="px-4 pb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-brand-burgundy to-brand-wine rounded-3xl p-6 text-white"
        >
          <h3 className="font-semibold text-lg mb-4">Event Highlights</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Utensils size={18} />
              </div>
              <div>
                <p className="font-medium">20+ Soup Entries</p>
                <p className="text-sm text-white/70">Local chefs compete</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Star size={18} />
              </div>
              <div>
                <p className="font-medium">People's Choice Award</p>
                <p className="text-sm text-white/70">Your vote counts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <p className="font-medium">11 AM - 3 PM</p>
                <p className="text-sm text-white/70">4 hours of tasting</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
