const STORAGE_KEY = 'disc_quiz_state'

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('保存答题状态失败:', e)
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('读取答题状态失败:', e)
    return null
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY)
}
