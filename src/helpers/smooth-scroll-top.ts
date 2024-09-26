export const smoothScrollToTop = () => {
  const startPosition = window.pageYOffset
  const duration = 1000 // Duración más corta (700ms para hacerlo más rápido)
  let startTime: number | null = null

  const animation = (currentTime: number | null) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime as number - (startTime as number)
    const run = easeOutExpo(timeElapsed, startPosition, -startPosition, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  // Función de suavizado con curva ease-out-expo
  const easeOutExpo = (t: number, b: number, c: number, d: number) => {
    return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  }

  requestAnimationFrame(animation)
}