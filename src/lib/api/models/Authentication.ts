export type AuthenticationProviderDto = {
  name: string
  display_name: string
  type: string
}

export type WebAuthnAssertionDto = {
  challenge_id: string
  options: any
}

export type WebAuthnAssertionVerifyDto = {
  challenge_id: string
  assertion_response: any
}

export type WebAuthnAttestationDto = {
  challenge_id: string
  options: any
}

export type WebAuthnAttestationVerifyDto = {
  challenge_id: string
  attestation_response: any
}

export type UserTokenDto = {
  access_token: string
  refresh_token: string
  access_token_expiration: Date
  refresh_token_expiration: Date
}

export type Erc4361ChallengeDto = {
  challenge_id: string
  message: string
}

export type Erc4361SignatureDto = {
  challenge_id: string
  signature: string
}
