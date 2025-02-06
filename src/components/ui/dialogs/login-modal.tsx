'use client'

import { FC, useEffect, useRef, useState } from 'react'

import {
  AuthenticationProviderDto,
  useAuthenticationProviders,
} from '@/lib/api'

import {
  Erc4361LoginButton,
  OAuthLoginButton,
  WebAuthnLoginButton,
} from '../buttons'

export const LoginModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleClose = () => {
    dialogRef.current?.close()
    onClose()
  }

  return (
    <dialog
      id="login-modal"
      className="modal"
      ref={dialogRef}
      onClose={handleClose}
    >
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
      <OAuthLoginButton id={provider.name} className="btn btn-soft btn-primary">
        `${provider.display_name} (OAuth)`
      </OAuthLoginButton>
    )
  }

  if (provider.type == 'WebAuthn' && window.navigator.credentials) {
    return (
      <WebAuthnLoginButton className="btn btn-soft btn-secondary">
        `${provider.display_name} (Passkey)`
      </WebAuthnLoginButton>
    )
  }

  if (provider.type == 'Erc4361') {
    return <Erc4361LoginButton className="btn btn-soft btn-accent" />
  }

  return (
    <button className="btn btn-soft" disabled={true}>
      {provider.display_name} (Unsupported)
    </button>
  )
}
