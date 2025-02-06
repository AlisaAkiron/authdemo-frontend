export type UserClaimDto = {
  type: string
  value: string
}

export type UserInfoDto = {
  user_id: string
  email: string
  display_name: string
  social_logins: Record<string, string>
  webauthn_devices: string[]
  crypto_wallets: string[]
}
