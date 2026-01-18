import { useEffect, useRef } from 'react'

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let isDown = false
    let startY = 0
    let scrollTop = 0

    const onMouseDown = (e: MouseEvent) => {
      // Only left click
      if (e.button !== 0) return

      isDown = true
      element.style.cursor = 'grabbing'
      element.style.userSelect = 'none'
      startY = e.pageY - element.offsetTop
      scrollTop = element.scrollTop
    }

    const onMouseLeave = () => {
      isDown = false
      element.style.cursor = 'grab'
      element.style.userSelect = ''
    }

    const onMouseUp = () => {
      isDown = false
      element.style.cursor = 'grab'
      element.style.userSelect = ''
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const y = e.pageY - element.offsetTop
      const walk = (y - startY) * 1.5 // Scroll speed multiplier
      element.scrollTop = scrollTop - walk
    }

    // Set initial cursor
    element.style.cursor = 'grab'

    element.addEventListener('mousedown', onMouseDown)
    element.addEventListener('mouseleave', onMouseLeave)
    element.addEventListener('mouseup', onMouseUp)
    element.addEventListener('mousemove', onMouseMove)

    return () => {
      element.removeEventListener('mousedown', onMouseDown)
      element.removeEventListener('mouseleave', onMouseLeave)
      element.removeEventListener('mouseup', onMouseUp)
      element.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return ref
}
