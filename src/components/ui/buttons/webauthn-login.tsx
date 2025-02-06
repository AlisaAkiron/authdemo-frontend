import { FC, useCallback } from 'react'

import {
  useAssertion,
  useAssertionResponse,
  WebAuthnAssertionVerifyDto,
} from '@/lib/api'
import { FCC } from '@/types'
import {
  CredentialRequestOptionsJSON,
  get,
  parseRequestOptionsFromJSON,
} from '@github/webauthn-json/browser-ponyfill'

export const WebAuthnLoginButton: FCC<{
  className?: string
}> = ({ children, className }) => {
  const handleLogin = useCallback(async () => {
    const { data: assertionData } = await useAssertion()
    const assertionChallengeId = assertionData!.challenge_id
    const assertionOptions = assertionData!.options

    const assertionResp = await assertion({ publicKey: assertionOptions })

    if (assertionResp !== null) {
      const { data: assertionResponse, error: assertionError } =
        await useAssertionResponse({
          challenge_id: assertionChallengeId,
          assertion_response: assertionResp,
        } as WebAuthnAssertionVerifyDto)

      if (assertionResponse) {
        localStorage.setItem('access_token', assertionResponse.access_token)
        window.location.reload()
      }

      if (assertionError) {
        console.error(assertionError)
      }
    }
  }, [])

  const assertion = async (option: CredentialRequestOptionsJSON) => {
    const publicKey = parseRequestOptionsFromJSON(option)

    try {
      const resp = await get(publicKey)
      return resp.toJSON()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button className={className} onClick={handleLogin}>
      {children}
    </button>
  )
}
