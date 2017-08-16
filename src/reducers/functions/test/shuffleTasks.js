import * as utils from './../../../utils'

function shuffleTasks(tasks) {
  const length = tasks.length
  const shuffled = []

  const nums = []
  for (let i = 0; i < length; i++) {
    nums[i] = i
  }

  for (let i = 0; i < length; i++) {
    const index = utils.getRandomArbitrary(0, nums.length)
    shuffled[nums[index]] = tasks[i]
    nums.splice(index, 1)
  }

  return shuffled
}

export default shuffleTasks;
