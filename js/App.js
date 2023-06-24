
import { Botao } from "./Botao.mjs";


let pontuacao = 0;
let recorde = 0;
let isGameOn = false;
let sequencia = new Array;


sequencia = Array(); // sequencia que os botoes acenderao
let intervalSequancia;
let botoes = Array();
let btnsAtivado = false;
let tIntervalo = 1000;
let tPiscada = 400;



// vetor de botoes

botoes = Array(
    new Botao(
        "vermelho",
        "sons/si.wav",
        "vermelho"
    ),
    new Botao(
        "azul",
        "sons/sol.wav",
        "azul"
    ),
    new Botao(
        "amarelo",
        "sons/mi.wav",
        "amarelo"
    ),
    new Botao(
        "verde",
        "sons/do.wav",
        "verde"
    ),

);

botoes.forEach(botao => {
    botao.html.addEventListener('click', (event) => {
        const element = event.target;
        var numBtn;
        switch (element.id) {
            case "vermelho":
                numBtn = 0;
                break;
            case "azul":
                numBtn = 1;
                break;
            case "amarelo":
                numBtn = 2;
                break;
            case "verde":
                numBtn = 3;
                break;

            default:
                console.log("default do switch do evento listner");
                break;
        }
        if (botao.isClickavel)
            verificar(numBtn);
    });
});


//sortea um novo botao para acresentar a sequancia
function sortear() {
    var numAleatorio = Math.floor(Math.random() * 4);  // pega um numero inteiro aleatorio de 0 a 3   
    sequencia.push(numAleatorio);
    return sequencia[sequencia.length - 1]; // retorna o ultimo numero aleatorio adicionado a sequencia
}

// apresenta a sequencia de botoes a serem apertados
function reproduzirSequencia() {
    var x = 0;
    botoes.forEach(element => {
        element.isClickavel = false;
    });
    console.log("tPiscada: " + tIntervalo);
    console.log("tPiscada: " + tPiscada);

    tIntervalo = sequencia.length <= 20 ? 1000 - sequencia.length * 50 : 150;
    tPiscada = tIntervalo*0.4;


    intervalSequancia = setInterval(
        () => {
 
            if (x < sequencia.length)
                botoes[sequencia[x]].piscar(tPiscada);

            else {

                botoes.forEach(element => {
                    element.isClickavel = true;
                    clearInterval(intervalSequancia);
                });

                x = 0;
            }
            x++;
        }, tIntervalo);

    // tIntervalo *= tIntervalo < 100 ? 1 : 0.9; // duracao do intervalo decrementa até chegar em 100 millesegundos
    // tPiscada *= tPiscada < 40 ? 1 : 0.95; // duracao da piscada decrementa até chegar a 40 millisegundos        
}



var i = 0;
function verificar(btn) {
    if (sequencia[i] == btn) {
        botoes[btn].piscar();
        i++;
        if (i == sequencia.length) {
            pontuacao++;
            atualizarPontos();
            i = 0;
            sortear();
            reproduzirSequencia();
        }
    }
    else {
        errou(i);
        i = 0;
    }
}


//atribui valores padroes as variaveis
function restaurar() {
    botoes.forEach(element => {
        element.isClickavel = false;
    });
    atualizarRecorde();
    sequencia = new Array;
    sortear();
    pontuacao = 0;
    atualizarPontos();
}

function errou(erro) {
    var audio = new Audio("sons/efeito-de-mordida.mp3");
    audio.currentTime = 0; // Reinicia o áudio para reproduzi-lo novamente
    audio.play();
    botoes[sequencia[erro]].piscar(300);
    gameOnOff();
}

//atualiza os pontos na tela
function atualizarPontos() {
    document.getElementById("pontos").innerHTML = "" + pontuacao;
}

//atualiza o record nos cookies
function atualizarCookieRecorde() {
    var x;
    var nomeCookie = "recorde" + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ')
            cookie = cookie.substring(1);

        if (cookie.indexOf(nomeCookie) === 0)
            x = cookie.substring(nomeCookie.length, cookie.length);
    }
    x = !(x >= 0) ? 0 : parseInt(x);
    if (recorde > x) {
        var data = new Date();
        data.setTime(data.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expira = "expires=" + data.toUTCString();
        document.cookie = "recorde" + "=" + recorde + ";" + expira;
        document.getElementById("recorde").innerHTML = "Recorde: " + recorde;
    }
    else {
        document.getElementById("recorde").innerHTML = "Recorde: " + x;
    }
}
//atualiza o recorde local e 
function atualizarRecorde() {
    if (recorde < pontuacao)
        recorde = pontuacao;
    atualizarCookieRecorde();
    return recorde;
}

// ligar desligar o jogo
document.getElementById("btnLigarDesligar").onclick = () => {
    gameOnOff();
};
function gameOnOff() {
    restaurar();
    isGameOn = isGameOn ? false : true;
    if (isGameOn) {
        reproduzirSequencia();
        document.getElementById("btnLigarDesligar").classList.add("btnLigarDesligarOn");
    }

    else {
        document.getElementById("btnLigarDesligar").classList.remove("btnLigarDesligarOn");
        sequencia = Array();
        pontuacao = 0;
        atualizarPontos();
    }
}
atualizarRecorde();
