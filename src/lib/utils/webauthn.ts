import {
  create,
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  get,
  parseCreationOptionsFromJSON,
  parseRequestOptionsFromJSON,
} from '@github/webauthn-json/browser-ponyfill'

import {
  useAssertion,
  useAssertionResponse,
  useAttestation,
  useAttestationResponse,
  WebAuthnAssertionVerifyDto,
  WebAuthnAttestationVerifyDto,
} from '../api'

export const is_supported = () => {
  return navigator.credentials !== undefined
}

export const passkeyLogin = async () => {
  const { data: assertionData } = await useAssertion()
  const assertionChallengeId = assertionData!.challenge_id
  const assertionOptions = assertionData!.options

  const assertionResp = await assertion({ publicKey: assertionOptions })

  if (assertionResp !== null) {
    const { data: assertionResponse, error: assertionError } =
      await useAssertionResponse(assertionChallengeId, {
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
}

export const passkeyRegister = async () => {
  const { data: attestationData } = await useAttestation()
  const attestationChallengeId = attestationData!.attestation_id
  const attestationOptions = attestationData!.options

  const attestationResp = await attestation({ publicKey: attestationOptions })

  if (attestationResp !== null) {
    const { data: attestationResponse, error: attestationError } =
      await useAttestationResponse(attestationChallengeId, {
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
}

const assertion = async (option: CredentialRequestOptionsJSON) => {
  const publicKey = parseRequestOptionsFromJSON(option)

  try {
    const resp = await get(publicKey)
    return resp.toJSON()
  } catch (error) {
    console.error(error)
  }
}

const attestation = async (option: CredentialCreationOptionsJSON) => {
  const publicKey = parseCreationOptionsFromJSON(option)

  try {
    const resp = await create(publicKey)
    return resp.toJSON()
  } catch (error) {
    console.error(error)
  }
}
