export const smoothScrollToTop = () => {
  const startPosition = window.pageYOffset;
  const duration = 1000; // Duración de la animación
  let startTime: number | null = null;
  let animationFrameId: number;

  const animation = (currentTime: number | null) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime as number - (startTime as number);
    const run = easeOutExpo(timeElapsed, startPosition, -startPosition, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      // Continuar la animación hasta que termine el tiempo
      animationFrameId = requestAnimationFrame(animation);
    }
  };

  // Función de suavizado con curva ease-out-expo
  const easeOutExpo = (t: number, b: number, c: number, d: number) => {
    return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  };

  // Inicia la animación
  animationFrameId = requestAnimationFrame(animation);

  // Devuelve una función para cancelar la animación
  return () => {
    cancelAnimationFrame(animationFrameId); // Permite detener la animación cuando sea necesario
  };
};