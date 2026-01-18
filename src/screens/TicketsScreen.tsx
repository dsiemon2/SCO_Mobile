import { motion } from 'framer-motion'
import { Ticket, Check, Users, Clock, Calendar, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useDragScroll } from '../hooks/useDragScroll'

const ticketTypes = [
  {
    id: 'general',
    name: 'General Admission',
    price: 15,
    description: 'Full access to taste all soups and vote',
    features: ['Unlimited soup tasting', 'Voting privileges', 'Commemorative spoon'],
    popular: false,
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    price: 35,
    description: 'Premium access with exclusive perks',
    features: ['Early entry (10:30 AM)', 'Private tasting area', 'Meet the chefs', 'Swag bag', 'Reserved seating'],
    popular: true,
  },
  {
    id: 'family',
    name: 'Family Pack',
    price: 45,
    description: '2 adults + 2 kids (under 12)',
    features: ['4 admission tickets', 'Kids activity area', 'Family photo opportunity'],
    popular: false,
  },
]

export default function TicketsScreen() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const scrollRef = useDragScroll<HTMLDivElement>()

  const selectedTicketData = ticketTypes.find(t => t.id === selectedTicket)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Get Tickets</h1>
        <p className="text-gray-500 text-sm">March 1, 2026 | Carlisle, PA</p>
      </div>

      {/* Event Quick Info */}
      <div className="px-4 py-3">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-brand-burgundy" />
              <span className="text-sm font-medium">Mar 1</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-brand-burgundy" />
              <span className="text-sm font-medium">11AM - 3PM</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Users size={18} className="text-brand-burgundy" />
              <span className="text-sm font-medium">500+ Guests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Options */}
      <div ref={scrollRef} className="flex-1 native-scroll hide-scrollbar px-4 pb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Select Ticket Type</h2>

        <div className="space-y-3">
          {ticketTypes.map((ticket, index) => (
            <motion.button
              key={ticket.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`w-full rounded-2xl p-4 text-left transition-all duration-200 pressable relative overflow-hidden ${
                selectedTicket === ticket.id
                  ? 'bg-brand-burgundy text-white shadow-lg'
                  : 'bg-white shadow-card'
              }`}
            >
              {ticket.popular && (
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    selectedTicket === ticket.id
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-coral text-white'
                  }`}>
                    Popular
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedTicket === ticket.id ? 'bg-white/20' : 'bg-brand-cream'
                }`}>
                  <Ticket size={24} className={selectedTicket === ticket.id ? 'text-white' : 'text-brand-burgundy'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{ticket.name}</h3>
                  <p className={`text-sm mt-0.5 ${selectedTicket === ticket.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {ticket.description}
                  </p>
                  <p className="font-bold text-xl mt-2">
                    ${ticket.price}
                    <span className={`text-sm font-normal ${selectedTicket === ticket.id ? 'text-white/70' : 'text-gray-400'}`}>
                      {ticket.id === 'family' ? '/pack' : '/person'}
                    </span>
                  </p>
                </div>
              </div>

              {selectedTicket === ticket.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-4 pt-4 border-t border-white/20"
                >
                  <ul className="space-y-2">
                    {ticket.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-white/80" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Quantity Selector */}
        {selectedTicket && selectedTicket !== 'family' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6"
          >
            <h2 className="font-semibold text-gray-900 mb-3">Quantity</h2>
            <div className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between">
              <span className="text-gray-600">Number of tickets</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600"
                >
                  -
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-full bg-brand-burgundy flex items-center justify-center font-bold text-white"
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Purchase Button */}
      {selectedTicket && selectedTicketData && (
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="px-4 pb-4"
        >
          <div className="bg-white rounded-t-3xl -mx-4 px-4 pt-4 pb-2 shadow-bottom-nav">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Total</span>
              <span className="text-2xl font-bold text-brand-burgundy">
                ${selectedTicketData.price * (selectedTicket === 'family' ? 1 : quantity)}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-burgundy text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
            >
              Purchase Tickets
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
