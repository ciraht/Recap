const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']; // Teclas das setas
let score = 0;

document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('track');
  const scoreValue = document.getElementById('score-value');
  const bgm = document.getElementById('bgm');

  function createArrow() {
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    arrow.innerText = arrows[Math.floor(Math.random() * arrows.length)];
    track.appendChild(arrow);
    animateArrow(arrow);
  }

  function animateArrow(arrow) {
    let position = 380;
    const speed = 2;
    const interval = setInterval(frame, 10);

    function frame() {
      if (position <= -50) {
        clearInterval(interval);
        arrow.remove();
        if (!arrow.classList.contains('pressed')) {
          score--;
          scoreValue.textContent = score;
        }
      } else {
        position -= speed;
        arrow.style.top = position + 'px';
      }
    }
  }

  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (arrows.includes(key)) {
      const activeArrows = document.querySelectorAll('.arrow');
      for (let arrow of activeArrows) {
        if (arrow.innerText === key && arrow.offsetTop >= 300 && arrow.offsetTop <= 380) {
          arrow.classList.add('pressed');
          score++;
          scoreValue.textContent = score;
          arrow.remove();
          return;
        }
      }
    }
  });

  bgm.play();

  setInterval(createArrow, 1500);
});
