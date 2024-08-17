import { toUserFriendlyAddress, ConnectedWallet } from '@tonconnect/ui'
import { useWalletStore } from '../../Wallet'
import { getTonConnectUIInstance } from './tonConnectUIInstance'

export function useAuthButton() {
    const tonConnectUI = getTonConnectUIInstance()
    const unsubscribe = tonConnectUI.onStatusChange((walletInfo: ConnectedWallet | null) => {
        const friendlyWalletAddress = walletInfo?.account.address ? toUserFriendlyAddress(walletInfo.account.address) : ''
        const sessionStore = useWalletStore()
        sessionStore.walletAddress = friendlyWalletAddress
        sessionStore.setWalletAddress(friendlyWalletAddress)
        sessionStore.setWalletInfo(walletInfo)
        sessionStore.setAuthorized(true)
    })

    return { unsubscribe }
}