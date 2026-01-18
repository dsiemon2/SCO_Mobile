import { motion } from 'framer-motion'
import { Search, Star, Utensils } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDragScroll } from '../hooks/useDragScroll'

const chefEntries = [
  { id: 1, name: "Chef Maria's Kitchen", soup: "Tuscan White Bean", category: "Vegetarian", rating: 4.9, votes: 127 },
  { id: 2, name: "The Soup Shack", soup: "Loaded Potato", category: "Classic", rating: 4.8, votes: 98 },
  { id: 3, name: "Grandma's Recipes", soup: "Chicken Noodle", category: "Classic", rating: 4.7, votes: 112 },
  { id: 4, name: "Fire & Spice", soup: "Thai Coconut Curry", category: "Spicy", rating: 4.6, votes: 89 },
  { id: 5, name: "The Green Ladle", soup: "Roasted Tomato Basil", category: "Vegetarian", rating: 4.5, votes: 76 },
  { id: 6, name: "Harbor Kitchen", soup: "New England Clam Chowder", category: "Seafood", rating: 4.8, votes: 134 },
  { id: 7, name: "Bistro 22", soup: "French Onion", category: "Classic", rating: 4.4, votes: 67 },
  { id: 8, name: "Spice Route", soup: "Moroccan Lentil", category: "International", rating: 4.6, votes: 82 },
]

const categories = ['All', 'Classic', 'Vegetarian', 'Spicy', 'Seafood', 'International']

export default function ChefsScreen() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const scrollRef = useDragScroll<HTMLDivElement>()

  const filteredChefs = chefEntries.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.soup.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || chef.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Chef Entries</h1>
        <p className="text-gray-500 text-sm">Vote for your favorite soups</p>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chefs or soups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-2xl py-3.5 pl-12 pr-4 shadow-card text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-brand-burgundy text-white'
                  : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Chef List */}
      <div ref={scrollRef} className="flex-1 native-scroll hide-scrollbar px-4 pb-6">
        <div className="space-y-3">
          {filteredChefs.map((chef, index) => (
            <motion.button
              key={chef.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/chefs/${chef.id}`)}
              className="w-full bg-white rounded-2xl p-4 shadow-card pressable text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Utensils size={28} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">{chef.name}</h3>
                      <p className="text-brand-burgundy font-medium">{chef.soup}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={16} className="text-brand-gold fill-brand-gold" />
                      <span className="text-sm font-semibold text-gray-700">{chef.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-2.5 py-1 bg-brand-cream rounded-full text-xs font-medium text-brand-burgundy">
                      {chef.category}
                    </span>
                    <span className="text-xs text-gray-400">{chef.votes} votes</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filteredChefs.length === 0 && (
          <div className="text-center py-12">
            <Utensils size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No entries found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
