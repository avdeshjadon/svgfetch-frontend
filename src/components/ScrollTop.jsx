import { ArrowUp } from 'lucide-react'
import { useScrollY } from '../hooks'

export default function ScrollTop() {
  const show = useScrollY(600)

  return (
    <button
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}
