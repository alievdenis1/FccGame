<template>
	<div class="horror-skeleton bg-black">
		Loading
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
 // Базовая анимация мерцания для скелетона
 @keyframes skeletonFlicker {
  0% {
   opacity: 0.7;
   background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  }
  50% {
   opacity: 0.5;
   background: linear-gradient(90deg, #151515 0%, #202020 50%, #151515 100%);
  }
  100% {
   opacity: 0.7;
   background: linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  }
 }

 // Мрачный глитч-эффект
 @keyframes glitchEffect {
  0% {
   transform: translateX(0);
  }
  2% {
   transform: translateX(-2px);
  }
  4% {
   transform: translateX(2px);
  }
  6% {
   transform: translateX(0);
  }
 }

 .horror-skeleton {
  background-color: #111111;
  padding: 16px;
  min-height: 100vh;
  position: relative;

  // Добавляем эффект шума на фон
  &::before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   opacity: 0.05;
   pointer-events: none;
  }
 }

 // Стили для разных типов скелетонов
 .header-skeleton {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  animation: skeletonFlicker 3s infinite, glitchEffect 8s infinite;
 }

 .main-skeleton {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;

  &::after {
   content: '';
   position: absolute;
   top: 0;
   left: -100%;
   width: 50%;
   height: 100%;
   background: linear-gradient(
     90deg,
     transparent,
     rgba(255, 255, 255, 0.05),
     transparent
   );
   animation: shimmer 2s infinite;
  }
 }

 .item-skeleton {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;

  &::before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   border: 1px solid rgba(255, 255, 255, 0.1);
   border-radius: 16px;
   pointer-events: none;
  }
 }

 .footer-skeleton {
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
 }

 @keyframes shimmer {
  0% {
   left: -100%;
  }
  100% {
   left: 200%;
  }
 }

 // Глобальные стили для VSkeleton компонента
 :deep(.v-skeleton) {
  background-color: #1a1a1a !important;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
 }
</style>