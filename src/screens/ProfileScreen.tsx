import { motion } from 'framer-motion'
import { User, Ticket, Heart, Settings, Bell, HelpCircle, LogOut, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import { useDragScroll } from '../hooks/useDragScroll'

const menuItems = [
  { icon: Ticket, label: 'My Tickets', badge: '2', path: '/my-tickets' },
  { icon: Heart, label: 'Favorites', badge: '5', path: '/favorites' },
  { icon: Star, label: 'My Votes', badge: null, path: '/my-votes' },
  { icon: Bell, label: 'Notifications', badge: '3', path: '/notifications' },
  { icon: Settings, label: 'Settings', badge: null, path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', badge: null, path: '/help' },
]

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const scrollRef = useDragScroll<HTMLDivElement>()

  if (!isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full flex flex-col"
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 text-sm">Sign in to access all features</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-brand-gradient rounded-full flex items-center justify-center mb-6"
          >
            <User size={48} className="text-white" />
          </motion.div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to Soup Cook Off</h2>
          <p className="text-gray-500 text-center mb-8">
            Sign in to save your votes, track your tickets, and get personalized recommendations.
          </p>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-brand-burgundy text-white py-4 rounded-2xl font-semibold text-lg mb-3"
          >
            Sign In
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-white text-brand-burgundy py-4 rounded-2xl font-semibold text-lg border-2 border-brand-burgundy/20"
          >
            Create Account
          </motion.button>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </div>

      <div ref={scrollRef} className="flex-1 native-scroll hide-scrollbar px-4 pb-6">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-brand-gradient rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">John Smith</h2>
              <p className="text-white/80">john.smith@email.com</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-4 border-t border-white/20">
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold">2</p>
              <p className="text-white/70 text-sm">Tickets</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold">5</p>
              <p className="text-white/70 text-sm">Favorites</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold">1</p>
              <p className="text-white/70 text-sm">Vote</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`w-full flex items-center gap-4 p-4 pressable ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center">
                <item.icon size={20} className="text-brand-burgundy" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
              {item.badge && (
                <span className="px-2.5 py-1 bg-brand-coral text-white text-xs font-semibold rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={20} className="text-gray-400" />
            </motion.button>
          ))}
        </div>

        {/* Sign Out */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsLoggedIn(false)}
          className="w-full bg-white rounded-2xl p-4 shadow-card flex items-center gap-4 pressable"
        >
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <LogOut size={20} className="text-red-500" />
          </div>
          <span className="font-medium text-red-500">Sign Out</span>
        </motion.button>

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">Soup Cook Off App v1.0.0</p>
          <p className="text-gray-300 text-xs mt-1">Made with love in Harrisburg, PA</p>
        </div>
      </div>
    </motion.div>
  )
}
