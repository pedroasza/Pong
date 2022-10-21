//variáveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bola
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete 
let xRaquete = 0;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variáveis raquete oponente
let xRaqueteOponente= 585
let yRaqueteOponente = 150
let velocidadeYOptonente;

//placar do jogo
let meusPontos = 0 ;
let pontosDoOponente = 0;

let colidiu = false;
 
//sons do jogo
let raquetada;
let ponto;
let trilhaDeFundo;

var img = document.createElement("img");

let chanceDeErro = 0;

function preload(){
  trilhaDeFundo = loadSound("[FREE] Lofi Type Beat - 'Promise'.mp4")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilhaDeFundo.loop();
}

function mostraRaquete(x , y){
  rect(x,y,larguraRaquete,alturaRaquete)
}

function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola = 23
    }
}

function draw() {
  background(147,112,219);
  mostraBola();
  movimentoBola();
  colisaoBordas();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentoRaquete();
  movimentoRaqueteOponente();
  //colisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  placarJogo();
  marcadorPontuacao();
  bolinhaNaoFicaPresa();
}


function mostraBola(){
  circle(xBola,yBola,diametro)
}

function movimentoBola(){
  xBola += velocidadeXBolinha
  yBola += velocidadeYBolinha
}

function colisaoBordas(){
  if(xBola + raio > width || xBola - raio < 0){
    velocidadeXBolinha *= -1
   }
  if(yBola + raio > height || yBola - raio < 0){
    velocidadeYBolinha *= -1
  }
  
}

function movimentoRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

function movimentoRaqueteOponente(){
  velocidadeYOponente = yBola - yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErro
  calculaChanceDeErro();
}

function calculaChanceDeErro() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErro += 1
    if (chanceDeErro >= 39){
    chanceDeErro = 40
    }
  } else {
    chanceDeErro -= 1
    if (chanceDeErro <= 35){
    chanceDeErro = 35
    }
  }
}


function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x,y,larguraRaquete,alturaRaquete,xBola, yBola,raio);
  if(colidiu){
    velocidadeXBolinha *= -1
  raquetada.play();
  }
  
  
}

function placarJogo(){
  stroke(255);
  textAlign(CENTER);
  textSize(15);
  fill(color (75,0,130));
  rect(145,7, 50, 30, 5)
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(75,0,130))
  rect(445, 7, 50, 30, 5)
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcadorPontuacao(){
  if(xBola > 590){
    meusPontos += 1
  }
  if(xBola < 10){
    pontosDoOponente += 1
  ponto.play();
  }
}


