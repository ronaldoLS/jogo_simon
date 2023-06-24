export class Botao {
    cor;
    isBtnOn = false;
    isClickavel = false;
    piscou = false;
    duracao;
    audio;
    html;

    constructor(cor, caminhaAudio, idBtnHtml) {
        this.cor = cor;
        this.duracao = 200;
        this.audio = new Audio(caminhaAudio);
        this.html = document.getElementById(idBtnHtml);
        this.html.on
        var x = 0;
        // this.html.onclick = () => {
        //     if (this.isClickavel){
        //         this.piscar();
        //         console.log(x++);
        //     }
                
                
        // }
    }

    LigarDesligar = () => {
        if (this.isBtnOn)
            this.html.classList.remove(this.cor + "Ligado");

        else
            this.html.classList.add(this.cor + "Ligado");

        this.isBtnOn = this.isBtnOn ? false : true;
    }

    piscar = (duracao = this.duracao) => {
        this.efeitoSonoro();
        this.LigarDesligar();

        setTimeout(() => {
            this.LigarDesligar();
        }, duracao);
    }

    efeitoSonoro = () => {
        this.audio.currentTime = 0;
        this.audio.play();
    }



}