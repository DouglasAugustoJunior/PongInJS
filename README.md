



#[Douglas Augusto](http://github.com/DouglasAugustoJunior)- Outros projetos. # 
 
 
![VERSÃO DO SW](https://img.shields.io/badge/Version-1.0-blue.svg)
 
![LINGUAGEM FINALIDADE](https://img.shields.io/badge/JavaScript-game-orange.svg)
 
O **Pong em JS** é um projeto simples que utilizei para iniciar meus conhecimentos em JS. **[Projeto Online](https://douglasaugustojunior.github.io/PongInJS/)**

![Imagem](https://github.com/DouglasAugustoJunior/PongInJS/blob/master/_images/Game.PNG?raw=true)


 
Desenvolvido em HTML5,CSS3 e JS, ele traz diversas situações interessantes para utilizar diversos recursos.
 
## Interação com o usuário
 
Movimentação dos blocos:
Cima: W ou UP
Baixo: S ou Down

    function moveblock(){
        if (87 in teclas && leftblock.y>0){ // se W for pressionado e o bloco não estiver no topo
            leftblock.y-= leftblock.speed;
        }else if (83 in teclas && leftblock.height + leftblock.y < canvas.height){ // se S for pressionado e o bloco não estiver no fim do canvas
            leftblock.y+= leftblock.speed;
        }
        
        
        if (38 in teclas && rightblock.y>0){
            rightblock.y-=rightblock.speed;
        }
        else if (40 in teclas && rightblock.height + rightblock.y < canvas.height){
            rightblock.y+= rightblock.speed;
        }
    }

 

 
##                                                                                                                                                                                                                                                                        Mecânica
 
Movimento da 'bola':

    function movebola(){
    if(bola.y+bola.height >= leftblock.y &&
       bola.y <= leftblock.y + leftblock.height &&
       bola.x <= leftblock.x + leftblock.width){ // verifica se a bola colidiu com o esquerdo
            bola.dirx=1; // muda a direção para a direita
            bola.mod+=0.2; // aumenta modificador de velocidade
       }else if(bola.y+bola.height >= rightblock.y &&
                bola.y <= rightblock.y + rightblock.height &&
                bola.x + bola.width >= rightblock.x){// verifica se a bola colidiu com o direito
           bola.dirx=-1;// muda a direção para a esquerda
           bola.mod+=0.2; // aumenta modificador de velocidade
       }
    if (bola.y<=0){// se colidir com o topo
        bola.diry=1; //muda direção para baixo
    }else if(bola.y + bola.height >= canvas.height){ // se colidir com o fundo
        bola.diry=-1; // muda direção para cima
    }
    
    bola.x += (bola.speed + bola.mod) * bola.dirx; // movimenta bola conforme a dirx e aumenta com modificador
    bola.y += (bola.speed + bola.mod) * bola.diry; // movimenta bola conforme a diry e aumenta com modificador
    
    if (bola.x <canvas.width && bola.x < leftblock.x){ // se a bola passar do bloco esquerdo
        newgame("player 2");
    }else if (bola.x + bola.width > canvas.width){
        newgame("player 1");
    }
    }


 
## Front-End
 
 

    function desenha(){
    ctx.clearRect(0,0,canvas.width,canvas.height); // limpa canvas
    moveblock();
    movebola();
    ctx.fillStyle = "white"; // deixa todos os elementos do contexto na cor branca
    ctx.fillRect(leftblock.x,leftblock.y,leftblock.width,leftblock.height); // desenha bloco esquerdo
    ctx.fillRect(rightblock.x,rightblock.y,rightblock.width,rightblock.height); // desenha bloco direito
    ctx.fillRect(bola.x,bola.y,bola.width,bola.height); // desenha bola  - x,y,tam x,tam y
    ctx.font = "20px Arial"; // padrão da fonte dos textos
    ctx.fillText("Player 1:"+leftblock.score,50,20);
    ctx.fillText("Player 2:"+rightblock.score,canvas.width - 150,20);
    window.requestAnimationFrame(desenha);
    }


 
 
Para mais informações acesse [meus repositórios](http://github.com/DouglasAugustoJunior).
