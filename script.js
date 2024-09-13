function animateBird() {
  const bird = document.getElementById("bird");
  const obstacle = document.getElementById("obstacle");
  const duration = 2000; // Duración del viaje en milisegundos
  const start = Date.now();
  let gameWon = false;

  // Cargar el sonido
  const sound = new Audio(
    "/Audio/Angry Birds Sounds_ Red Sound Effects (mp3cut.net).mp3"
  );

  function move() {
    const timePassed = Date.now() - start;
    const progress = timePassed / duration;

    // Definir la trayectoria parabólica (ajustar según sea necesario)
    const x = 1500 * progress;
    const y = 550 * Math.sin(Math.PI * progress);

    bird.style.left = x + "px";
    bird.style.bottom = y + "px";

    // Detectar colisión con el obstáculo
    const birdRect = bird.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      birdRect.right >= obstacleRect.left && // Si el pájaro toca el obstáculo
      birdRect.bottom <= obstacleRect.top + obstacleRect.height &&
      !gameWon // Asegura que el mensaje no se muestre múltiples veces
    ) {
      obstacle.style.transform = "rotate(90deg)"; // Tumbar el obstáculo
      gameWon = true;

      // Detener el sonido al ganar el juego
      sound.pause();
      sound.currentTime = 0;

      setTimeout(() => {
        alert("¡Juego Ganado!");
        location.reload(); // Reinicia el juego al aceptar
      }, 500); // Retrasa un poco el mensaje para dar tiempo a la animación
    }

    if (progress < 1 && !gameWon) {
      requestAnimationFrame(move);
    } else {
      // Detener el sonido al finalizar la animación
      sound.pause();
      sound.currentTime = 0;
    }
  }

  // Iniciar la reproducción del sonido cuando comience la animación
  sound.play();

  requestAnimationFrame(move);
}
