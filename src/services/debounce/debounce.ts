/**
 * debounce function.
 *
 * @param callback - Function to be delayed when called.
 * @param timer - The time to wait before calling the callback function.
 *
 * @remarks
 * debounce represents a function that can be used to delay a function call.
 *
 * @returns - Function that clears the current timeout.
 *
 * @category Logic
 */
const debounce = (callback: () => void, timer = 1000) => {
  const timeout = setTimeout(() => {
    callback()
  }, timer)
  return () => clearTimeout(timeout)
}

export default debounce
