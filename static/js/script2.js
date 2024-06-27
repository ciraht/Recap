// Carregar imagens
const pinguimImg = new Image();
pinguimImg.src = 'static/img/pinguim_pingoludo.png';

const pinheiroImg = new Image();
pinheiroImg.src = 'static/img/pinheiro.png';

// Executar após as imagens carregarem
pinguimImg.onload = function() {
  init(); // Iniciar jogo após carregamento
};

// Configurações gerais
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameDuration = 60; // Tempo de jogo em segundos
const obstaclesInterval = 1500; // Intervalo de tempo para gerar obstáculos (ms)
const obstacleWidth = 50;
const obstacleHeight = 50;
const playerSpeed = 5; // Velocidade do jogador
const slideSpeed = 2; // Velocidade de deslizamento para baixo quando o tempo acaba
const snowTrailInterval = 100; // Intervalo de tempo para desenhar partículas de neve (ms)

// Estado do jogo
let startTime; // Tempo de início do jogo
let score = 0;
let isGameOver = false;
let timeLeft = gameDuration; // Tempo restante inicial igual ao tempo de jogo

// Objeto jogador (por exemplo, um pinguim)
let player = {
  x: canvas.width / 2,
  y: canvas.height - 240, // Posição inicial ajustada para -240
  width: 60, // Largura da imagem do pinguim
  height: 60, // Altura da imagem do pinguim
  sliding: false // Flag para indicar se o jogador está deslizando
};

// Obstáculos
let obstacles = [];

// Rastro de neve
let snowTrail = [];

// Event listeners para teclado
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Variáveis para controle de teclas pressionadas
let leftPressed = false;
let rightPressed = false;

// Função para inicializar o jogo após o carregamento das imagens
function init() {
  // Iniciar o jogo
  generateObstacle();
  setInterval(generateObstacle, obstaclesInterval); // Chamar generateObstacle a cada intervalo de tempo
  setInterval(drawSnowTrail, snowTrailInterval); // Chamar drawSnowTrail a cada intervalo de tempo
  requestAnimationFrame(updateGame); // Iniciar o loop de atualização do jogo
}

// Função para desenhar o jogador
function drawPlayer() {
  ctx.drawImage(pinguimImg, player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
}

// Função para desenhar obstáculos
function drawObstacles() {
  ctx.fillStyle = '#2ECC71';
  for (let obstacle of obstacles) {
    ctx.drawImage(pinheiroImg, obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  }
}

// Função para desenhar o timer na tela
function drawTimer() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Tempo: ${timeLeft}s`, 10, 30);
}

// Função para desenhar o rastro de neve
function drawSnowTrail() {
  ctx.fillStyle = '#fff'; // Cor branca para a neve
  for (let snow of snowTrail) {
    ctx.beginPath();
    ctx.arc(snow.x, snow.y, 2, 0, Math.PI * 2); // Desenhar pequenos círculos para simular a neve
    ctx.fill();
  }
}

// Função para atualizar e desenhar o jogo
function updateGame(timestamp) {
  if (!startTime) {
    startTime = timestamp; // Definir o tempo de início do jogo na primeira iteração
  }

  const elapsedTime = (timestamp - startTime) / 1000; // Tempo decorrido em segundos

  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar jogador
    drawPlayer();
    updatePlayer();

    // Atualizar e desenhar obstáculos
    drawObstacles();
    updateObstacles();

    // Desenhar o timer na tela
    drawTimer();

    // Atualizar tempo restante
    timeLeft = Math.max(0, gameDuration - Math.floor(elapsedTime));

    // Adicionar posição atual do jogador ao rastro de neve
    snowTrail.push({ x: player.x, y: player.y });

    // Remover partículas de neve antigas
    if (snowTrail.length > 100) {
      snowTrail.shift();
    }

    // Verificar fim do jogo
    if (timeLeft <= 0) {
      startSlideDown();
    }

    // Loop para atualização contínua do jogo
    requestAnimationFrame(updateGame);
  } else {
    // Redirecionar para a página após o jogo terminar
    window.location.href = '/local4';
  }
}

// Função para iniciar o deslizamento para baixo quando o tempo acaba
function startSlideDown() {
  player.sliding = true;
}

// Função para realizar o deslizamento para baixo
function slideDown() {
  if (player.sliding && player.y < canvas.height + player.height) {
    player.y += slideSpeed;
  } else {
    isGameOver = true; // Marcar como game over quando o jogador deslizar para baixo completamente
  }
}

// Função para gerar obstáculos
function generateObstacle() {
  let obstacle = {
    x: Math.random() * (canvas.width - obstacleWidth),
    y: canvas.height + obstacleHeight // Começar abaixo do canvas
  };
  obstacles.push(obstacle);
}

// Função para atualizar posição dos obstáculos
function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y -= 2; // Velocidade dos obstáculos subindo

    // Verificar colisão com o jogador
    if (checkCollision(player, obstacles[i])) {
      gameOver();
      break;
    }

    // Remover obstáculo se sair do canvas
    if (obstacles[i].y + obstacleHeight < 0) {
      obstacles.splice(i, 1);
      i--; // Decrementar o índice para evitar pular um obstáculo após remoção
    }
  }
}

// Função para verificar colisão entre jogador e obstáculo
function checkCollision(player, obstacle) {
  return player.x < obstacle.x + obstacleWidth &&
         player.x + player.width > obstacle.x &&
         player.y < obstacle.y + obstacleHeight &&
         player.y + player.height > obstacle.y;
}

// Função para finalizar o jogo
function gameOver() {
  isGameOver = true;
}

// Função para lidar com tecla pressionada
function handleKeyDown(event) {
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    leftPressed = true;
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    rightPressed = true;
  }
}

// Função para lidar com tecla solta
function handleKeyUp(event) {
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    leftPressed = false;
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    rightPressed = false;
  }
}

// Função para atualizar posição do jogador baseado nas teclas pressionadas
function updatePlayer() {
  if (leftPressed && player.x - player.width / 2 > 0) {
    player.x -= playerSpeed;
  }
  if (rightPressed && player.x + player.width / 2 < canvas.width) {
    player.x += playerSpeed;
  }

  // Se o jogador está deslizando, realizar o deslizamento
  if (player.sliding) {
    slideDown();
  }
}
