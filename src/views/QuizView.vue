<template>
  <div class="page-container quiz-page">
    <template v-if="store.currentQuestion">
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="fill" :style="{ width: store.progressPercent + '%' }"></div>
      </div>
      <p class="progress-text">
        第 <span>{{ store.currentIndex + 1 }}</span> / {{ store.totalQuestions }} 题
      </p>

      <!-- 题目卡片 -->
      <div class="question-card">
        <p class="q-label">第{{ store.currentIndex + 1 }}题</p>
        <p class="q-text">{{ store.currentQuestion.options[0].label.substring(store.currentQuestion.options[0].label.indexOf('）') + 1 || store.currentQuestion.options[0].label.indexOf(')') + 1 || 3) }}</p>
      </div>

      <!-- 选项列表 -->
      <div class="options-list">
        <label
          v-for="(option, index) in store.currentOptions"
          :key="index"
          class="option-item"
          :class="{ selected: selectedType === option.type }"
        >
          <input
            type="radio"
            :name="'q_' + store.currentQuestion.id"
            :value="option.type"
            v-model="selectedType"
            @change="handleSelect(option.type)"
          />
          <span class="option-type">{{ option.type }}</span>
          <span class="option-text">{{ option.label }}</span>
        </label>
      </div>
    </template>

    <template v-else>
      <p class="progress-text">加载中...</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store/quiz'

const router = useRouter()
const store = useQuizStore()
const selectedType = ref(null)

onMounted(() => {
  store.initQuiz()

  if (!store.hasActiveSession) {
    router.replace('/')
    return
  }

  if (store.completed) {
    router.replace('/result')
    return
  }
})

function handleSelect(type) {
  store.submitAnswer(type)
  selectedType.value = null

  if (store.completed) {
    router.replace('/result')
  }
}
</script>
