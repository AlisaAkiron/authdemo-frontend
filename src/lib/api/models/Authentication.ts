export type AuthenticationProviderDto = {
  name: string
  display_name: string
  type: string
}

export type WebAuthnAssertionDto = {
  options: any
  challenge_id: string
}

export type WebAuthnAssertionVerifyDto = {
  assertion_response: any
}

export type WebAuthnAttestationDto = {
  attestation_id: string
  options: any
}

export type WebAuthnAttestationVerifyDto = {
  attestation_response: any
}

export type UserTokenDto = {
  access_token: string
  refresh_token: string
  access_token_expiration: Date
  refresh_token_expiration: Date
}
