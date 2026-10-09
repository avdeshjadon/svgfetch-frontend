import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

export function useCountUp(target, { duration = 1600, active = true } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])

  return value
}

export function useScrollY(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

export function useTypewriter(text, { speed = 55, start = true, loop = false } = {}) {
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (!start) return
    let i = 0
    let timer

    const step = () => {
      i += 1
      setOutput(text.slice(0, i))
      if (i < text.length) {
        timer = setTimeout(step, speed)
      } else if (loop) {
        timer = setTimeout(() => {
          i = 0
          setOutput('')
          step()
        }, 1600)
      }
    }

    timer = setTimeout(step, 200)
    return () => clearTimeout(timer)
  }, [text, speed, start, loop])

  return output
}
