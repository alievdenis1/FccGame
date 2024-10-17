<template>
	<div class="relative w-full h-screen overflow-hidden">
		<!-- Background with strong flickering -->
		<img
			src="/image/background.png"
			alt="Soon"
			class="w-full h-full absolute object-cover animate-[flicker_4s_infinite]"
		>

		<!-- Main content with subtle flickering -->
		<div
			class="flex flex-col items-center justify-center h-screen bg-black/40 text-white z-10 relative animate-[subtleFlicker_6s_infinite]"
		>
			<img
				src="/image/logo/Logo.png"
				class="w-[240px] mb-20 hover:scale-105 transition-transform duration-300 cursor-pointer animate-[levitate_3s_ease-in-out_infinite] animate-[logoFlicker_7s_infinite] logo-dark"
				@click="startGame"
			>

			<nav class="space-y-4">
				<img
					v-for="(btn, index) in buttons"
					:key="index"
					:src="btn"
					class="w-[180px] hover:scale-105 transition-transform duration-300 cursor-pointer animate-[buttonFlicker_5s_infinite] hover:animate-[buttonHoverFlicker_2s_infinite] button-dark"
					:style="{ animationDelay: `${index * 0.2}s` }"
					@click="startGame"
				>
			</nav>
		</div>
	</div>
</template>
<script lang="ts" setup>
 // import { computed } from 'vue'
 import { useRouter } from 'vue-router'
 // import { useUserStore } from '@/store/user'

 const router = useRouter()
 // const userStore = useUserStore()

 // const fccBalance = computed(() => userStore.fccBalance)
 // const upgradesUnlocked = computed(() => userStore.fccBalance >= 10) // Пример: разблокировка при 10 FCC
 // const warehouseUnlocked = computed(() => userStore.fccBalance >= 50) // Пример: разблокировка при 50 FCC

 const startGame = () => {
  router.push('/game')
 }

 const buttons = [
  '/image/btn1.png',
  '/image/btn2.png',
  '/image/btn3.png'
 ]

 // const goToUpgrades = () => {
 //  if (upgradesUnlocked.value) {
 //   router.push('/upgrades')
 //  }
 // }
 //
 // const goToWarehouse = () => {
 //  if (warehouseUnlocked.value) {
 //   router.push('/warehouse')
 //  }
 // }
</script>

<style lang="scss">
 // Основное мигание фона (сильное)
 @keyframes flicker {
  0% { opacity: 1; }
  3% { opacity: 0.4; }
  6% { opacity: 1; }
  7% { opacity: 0.4; }
  8% { opacity: 1; }
  9% { opacity: 0.4; }
  10% { opacity: 1; }
  89% { opacity: 1; }
  90% { opacity: 0.4; }
  100% { opacity: 1; }
 }

 // Общее мигание контента (слабое)
 @keyframes subtleFlicker {
  0% { opacity: 1; }
  1% { opacity: 0.95; }
  2% { opacity: 1; }
  89% { opacity: 1; }
  90% { opacity: 0.95; }
  100% { opacity: 1; }
 }

 // Усиленное мигание кнопок
 @keyframes buttonFlicker {
  0% {
   opacity: 0.85;
   filter: brightness(0.9);
  }
  25% {
   opacity: 0.75;
   filter: brightness(0.8);
  }
  50% {
   opacity: 0.85;
   filter: brightness(0.85);
  }
  75% {
   opacity: 0.7;
   filter: brightness(0.75);
  }
  100% {
   opacity: 0.85;
   filter: brightness(0.9);
  }
 }

 // Мигание при наведении на кнопки (более интенсивное)
 @keyframes buttonHoverFlicker {
  0% {
   opacity: 0.9;
   filter: brightness(1);
  }
  50% {
   opacity: 0.7;
   filter: brightness(0.8);
  }
  100% {
   opacity: 0.9;
   filter: brightness(1);
  }
 }

 // Мигание логотипа (среднее)
 @keyframes logoFlicker {
  0% {
   opacity: 0.9;
   filter: brightness(0.9) contrast(1.1);
  }
  45% {
   opacity: 0.8;
   filter: brightness(0.85) contrast(1.2);
  }
  50% {
   opacity: 0.75;
   filter: brightness(0.8) contrast(1.3);
  }
  55% {
   opacity: 0.8;
   filter: brightness(0.85) contrast(1.2);
  }
  100% {
   opacity: 0.9;
   filter: brightness(0.9) contrast(1.1);
  }
 }

 // Эффект левитации
 @keyframes levitate {
  0% {
   transform: translateY(0);
  }
  50% {
   transform: translateY(-10px);
  }
  100% {
   transform: translateY(0);
  }
 }

 // Базовое затемнение для логотипа
 .logo-dark {
  filter: brightness(0.9) contrast(1.1) saturate(0.9);
 }

 // Базовое затемнение для кнопок
 .button-dark {
  filter: brightness(0.85) contrast(1.2) saturate(0.85);
  opacity: 0.85;

  &:hover {
   filter: brightness(0.95) contrast(1.1) saturate(0.9);
   opacity: 0.9;
  }
 }

 // Применяем анимации к элементам
 img[src*="Logo.png"] {
  animation:
   levitate 3s ease-in-out infinite,
   logoFlicker 7s infinite;
  transform-origin: center;
  will-change: transform, opacity, filter;
 }

 img[src*="btn"] {
  will-change: transform, opacity, filter;

  &:hover {
   animation: buttonHoverFlicker 2s infinite;
  }
 }

 // Оптимизация производительности
 * {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
 }
</style>