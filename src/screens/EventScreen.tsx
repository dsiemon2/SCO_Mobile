import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, Phone, Mail, Navigation, Car, Info } from 'lucide-react'
import { useDragScroll } from '../hooks/useDragScroll'

const schedule = [
  { time: '10:30 AM', event: 'VIP Early Access', description: 'Exclusive tasting for VIP ticket holders' },
  { time: '11:00 AM', event: 'Doors Open', description: 'General admission begins' },
  { time: '11:30 AM', event: 'Tasting Begins', description: 'All soup stations open' },
  { time: '1:00 PM', event: 'Live Music', description: 'Local band performance' },
  { time: '2:30 PM', event: 'Voting Closes', description: 'Last chance to cast your vote' },
  { time: '3:00 PM', event: 'Awards Ceremony', description: 'Winners announced' },
]

const faqs = [
  { q: 'Can I bring my own bowl?', a: 'Tasting cups and spoons are provided. Commemorative bowls available for purchase.' },
  { q: 'Is the venue wheelchair accessible?', a: 'Yes, the venue is fully ADA compliant.' },
  { q: 'Can I vote for multiple soups?', a: 'Each ticket allows one vote for your favorite soup.' },
  { q: 'Are there vegetarian options?', a: 'Yes, we have several vegetarian and vegan soup entries.' },
]

export default function EventScreen() {
  const scrollRef = useDragScroll<HTMLDivElement>()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Event Info</h1>
        <p className="text-gray-500 text-sm">Everything you need to know</p>
      </div>

      <div ref={scrollRef} className="flex-1 native-scroll hide-scrollbar px-4 pb-6">
        {/* Location Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-brand-gradient rounded-3xl p-6 text-white mb-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Carlisle Expo Center</h2>
              <p className="text-white/80 text-sm mt-1">100 K Street</p>
              <p className="text-white/80 text-sm">Carlisle, PA 17013</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl flex items-center justify-center gap-2 font-medium">
              <Navigation size={18} />
              Directions
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl flex items-center justify-center gap-2 font-medium">
              <Car size={18} />
              Parking
            </button>
          </div>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-card mb-4"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center">
                <Calendar size={20} className="text-brand-burgundy" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">March 1, 2026</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-brand-burgundy" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold">11 AM - 3 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <h2 className="font-semibold text-gray-900 mb-3">Event Schedule</h2>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {schedule.map((item, index) => (
              <div
                key={item.time}
                className={`p-4 flex gap-4 ${index !== schedule.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="w-20 flex-shrink-0">
                  <span className="text-brand-burgundy font-semibold text-sm">{item.time}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.event}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <h2 className="font-semibold text-gray-900 mb-3">FAQs</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-brand-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{faq.q}</p>
                    <p className="text-sm text-gray-500 mt-1">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-semibold text-gray-900 mb-3">Contact</h2>
          <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
            <a href="tel:+17175551234" className="flex items-center gap-3 pressable">
              <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-brand-burgundy" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">(717) 555-1234</p>
              </div>
            </a>
            <div className="w-full h-px bg-gray-100" />
            <a href="mailto:info@soupcookoff.com" className="flex items-center gap-3 pressable">
              <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-brand-burgundy" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">info@soupcookoff.com</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
