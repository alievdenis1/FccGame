<template>
	<div class="chemical-factory">
		<div
			v-for="(conveyor, index) in conveyors"
			:key="index"
			class="conveyor"
		>
			<!-- Здесь будут отображаться падающие химикаты -->
		</div>
	</div>
</template>

<script setup>
 import { ref, computed, onMounted } from 'vue'
 import { useGameStore } from '../store/game'

 const gameStore = useGameStore()

 const conveyors = computed(() => {
  // Количество конвейеров зависит от уровня
  return Array(Math.min(3, Math.floor(gameStore.level / 10) + 1)).fill(null)
 })

 const generateChemical = () => {
  const types = ['alkali', 'oil', 'fragrance', 'harmful']
  const weights = [50, 30, 15, 5] // Вероятности появления каждого типа
  const randomNum = Math.random() * 100
  let sum = 0
  for (let i = 0; i < types.length; i++) {
   sum += weights[i]
   if (randomNum < sum) {
    return types[i]
   }
  }
  return types[0] // По умолчанию возвращаем щелочь
 }

 const dropChemical = () => {
  const chemical = generateChemical()
  const conveyorIndex = Math.floor(Math.random() * conveyors.value.length)
  // Здесь будет логика добавления химиката на конвейер
  gameStore.addChemical({ type: chemical, conveyorIndex })
 }

 onMounted(() => {
  const dropInterval = setInterval(() => {
   if (gameStore.isGameActive) {
    dropChemical()
   }
  }, 1000 / (gameStore.level * 0.1 + 1)) // Скорость падения увеличивается с уровнем

  // Не забудьте очистить интервал при размонтировании компонента
 })
</script>

<style scoped>
 .chemical-factory {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 20px;
 }

 .conveyor {
  width: 80px;
  height: 200px;
  background-color: #555;
  position: relative;
 }
</style>