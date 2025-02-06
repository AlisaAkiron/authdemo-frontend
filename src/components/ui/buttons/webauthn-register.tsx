import { useCallback } from 'react'

import {
  useAttestation,
  useAttestationResponse,
  WebAuthnAttestationVerifyDto,
} from '@/lib/api'
import { FCC } from '@/types'
import {
  create,
  CredentialCreationOptionsJSON,
  parseCreationOptionsFromJSON,
} from '@github/webauthn-json/browser-ponyfill'

export const WebAuthnRegisterButton: FCC<{ className?: string }> = ({
  className,
  children,
}) => {
  const handleRegister = useCallback(async () => {
    const { data: attestationData } = await useAttestation()
    const attestationChallengeId = attestationData!.challenge_id
    const attestationOptions = attestationData!.options

    const attestationResp = await attestation({ publicKey: attestationOptions })

    if (attestationResp !== null) {
      const { data: attestationResponse, error: attestationError } =
        await useAttestationResponse({
          challenge_id: attestationChallengeId,
          attestation_response: attestationResp,
        } as WebAuthnAttestationVerifyDto)

      if (attestationResponse) {
        localStorage.setItem('access_token', attestationResponse.access_token)
        window.location.reload()
      }

      if (attestationError) {
        console.error(attestationError)
      }
    }
  }, [])

  const attestation = async (option: CredentialCreationOptionsJSON) => {
    const publicKey = parseCreationOptionsFromJSON(option)

    try {
      const resp = await create(publicKey)
      return resp.toJSON()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button className={className} onClick={handleRegister}>
      {children}
    </button>
  )
}
