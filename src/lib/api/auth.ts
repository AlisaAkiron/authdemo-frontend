import { getApiURL, sendGET, sendPOST } from '../utils'
import {
  AuthenticationProviderDto,
  Erc4361ChallengeDto,
  Erc4361SignatureDto,
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
  return sendGET<WebAuthnAttestationDto>('/auth/webauthn/attestation')
}

export const useAssertion = async () => {
  return sendGET<WebAuthnAssertionDto>('/auth/webauthn/assertion')
}

export const useAttestationResponse = async (
  dto: WebAuthnAttestationVerifyDto,
) => {
  return sendPOST<UserTokenDto>(
    `/auth/webauthn/attestation`,
    JSON.stringify(dto),
  )
}

export const useAssertionResponse = async (dto: WebAuthnAssertionVerifyDto) => {
  return sendPOST<UserTokenDto>(`/auth/webauthn/assertion`, JSON.stringify(dto))
}

export const useErc4361ChallengeMessage = async (address: string) => {
  return sendGET<Erc4361ChallengeDto>(
    `/auth/erc4361/challenge?address=${address}`,
  )
}

export const useErc4361Verification = async (dto: Erc4361SignatureDto) => {
  return sendPOST<UserTokenDto>('/auth/erc4361/verify', JSON.stringify(dto))
}
