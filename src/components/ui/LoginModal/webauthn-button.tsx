import { FC, useCallback } from 'react'

import { passkeyLogin } from '@/lib/utils'

export const WebAuthnButton: FC<{ displayName: string }> = ({
  displayName,
}) => {
  const handleClick = useCallback(async () => {
    await passkeyLogin()
  }, [])

  return (
    <button className="btn btn-soft btn-secondary" onClick={handleClick}>
      {displayName}
    </button>
  )
}
