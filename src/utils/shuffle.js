/**
 * Fisher-Yates 洗牌算法
 * 对数组进行原地随机排列，保证每个排列等概率出现
 * @param {Array} arr - 待随机排列的数组
 * @returns {Array} - 新的随机排列数组
 */
export function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * 生成选项排列索引
 * @param {number} count - 选项数量
 * @returns {number[]} - 随机排列的索引数组
 */
export function generateOptionOrder(count = 4) {
  const indices = Array.from({ length: count }, (_, i) => i)
  return shuffleArray(indices)
}
