<!-- src/entities/Wallet/wallet-balance/WalletBalance.vue -->
<template>
	<div class="mt-[16px] wallet-ballance-container">
		<div class="flex justify-between items-center px-[24px] py-[16px] shadow-custom rounded-[16px]">
			<div class="flex gap-[10px] items-center">
				<IconGold />

				<div class="text-xxxl">
					111FCC
				</div>
				<div class="text-lg font-bold">
					FCC
				</div>
			</div>
		</div>

		<div class="flex justify-between relative mt-8 mb-auto">
			<TonConnectButton />
		</div>
	</div>
</template>

<script setup lang="ts">
 import { onMounted, ref, watch } from 'vue'
 import { IconGold } from '@/shared/components/Icon'
 import { TonConnectButton, useTonAddress, useTonWallet } from '@townsquarelabs/ui-vue'
 import { TonApiClient, Api } from '@ton-api/client'
 import { Address } from '@ton/core'

 const loading = ref(true)

 // Новый код для проверки NFT с использованием TonAPI.io
 const walletConnected = ref(false)
 const checkingNFT = ref(false)
 const hasNFT = ref(false)
 const userAddress = useTonAddress()
 const wallet = useTonWallet()

 const COLLECTION_ADDRESS = 'EQDERkmRDrXxzEbZUMMgo3uDJwe24qUYpnasJ83WpQZaqjJ1'
 const collectionAddress = Address.parseFriendly(COLLECTION_ADDRESS).address
 // Инициализация TonAPI клиента
 const http = new TonApiClient({
  baseUrl: 'https://tonapi.io',
  // Замените на ваш реальный API ключ
  apiKey: 'AHHT737POV45FDIAAAAETF62HOODTD6YZHYXOLDBRN56L6DKRI6KJE3FMCRWSOFDSKQ77XY'
 })
 const api = new Api(http)

 async function checkNFT() {
  if (!userAddress.value) return

  checkingNFT.value = true
  hasNFT.value = false

  try {
   const rawAddress = Address.parseFriendly(userAddress.value).address

   const nftItems = await api.accounts.getAccountNftItems(rawAddress, {
    collection: collectionAddress,
    limit: 1,
    offset: 0
   })

   hasNFT.value = nftItems.nftItems?.length > 0
  } catch (error) {
   console.error('Error checking NFT:', error)
  } finally {
   checkingNFT.value = false
  }
 }

 // Следим за изменением кошелька
 watch(wallet, (newWallet) => {
  walletConnected.value = !!newWallet
  if (newWallet) {
   checkNFT()
  } else {
   hasNFT.value = false
  }
 })

 onMounted(async () => {
  const isLocal = import.meta.env.VITE_USE_TWA_MOCK

  if (isLocal) {
   console.warn('TWA is not available. Some features may not work correctly.')
  }

  loading.value = false

  // Проверяем NFT при монтировании, если кошелек уже подключен
  if (wallet.value) {
   walletConnected.value = true
   await checkNFT()
  }
 })
</script>

<style scoped lang="scss">
.wallet-ballance-container {
	min-height: calc(100vh - 160px);
	display: flex;
	flex-direction: column;
}

:deep(#ton-connect-button) {
 button {
  background-color: #319A6E !important;
 }
 button > div {
  @apply text-white font-normal text-sm
 }
 button path {
	fill: #fff
 }
}
</style>
