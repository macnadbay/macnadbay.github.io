class Objetos_DMX{
    constructor (canais = 8, endereco = 1){
        this.canais = canais;
        this.endereco = endereco;
    }

    obj = null;
    canal_intensidade = null;
    canal_vermelho = null;
    canal_verde = null;
    canal_azul = null;
    canal_branco = null;
    canal_amarelo = null;
    canal_x = null;
    canal_y = null;
    canal_x_fine = null;
    canal_y_fine = null;
    canal_efeitos = null;
    cabal_gobos = null;

    intensidade = 0;
    vermelho = 0;
    verde = 0;
    azul = 0;
    branco = 0;
    amarelo = 0;
    x = 0;
    y = 0;
    x_fine = 0;
    y_fine = 0;
    efeitos = 0;
};
// Referência ao elemento que será arrastado
var objetos = [];
var dmx = [];

const NumeroObjetos = 2;
var objeto;

const fundo = document.getElementById("fundo");
const caixa = document.getElementById("caixa");

// Variáveis para armazenar a posição inicial do mouse
let offsetX, offsetY, isDragging = false;

// Quando o usuário começa a arrastar (pressiona o botão do mouse)
caixa.addEventListener('mousedown', dragFunction);

function dragFunction(event) {
    // Evitar que o arrasto aconteça se o clique for em qualquer coisa que não a área do arrasto
    isDragging = true;
    objeto = this;
    // Calcula a diferença entre a posição do mouse e a posição do elemento
    offsetX = event.clientX - this.getBoundingClientRect().left;
    offsetY = event.clientY - this.getBoundingClientRect().top;

    // Desabilitar seleção de texto enquanto arrasta (para uma melhor experiência)
    document.body.style.userSelect = 'none';
    dmx.forEach(dmx_local=>{
        if(dmx_local.obj.style.zIndex == dmx.length){
            dmx_local.obj.style.zIndex = objeto.style.zIndex;
        }
    });
    objeto.style.zIndex = dmx.length;
    //console.log(objeto.dataset.info);
};

// Quando o usuário move o mouse
document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        // Atualiza a posição do elemento com base na posição do mouse
        //caixa.style.left = Math.min(Math.max(0,event.clientX - offsetX), window.innerWidth-caixa.offsetWidth) + 'px';
        objeto.style.left = Math.min(Math.max(0,event.clientX - offsetX), window.innerWidth-caixa.offsetWidth) + 'px';
        //caixa.style.top = Math.min(Math.max(0,event.clientY - offsetY), window.innerHeight - caixa.offsetHeight) + 'px';
        objeto.style.top = Math.min(Math.max(0,event.clientY - offsetY), window.innerHeight - caixa.offsetHeight) + 'px';
    }
});

// Quando o usuário solta o botão do mouse
document.addEventListener('mouseup', function() {
    isDragging = false;
    document.body.style.userSelect = ''; // Restaura a seleção de texto
    //objeto.style.zIndex = 0;
});

function addObjects(N) {
    //const container = document.getElementById('container');

    // Adiciona N objetos à div container
    for (let i = 0; i < N; i++) {
        // Cria um novo elemento div
        objetos.push(document.createElement('div'));
        let ultimo = objetos.length -1;
        objetos[ultimo].classList.add("arrastavel");
        objetos[ultimo].innerText = `Objeto ${ultimo + 1}`;
        objetos[ultimo].style.left = 100*(ultimo+1)+"px";
        objetos[ultimo].style.zIndex = ultimo;
        objetos[ultimo].addEventListener('mousedown',dragFunction);

        // Adiciona o novo objeto à div container
        fundo.appendChild(objetos[ultimo]);
    }
}

addObjects(NumeroObjetos);

function add_classe_objeto(N) {
    //const container = document.getElementById('container');
    let endereco_local = 1;
    // Adiciona N objetos à div container
    for (let i = 0; i < N; i++) {
        // Cria um novo elemento div
        dmx.push(new Objetos_DMX(8,1));
        let ultimo = dmx.length - 1;
        dmx[ultimo].obj = document.createElement('div');
        dmx[ultimo].obj.classList.add("arrastavel");
        dmx[ultimo].endereco = endereco_local;
        dmx[ultimo].obj.innerText = `DMX ${dmx[ultimo].endereco}.${dmx[ultimo].canais}`;
        endereco_local = endereco_local + dmx[ultimo].canais;
        dmx[ultimo].obj.style.left = 100*i+"px";
        dmx[ultimo].obj.style.top = "300px";
        dmx[ultimo].obj.style.zIndex = ultimo;
        dmx[ultimo].obj.dataset.info = ultimo;
        dmx[ultimo].obj.addEventListener('mousedown',dragFunction);

        // Adiciona o novo objeto à div container
        fundo.appendChild(dmx[ultimo].obj);
    }
}

add_classe_objeto(5);
