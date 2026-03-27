import { defineStore } from 'pinia'
import { questionBank } from '@/data/questions'
import { shuffleArray, generateOptionOrder } from '@/utils/shuffle'
import { saveState, loadState, clearState } from '@/utils/storage'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questionBank: questionBank,
    shuffledQuestionIds: [],
    optionOrders: {},
    answers: {},
    currentIndex: 0,
    completed: false
  }),

  getters: {
    totalQuestions: (state) => state.shuffledQuestionIds.length,

    currentQuestion(state) {
      if (
        this.totalQuestions === 0 ||
        state.currentIndex >= this.totalQuestions
      ) {
        return null
      }
      const qId = state.shuffledQuestionIds[state.currentIndex]
      return state.questionBank.find((q) => q.id === qId)
    },

    currentOptions() {
      const question = this.currentQuestion
      if (!question) return []
      const order = this.optionOrders[question.id] || [0, 1, 2, 3]
      return order.map((i) => question.options[i])
    },

    progressPercent(state) {
      if (this.totalQuestions === 0) return 0
      return Math.round((state.currentIndex / this.totalQuestions) * 100)
    },

    answeredCount(state) {
      return Object.keys(state.answers).length
    },

    results(state) {
      const counts = { D: 0, I: 0, S: 0, C: 0 }
      Object.values(state.answers).forEach((type) => {
        if (counts.hasOwnProperty(type)) {
          counts[type]++
        }
      })
      return counts
    },

    dominantType(state) {
      const r = this.results
      let max = 0
      let dominant = 'D'
      for (const key of ['D', 'I', 'S', 'C']) {
        if (r[key] > max) {
          max = r[key]
          dominant = key
        }
      }
      return dominant
    },

    hasActiveSession() {
      return this.shuffledQuestionIds.length > 0 && !this.completed
    }
  },

  actions: {
    initQuiz() {
      const saved = loadState()
      if (saved && saved.shuffledQuestionIds && saved.shuffledQuestionIds.length > 0) {
        this.shuffledQuestionIds = saved.shuffledQuestionIds
        this.optionOrders = saved.optionOrders || {}
        this.answers = saved.answers || {}
        this.currentIndex = saved.currentIndex || 0
        this.completed = saved.completed || false
      }
    },

    createNewSession() {
      // 1. 随机排列题目
      const allIds = this.questionBank.map((q) => q.id)
      this.shuffledQuestionIds = shuffleArray(allIds)

      // 2. 为每道题生成随机选项排列
      this.optionOrders = {}
      this.shuffledQuestionIds.forEach((id) => {
        this.optionOrders[id] = generateOptionOrder(4)
      })

      // 3. 重置答案和进度
      this.answers = {}
      this.currentIndex = 0
      this.completed = false

      // 4. 持久化
      this.persist()
    },

    submitAnswer(type) {
      const qId = this.shuffledQuestionIds[this.currentIndex]
      this.answers[qId] = type
      this.currentIndex++

      if (this.currentIndex >= this.shuffledQuestionIds.length) {
        this.completed = true
      }

      this.persist()
    },

    persist() {
      saveState({
        shuffledQuestionIds: this.shuffledQuestionIds,
        optionOrders: this.optionOrders,
        answers: this.answers,
        currentIndex: this.currentIndex,
        completed: this.completed
      })
    },

    resetQuiz() {
      clearState()
      this.shuffledQuestionIds = []
      this.optionOrders = {}
      this.answers = {}
      this.currentIndex = 0
      this.completed = false
    }
  }
})
