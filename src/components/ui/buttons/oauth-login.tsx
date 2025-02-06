import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { getAuthenticationInitiateURL } from '@/lib/api'
import { FCC } from '@/types'

export const OAuthLoginButton: FCC<{ id: string; className?: string }> = ({
  id,
  className,
  children,
}) => {
  const router = useRouter()

  const url = getAuthenticationInitiateURL(id, window.location.pathname)

  const handleClick = useCallback(() => {
    router.push(url)
  }, [])

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  )
}
