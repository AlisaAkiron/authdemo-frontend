'use client'

import { FC, Ref, useEffect, useState } from 'react'

import {
  AuthenticationProviderDto,
  useAuthenticationProviders,
} from '@/lib/api'

import { OAuthButton } from './oauth-button'
import { SIWEButton } from './siwe-button'
import { WebAuthnButton } from './webauthn-button'

declare global {
  interface Window {
    ethereum?: any
  }
}

const LoginModal: FC<{ ref: Ref<HTMLDialogElement> }> = ({ ref }) => {
  return (
    <dialog id="login-modal" className="modal" ref={ref}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>
        </form>
        <h3 className="py-6">Login</h3>
        <LoginProviders />
      </div>
    </dialog>
  )
}

const LoginProviders: FC = () => {
  const [providers, setProviders] = useState<AuthenticationProviderDto[]>([])

  useEffect(() => {
    useAuthenticationProviders().then((res) => {
      const { data } = res
      setProviders(data ?? [])
    })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-3">
      {providers.map((provider) => (
        <LoginProviderButton key={provider.name} provider={provider} />
      ))}
    </div>
  )
}

const LoginProviderButton: FC<{
  provider: AuthenticationProviderDto
}> = ({ provider }) => {
  if (provider.type == 'OAuth') {
    return (
      <OAuthButton
        id={provider.name}
        displayName={`${provider.display_name} (OAuth)`}
      />
    )
  }

  if (provider.type == 'WebAuthn' && window.navigator.credentials) {
    return <WebAuthnButton displayName={`${provider.display_name} (Passkey)`} />
  }

  if (provider.type == 'Erc4361') {
    return <SIWEButton />
  }

  return (
    <button className="btn btn-soft" disabled={true}>
      {provider.display_name} (Unsupported)
    </button>
  )
}

export default LoginModal
