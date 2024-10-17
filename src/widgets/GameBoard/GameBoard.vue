<template>
	<div class="game-board">
		<ChemicalFactory
			:level="level"
			@drop-chemical="handleChemicalDrop"
		/>
		<SoapVat
			:position="vatPosition"
			@move="moveVat"
		/>
		<FillMeter :fill-level="fillLevel" />
		<Timer :time="timeLeft" />
		<ScoreDisplay :score="score" />
		<LevelIndicator :level="level" />
	</div>
</template>

<script setup>
 import { ref, onMounted, onUnmounted } from 'vue'
 import ChemicalFactory from './ChemicalFactory.vue'
 import SoapVat from './SoapVat.vue'
 import FillMeter from './FillMeter.vue'
 import Timer from './Timer.vue'
 import ScoreDisplay from './ScoreDisplay.vue'
 import LevelIndicator from './LevelIndicator.vue'

 const level = ref(1)
 const fillLevel = ref(0)
 const score = ref(0)
 const timeLeft = ref(30)
 const vatPosition = ref(50) // Процент от ширины экрана

 const moveVat = (direction) => {
  // Реализация движения чана
 }

 const handleChemicalDrop = (chemicalType) => {
  // Обработка падения химиката
 }

 const gameLoop = () => {
  // Основной игровой цикл
 }

 let gameInterval

 onMounted(() => {
  gameInterval = setInterval(gameLoop, 1000 / 60) // 60 FPS
 })

 onUnmounted(() => {
  clearInterval(gameInterval)
 })
</script>

<style scoped>
 .game-board {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  color: #000;
 }
</style>