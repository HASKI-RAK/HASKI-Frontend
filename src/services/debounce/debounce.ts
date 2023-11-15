/**
 *
 * @param callback
 * @param timer
 * @returns
 */
const debounce = (callback: () => void, timer: number = 1000) => {
  const timeout = setTimeout(() => {
    callback()
  }, timer)
  return () => clearTimeout(timeout)
}

export default debounce
