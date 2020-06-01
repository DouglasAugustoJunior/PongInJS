var canvas = document.getElementById("mycanvas"), ctx = canvas.getContext("2d"),teclas = {},
    bola = {
        x: canvas.width/2 -15, // metade da tela menos a metade do quadrado para ficar no centro
        y: canvas.height/2 - 15,
        width:30,
        height:30,
        dirx:-1,
        diry:1,
        speed:2,
        mod:0, //modificador de velocidade para quando colidir
        
    },
    leftblock = {
        x:10, // pouco afastado da margem esquerda
        y: canvas.height/2 -60, // aparecer no centro na vertical
        height:120,
        width:30,
        score:0,
        speed:10
    },
    rightblock = {
        x: 560, // 10 de margem mais a largura de 30 somam 600 da largura do game
        y: canvas.height/2 -60, // aparecer no centro na vertical
        height:120,
        width:30,
        score:0,
        speed:10
    };

document.addEventListener("keydown",function(e){ // função acionada ao pressioanr tecla
    teclas[e.keyCode] = true;
    //alert(e.keyCode);
});

document.addEventListener("keyup",function(e){ // função acionada ao soltar tecla
   delete teclas[e.keyCode]; 
});

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

function newgame(winner){ // verifica vencedor
    if (winner == "player 1"){
        leftblock.score++; // incrementa pontuação
    }else if(winner == "player 2"){
        rightblock.score++; // incrementa pontuação
    }
    reset();
}

function reset(){ // volta as posições dos objetos
    rightblock.y= canvas.height/2 -leftblock.height/2;
    leftblock.y = canvas.height/2 -rightblock.height/2;
    bola.y = canvas.height/2 - bola.height/2;
    bola.x = canvas.width/2 - bola.width/2;
    bola.mod = 0;
}

desenha();