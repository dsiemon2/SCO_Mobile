import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import ChefsScreen from './screens/ChefsScreen'
import TicketsScreen from './screens/TicketsScreen'
import EventScreen from './screens/EventScreen'
import ProfileScreen from './screens/ProfileScreen'
import ChefDetailScreen from './screens/ChefDetailScreen'
import StatusBar from './components/StatusBar'

function AppContent() {
  const location = useLocation()

  return (
    <div className="h-full flex flex-col bg-brand-cream">
      <StatusBar />

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/chefs" element={<ChefsScreen />} />
            <Route path="/chefs/:id" element={<ChefDetailScreen />} />
            <Route path="/tickets" element={<TicketsScreen />} />
            <Route path="/event" element={<EventScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
