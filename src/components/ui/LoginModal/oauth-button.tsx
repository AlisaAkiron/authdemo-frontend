import { FC, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { getAuthenticationInitiateURL } from '@/lib/api'

export const OAuthButton: FC<{ id: string; displayName: string }> = ({
  id,
  displayName,
}) => {
  const router = useRouter()

  const url = getAuthenticationInitiateURL(id, window.location.pathname)

  const handleClick = useCallback(() => {
    router.push(url)
  }, [])

  return (
    <button className="btn btn-soft btn-primary" onClick={handleClick}>
      {displayName}
    </button>
  )
}
