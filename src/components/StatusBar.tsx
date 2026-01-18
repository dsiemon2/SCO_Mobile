import { Signal, Wifi, Battery } from 'lucide-react'

export default function StatusBar() {
  const time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="bg-brand-burgundy text-white px-4 py-2 flex items-center justify-between safe-top">
      <span className="text-sm font-medium">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={14} />
      </div>
    </div>
  )
}
