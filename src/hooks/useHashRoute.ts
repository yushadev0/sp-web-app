import { useEffect, useState } from 'react'
import type { PageKey } from '../Interfaces/Page'

// Hash tabanlı yönlendirme: uygulama bir alt dizinde statik olarak sunulduğu için
// sunucu tarafında ek yapılandırma gerektirmez.
function readRoute(): PageKey {
  return window.location.hash.replace(/^#\/?/, '') === 'about' ? 'about' : 'tasks'
}

export function useHashRoute() {
  const [route, setRoute] = useState<PageKey>(readRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
