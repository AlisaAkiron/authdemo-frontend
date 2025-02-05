import { getApiURL, sendGET, sendPOST } from '../utils'
import {
  AuthenticationProviderDto,
  UserTokenDto,
  WebAuthnAssertionDto,
  WebAuthnAssertionVerifyDto,
  WebAuthnAttestationDto,
  WebAuthnAttestationVerifyDto,
} from './models'

export const useAuthenticationProviders = async () => {
  return sendGET<AuthenticationProviderDto[]>('/auth/providers')
}

export const getAuthenticationInitiateURL = (
  provider: string,
  returnURL: string,
) => {
  const baseURL = window.location.origin
  const encodedReturnURL = encodeURIComponent(
    `${baseURL}/login/callback?return_url=${returnURL}`,
  )
  return getApiURL(`/auth/login/${provider}?return_url=${encodedReturnURL}`)
}

export const useUserToken = async () => {
  return sendGET<UserTokenDto>('/auth/token', { include_cookie: true })
}

export const useAttestation = async () => {
  return sendPOST<WebAuthnAttestationDto>('/auth/webauthn/attestation', '')
}

export const useAssertion = async () => {
  return sendPOST<WebAuthnAssertionDto>('/auth/webauthn/assertion', '')
}

export const useAttestationResponse = async (
  attestationId: string,
  dto: WebAuthnAttestationVerifyDto,
) => {
  return sendPOST<UserTokenDto>(
    `/auth/webauthn/attestation/${attestationId}`,
    JSON.stringify(dto),
  )
}

export const useAssertionResponse = async (
  assertionId: string,
  dto: WebAuthnAssertionVerifyDto,
) => {
  return sendPOST<UserTokenDto>(
    `/auth/webauthn/assertion/${assertionId}`,
    JSON.stringify(dto),
  )
}
