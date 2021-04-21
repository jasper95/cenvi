import { useEffect, useRef } from 'react'
import useRouter from './useRouter'
export default function useAutoScroll(props) {
  const { elementId } = props
  const router = useRouter()
  const ref = useRef(null)
  useEffect(() => {
    if(router.location.hash.replace('#','') === elementId && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
      }, 500)
    }
  },[ref.current])
  return ref;
}