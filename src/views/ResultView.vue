<template>
  <div class="page-container result-page">
    <h1>您的DISC测评结果</h1>

    <div class="result-table-wrapper">
      <table class="result-table">
        <thead>
          <tr>
            <th :class="{ highlight: dominantType === 'D' }">D</th>
            <th :class="{ highlight: dominantType === 'I' }">I</th>
            <th :class="{ highlight: dominantType === 'S' }">S</th>
            <th :class="{ highlight: dominantType === 'C' }">C</th>
            <th>总和</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :class="{ dominant: dominantType === 'D' }">{{ results.D }}</td>
            <td :class="{ dominant: dominantType === 'I' }">{{ results.I }}</td>
            <td :class="{ dominant: dominantType === 'S' }">{{ results.S }}</td>
            <td :class="{ dominant: dominantType === 'C' }">{{ results.C }}</td>
            <td class="total">{{ total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="result-note">★ 标记为您的主导行为风格类型</p>

    <button class="btn-primary" @click="restart">重新测评</button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store/quiz'

const router = useRouter()
const store = useQuizStore()

onMounted(() => {
  store.initQuiz()

  if (!store.completed) {
    if (store.hasActiveSession) {
      router.replace('/quiz')
    } else {
      router.replace('/')
    }
  }
})

const results = computed(() => store.results)
const total = computed(
  () => results.value.D + results.value.I + results.value.S + results.value.C
)
const dominantType = computed(() => store.dominantType)

function restart() {
  store.resetQuiz()
  router.replace('/')
}
</script>
