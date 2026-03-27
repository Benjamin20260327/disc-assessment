<template>
  <div class="page-container home-page">
    <h1>DISC行为风格测评</h1>

    <div class="section">
      <h2>测评简介</h2>
      <p>每个人身上都有DISC。DISC是对常人行为风格、行为模式的总结性描述，而不是对人的描述。</p>
      <p>测评结果不是在评价人的"优缺好坏"，而是在描述一个人的特点。</p>
      <p>测评结果没有对错之分，仅作为参考和决策辅助。</p>
      <p>测评结果不是稳定不变的，它是会随着被测评人动机、工作内容、工作环境的变化而变化。</p>
    </div>

    <div class="section">
      <h2>答题规则</h2>
      <p>本测评包含40道单选题，请为每道题选择一个最符合您的选项。</p>
      <p>
        此测评为迫选型测评，四个选项可能存在按个人体感都不符合的情况，尽可能依据工作经历，请按第一印象最快的选择；如果不能确定，可回忆童年时的情况，或者以你最熟悉的人对你的评价来从中选择。
      </p>
    </div>

    <div class="section">
      <h2>重要提示</h2>
      <p>为提升测评效度，题目顺序及选项顺序均为随机生成。</p>
      <p>
        系统支持断点续答。作答过程中，您可以随时关闭页面，下次在<strong>同一设备、同一浏览器</strong>访问本链接时，系统将自动从您上次答题处继续，且题目与选项顺序保持不变。
      </p>
      <p class="warning">
        请注意：您的答题进度仅保存在当前使用的浏览器中。如果更换设备、更换浏览器或清除浏览器数据，进度将无法保留，请务必使用同一设备和浏览器完成测评。
      </p>
    </div>

    <p class="duration">预计时长：约10-15分钟</p>

    <button class="btn-primary" @click="handleStart">
      {{ hasSession ? '继续答题' : '开始测评' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store/quiz'

const router = useRouter()
const store = useQuizStore()
const hasSession = ref(false)

onMounted(() => {
  store.initQuiz()

  if (store.completed) {
    router.replace('/result')
    return
  }

  if (store.hasActiveSession) {
    hasSession.value = true
  }
})

function handleStart() {
  if (store.hasActiveSession && !store.completed) {
    // 继续答题
    router.push('/quiz')
  } else {
    // 开始新测评
    store.createNewSession()
    router.push('/quiz')
  }
}
</script>
