import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ChefHat, Ticket, MapPin, User } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/chefs', icon: ChefHat, label: 'Chefs' },
  { path: '/tickets', icon: Ticket, label: 'Tickets' },
  { path: '/event', icon: MapPin, label: 'Event' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (path: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
    navigate(path)
  }

  return (
    <nav className="bg-white shadow-bottom-nav safe-bottom">
      <div className="flex items-center justify-around h-20">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path ||
            (path !== '/' && location.pathname.startsWith(path))

          return (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              className="flex flex-col items-center justify-center w-16 h-16 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-2 bg-brand-burgundy/10 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                size={24}
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? 'text-brand-burgundy' : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs mt-1 relative z-10 transition-colors duration-200 ${
                isActive ? 'text-brand-burgundy font-semibold' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
