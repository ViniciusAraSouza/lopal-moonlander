// Moolander. Um jogo de alunissagem.
// Vinicius (vinijiujiteiro@gmail.com)
/**   @type {HTMLCanvasElement} */

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let moduloLunar = {
    posicao:  {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "while",
    motorligado: false,
    velocidade: {
        x: 0,
        y: 0
    },
    combustivel: 1000
};

function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
        moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();
    if(moduloLunar.motorligado){
        desenharChama();
    }
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 50);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "yellow";
    contexto.fill();
}

function mostrarVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 100, 60);
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `Combustível: ${moduloLunar.combustivel.toFixed(0)}`;
    contexto.fillText(combustivel, 100, 80);
}

function desenhar(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    atracaoGravitacional();
    desenharModuloLunar();
    mostrarVelocidade();
     mostrarCombustivel();
    requestAnimationFrame(desenhar);
    if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){
        return aletr ("O jogo acabaou")
        
    }
}

document.addEventListener("keydown", teclaPressionada);
document.addEventListener("keyup", teclaSolta);

function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorligado = false;
    }
}

function teclaPressionada(evento){
    if (evento.keyCode == 38 && moduloLunar.combustivel > 0){
        moduloLunar.motorligado = true;
    }
}

let gravidade = 0.1;

function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    
    if(moduloLunar.motorligado && moduloLunar.combustivel > 0){
        moduloLunar.velocidade.y -= 0.2;
        moduloLunar.combustivel -= 1;
    }
    
    moduloLunar.velocidade.y += gravidade;
}
    
desenhar();
