import { motion } from 'framer-motion'
import { ArrowLeft, Star, Heart, Share2, Utensils, Award } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDragScroll } from '../hooks/useDragScroll'

const chefData: Record<string, any> = {
  '1': {
    name: "Chef Maria's Kitchen",
    soup: "Tuscan White Bean",
    category: "Vegetarian",
    rating: 4.9,
    votes: 127,
    description: "A hearty Italian-inspired soup featuring creamy cannellini beans, fresh rosemary, and garlic. Slow-simmered to perfection with a drizzle of extra virgin olive oil.",
    ingredients: ["White Beans", "Rosemary", "Garlic", "Olive Oil", "Parmesan", "Vegetable Stock"],
    chef: "Maria Rossi",
    chefBio: "20 years of culinary experience specializing in Italian cuisine.",
    awards: ["2024 People's Choice", "Best Vegetarian 2023"],
  },
  '2': {
    name: "The Soup Shack",
    soup: "Loaded Potato",
    category: "Classic",
    rating: 4.8,
    votes: 98,
    description: "Creamy potato soup loaded with crispy bacon, sharp cheddar, green onions, and a dollop of sour cream. Comfort food at its finest.",
    ingredients: ["Russet Potatoes", "Bacon", "Cheddar", "Sour Cream", "Green Onions", "Cream"],
    chef: "Tom Bradley",
    chefBio: "Former restaurant owner bringing diner classics to the competition.",
    awards: ["Best Classic 2024"],
  },
}

export default function ChefDetailScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const scrollRef = useDragScroll<HTMLDivElement>()

  const chef = chefData[id || '1'] || chefData['1']

  const handleVote = () => {
    if ('vibrate' in navigator) navigator.vibrate(50)
    setHasVoted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header Image */}
      <div className="relative h-56 bg-brand-gradient">
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Heart
              size={20}
              className={isLiked ? 'text-brand-coral fill-brand-coral' : 'text-white'}
            />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Share2 size={20} className="text-white" />
          </button>
        </div>

        {/* Chef Icon */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-card flex items-center justify-center">
            <Utensils size={40} className="text-brand-burgundy" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollRef} className="flex-1 native-scroll hide-scrollbar pt-14 pb-6">
        {/* Title Section */}
        <div className="text-center px-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{chef.name}</h1>
          <p className="text-brand-burgundy font-semibold text-lg">{chef.soup}</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-brand-gold fill-brand-gold" />
              <span className="font-semibold">{chef.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">{chef.votes} votes</span>
            <span className="text-gray-300">|</span>
            <span className="px-3 py-1 bg-brand-cream rounded-full text-sm font-medium text-brand-burgundy">
              {chef.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">About This Soup</h2>
          <p className="text-gray-600 leading-relaxed">{chef.description}</p>
        </div>

        {/* Ingredients */}
        <div className="px-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Key Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {chef.ingredients.map((ingredient: string) => (
              <span
                key={ingredient}
                className="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 shadow-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Chef Info */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {chef.chef.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{chef.chef}</h3>
                <p className="text-sm text-gray-500">{chef.chefBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards */}
        {chef.awards && chef.awards.length > 0 && (
          <div className="px-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Awards</h2>
            <div className="space-y-2">
              {chef.awards.map((award: string) => (
                <div key={award} className="flex items-center gap-3 bg-brand-cream rounded-xl p-3">
                  <Award size={20} className="text-brand-gold" />
                  <span className="font-medium text-gray-700">{award}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vote Button */}
        <div className="px-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleVote}
            disabled={hasVoted}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
              hasVoted
                ? 'bg-green-500 text-white'
                : 'bg-brand-burgundy text-white active:bg-brand-wine'
            }`}
          >
            {hasVoted ? 'Vote Submitted!' : 'Vote for This Soup'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
