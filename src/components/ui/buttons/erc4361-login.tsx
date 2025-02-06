import { FC, useCallback, useSyncExternalStore } from 'react'
import { BrowserProvider } from 'ethers'
import { createStore, EIP6963ProviderDetail } from 'mipd'

import {
  Erc4361SignatureDto,
  useErc4361ChallengeMessage,
  useErc4361Verification,
} from '@/lib/api'

const store = createStore()

export const Erc4361LoginButton: FC<{ className?: string }> = ({
  className,
}) => {
  const eip6963Providers = useSyncExternalStore(
    store.subscribe,
    store.getProviders,
  )

  console.log('EIP6963 Providers', eip6963Providers)

  if (eip6963Providers.length === 0) {
    return <></>
  }

  if (eip6963Providers.length === 1) {
    return <Erc4361Login eip6963Provider={eip6963Providers[0]} />
  }

  return (
    <>
      <button
        className={className}
        popoverTarget="popover-web3-login"
        style={
          {
            anchorName: '--popover-web3-login-anchor',
          } as React.CSSProperties
        }
      >
        Crypto wallet (Web3) ▾
      </button>

      <ul
        className="dropdown menu rounded-box bg-base-100 w-52 shadow-sm"
        popover="auto"
        id="popover-web3-login"
        style={
          {
            positionAnchor: '--popover-web3-login-anchor',
          } as React.CSSProperties
        }
      >
        {eip6963Providers.map((provider) => (
          <li key={provider.info.uuid}>
            <Erc4361Login eip6963Provider={provider} className={className} />
          </li>
        ))}
      </ul>
    </>
  )
}

const Erc4361Login: FC<{
  eip6963Provider: EIP6963ProviderDetail
  className?: string
}> = ({ eip6963Provider, className }) => {
  const provider = new BrowserProvider(eip6963Provider.provider)

  const handleClick = useCallback(async () => {
    const address = await connectWallet()

    console.log('Address', address)

    const { data: challenge } = await useErc4361ChallengeMessage(address)
    console.log('Challenge', challenge)

    const signature = await signData(challenge!.message)
    console.log(signature)

    const { data, error } = await useErc4361Verification({
      challenge_id: challenge!.challenge_id,
      signature: signature,
    } as Erc4361SignatureDto)

    if (data) {
      localStorage.setItem('access_token', data.access_token)
      window.location.reload()
    }

    if (error) {
      console.error(error)
    }
  }, [])

  const connectWallet = async () => {
    const addresses: string[] = await provider.send('eth_requestAccounts', [])

    if (addresses.length === 0) {
      throw new Error('No accounts found')
    }

    return addresses[0]
  }

  const signData = async (message: string) => {
    const signer = await provider.getSigner()
    const signResult = await signer.signMessage(message)
    return signResult
  }

  return (
    <button className={className} onClick={handleClick}>
      {eip6963Provider.info.name} (Web3)
    </button>
  )
}
