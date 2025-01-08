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

const NumeroObjetos = 6;
var objeto;
var slider_objeto;

const fundo = document.getElementById("fundo");
const div_comandos = document.getElementById("comando");
const meu_status = document.getElementById("status");

// Variáveis para armazenar a posição inicial do mouse
let offsetX, offsetY, isDragging = false;
let slider_offsetX, slider_offsetY, slider_isDragging = false;

var activeTouchId = null;

document.addEventListener('mousemove', MouseMove);
document.addEventListener('mouseup', MouseUp);
document.addEventListener('touchmove', converterTouchMoveToMousemove, false);
document.addEventListener('touchend', converterTouchEndToMouseup, false);

add_classe_objeto(NumeroObjetos);
add_meu_slider();

// Quando o usuário começa a arrastar (pressiona o botão do mouse)
function dragFunction(event) {
    // Evitar que o arrasto aconteça se o clique for em qualquer coisa que não a área do arrasto
    isDragging = true;
    objeto = this;
    // Calcula a diferença entre a posição do mouse e a posição do elemento
    offsetX = event.clientX - this.getBoundingClientRect().left;
    offsetY = event.clientY - this.getBoundingClientRect().top;

    // Desabilitar seleção de texto enquanto arrasta (para uma melhor experiência)
    document.body.style.userSelect = 'none';

    //melhorar a experiencia ao selecionar um objeto para o topo
    dmx.forEach(dmx_local=>{
        if(dmx_local.obj.style.zIndex > objeto.style.zIndex){
            //max = dmx_local.obj.style.zIndex;
            dmx_local.obj.style.zIndex--;
            //dmx_local.obj.innerHTML = dmx_local.obj.style.zIndex;
            
        }
    });
    objeto.style.zIndex = dmx.length-1;
    //objeto.innerHTML = objeto.style.zIndex;
    //console.log(objeto.dataset.info);
    //event.preventDefault();
    meu_status.innerText = "Mouse Down"
};

// Quando o usuário move o mouse
function MouseMove(event) {
    if (isDragging) {
        // Atualiza a posição do elemento com base na posição do mouse
        //caixa.style.left = Math.min(Math.max(0,event.clientX - offsetX), window.innerWidth-caixa.offsetWidth) + 'px';
        objeto.style.left = Math.min(Math.max(0,event.clientX - offsetX), window.innerWidth -objeto.offsetWidth) + 'px';
        //caixa.style.top = Math.min(Math.max(0,event.clientY - offsetY), window.innerHeight - caixa.offsetHeight) + 'px';
        objeto.style.top = Math.min(Math.max(0,event.clientY - offsetY), window.innerHeight - objeto.offsetHeight - div_comandos.offsetHeight) + 'px';
    }
    if (slider_isDragging) {
        // Atualiza a posição do elemento com base na posição do mouse
        //slider_objeto.style.left = 0; //event.clientX - slider_offsetX + 'px';
        let pai = slider_objeto.parentNode;
        let min = pai.offsetTop;//+//slider_objeto.getBoundingClientRect().height/2;
        let max = pai.offsetHeight+pai.offsetTop-slider_objeto.offsetHeight;
        //console.log(event.clientY - slider_offsetY);
        slider_objeto.style.top = Math.min(max, Math.max(min, event.clientY - slider_offsetY) )+ 'px';
        //console.log(slider_objeto.style.top);
        //console.log(min);
        //console.log(max);
        let slider_value = 100*(1 -(slider_objeto.offsetTop - pai.offsetTop)/(pai.offsetHeight-slider_objeto.getBoundingClientRect().height));
        slider_objeto.innerHTML = Math.round(slider_value);
        //console.log(slider_value);
    }
}

// Quando o usuário solta o botão do mouse
function MouseUp(){
    isDragging = false;
    document.body.style.userSelect = ''; // Restaura a seleção de texto
    slider_isDragging = false;
}

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
        dmx[ultimo].obj.classList.add("azul");
        dmx[ultimo].endereco = endereco_local;
        dmx[ultimo].obj.innerText = `DMX ${dmx[ultimo].endereco}.${dmx[ultimo].canais}`;
        endereco_local = endereco_local + dmx[ultimo].canais;
        dmx[ultimo].obj.style.left = 100*i+"px";
        //dmx[ultimo].obj.style.top = "300px";
        dmx[ultimo].obj.style.zIndex = ultimo;
        dmx[ultimo].obj.dataset.info = ultimo;
        dmx[ultimo].obj.addEventListener('mousedown',dragFunction);
        dmx[ultimo].obj.addEventListener('touchmove', converterTouchMoveToMousemove, false);
        dmx[ultimo].obj.addEventListener('touchend', converterTouchEndToMouseup, false);
        dmx[ultimo].obj.addEventListener('touchstart', converterTouchToMouse, false);

      /*  dmx[ultimo].obj.addEventListener('touchstart', converterTouchToMouse, false);
        dmx[ultimo].obj.addEventListener('touchmove', converterTouchToMouse, false);
        dmx[ultimo].obj.addEventListener('touchend', converterTouchToMouse, false); //*/

        // Adiciona o novo objeto à div container
        fundo.appendChild(dmx[ultimo].obj);
    }
}

/*function add_slider_comando(){
    const comandos = ["Intensidade", "Vermelho","Verde","Azul","Branco","Amarelo","Efeitos", "X","Y"];
    comandos.forEach(comando => {
        let div = document.createElement("div");
        div.style.height= "100%";
        div.style.width = "50px";
        div.style.backgroundColor = "rgb(150, 150, 150)";
        div.style.marginLeft = "2px";
        div.style.overflow = "hidden";
        div.style.border = "solid 1px black";
        div.classList.add("div_slider");
        //div.classList.add("container");

        
        let div_superior = document.createElement("div");
        div_superior.classList.add("row");
        div_superior.classList.add("slider_mais");
        div_superior.innerHTML = "+";

        let slider = document.createElement("input");
        slider.type = "range";
        slider.classList.add("vertical_slider");
        //slider.classList.add("row");
        slider.orient = "vertical";

        let div_inferior = document.createElement("div");
        div_inferior.classList.add("row");
        div_inferior.classList.add("slider_menos");
        div_inferior.innerHTML = "-";

        //console.log(comando);
        div.appendChild(div_superior);
        div.appendChild(slider);
        div.appendChild(div_inferior);
        div_comandos.appendChild(div);
    })
}*/


function add_meu_slider(){
    const comandos = ["LIGHT", "RED","GREEN","BLUE","WHITE","YELLOW","COLORS"];
    comandos.forEach( (comando,index) => {
        let height = div_comandos.offsetHeight;
        //console.log(height);

        let div = document.createElement("div");
        div.classList.add("div_meu_slider");

        let div_superior = document.createElement("div");
        div_superior.classList.add("meu_slider_mais");
        let div_superior_conteudo = document.createElement("div");
        div_superior_conteudo.classList.add("meu_slider_mais_conteudo");
        div_superior_conteudo.innerHTML = "+";
        div_superior.appendChild(div_superior_conteudo);
        

        let div_centro = document.createElement("div");
        div_centro.classList.add("meu_slider_centro");
        let div_slider = document.createElement("div");
        div_slider.classList.add("meu_slider_centro_esquerda");
        let div_texto = document.createElement("div");
        div_texto.classList.add("meu_slider_centro_direita");
        div_texto.innerHTML = comando;
        div_centro.appendChild(div_slider);
        div_centro.appendChild(div_texto);

        switch(comando){
            case "LIGHT":
                div_texto.style.background = "linear-gradient(to top, rgb(120, 118, 118),rgb(255, 255, 255))";
            break;
            case "RED":
                div_texto.style.background = "linear-gradient(to top, rgb(120,0,0),rgb(255,0,0))";
            break;
            case "GREEN":
                div_texto.style.background = "linear-gradient(to top, rgb(0,120,0),rgb(0,255,0))";
            break;
            case "BLUE":
                div_texto.style.background = "linear-gradient(to top, rgb(0,0,120),rgb(0,0,255))";
            break;
            case "WHITE":
                div_texto.style.background = "linear-gradient(to top, rgb(120,120,120),rgb(250,250,250))";
            break;
            case "YELLOW":
                div_texto.style.background = "linear-gradient(to top, rgb(120,120,0),rgb(255,255,0))";
            break;
            case "COLORS":
                div_texto.style.background = "linear-gradient(to top, red, green, blue, yellow)";
            break;
        }

        let div_fundo_slider = document.createElement("div");
        div_fundo_slider.classList.add("meu_slider_fundo");
        div_slider.appendChild(div_fundo_slider);

        let div_botao_slider = document.createElement("div");
        div_botao_slider.classList.add("meu_slider_botao");
        div_botao_slider.id = "meu_slider" + index;
        div_botao_slider.addEventListener("mousedown", dragSlider);
        div_botao_slider.addEventListener('touchstart', converterTouchToMouse, false);
        //div_botao_slider.addEventListener('touchmove', converterTouchMoveToMousemove, false);
        //document.addEventListener('touchend', converterTouchEndToMouseup, false);
        //
        //div_botao_slider.innerText = 50;
        //console.log(div_botao_slider.id);
        div_fundo_slider.appendChild(div_botao_slider);
        
        //slider.classList.add("row");
        //slider.orient = "vertical";

        let div_inferior = document.createElement("div");
        div_inferior.classList.add("meu_slider_menos");
        let div_inferior_conteudo = document.createElement("div");
        div_inferior_conteudo.classList.add("meu_slider_mais_conteudo");
        div_inferior_conteudo.innerHTML = "-";
        div_inferior.appendChild(div_inferior_conteudo);
        //div_inferior.addEventListener("onclick", minus)

        //console.log(comando);
        div.appendChild(div_superior);
        div.appendChild(div_centro);
        div.appendChild(div_inferior);
        div_comandos.appendChild(div);
        set_value_meu_slider(index, 100*Math.random());

    })
}

function dragSlider(event){
    slider_objeto= this;
    slider_isDragging = true;

    // Calcula a diferença entre a posição do mouse e a posição do elemento
    slider_offsetX = 0; //event.clientX - this.getBoundingClientRect().left;
    slider_offsetY = event.clientY - this.offsetTop;
    // Desabilitar seleção de texto enquanto arrasta (para uma melhor experiência)
    document.body.style.userSelect = 'none';
    slider_objeto.style.userSelect = "none";
    //slider_objeto.style.backgroundColor = "rgb(255,0,0)";
    //event.preventDefault();
    //meu_status.innerText = "mouse down slider";
}

function set_value_meu_slider(local_slider, valor){
    let l_slider = document.getElementById("meu_slider"+local_slider);
    if(l_slider){
        l_slider.style.top = mapValue(valor, 100, 0, l_slider.parentNode.offsetTop, l_slider.parentNode.offsetHeight + l_slider.offsetHeight/2 + 1) + 'px'; //Math.min(min, Math.max(max, event.clientY - slider_offsetY) )+ 'px';
        //console.log(l_slider.parentNode.offsetHeight);
        l_slider.innerHTML = Math.round(valor);
    } else {
        console.log("Slider não encontrado")
    }
}

function mapValue(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function converterTouchToMouse(event) {
    // Obtém as informações do toque (coordenadas do toque)
    event.preventDefault();
    event.stopPropagation();
    
    if (activeTouchId === null) {
        // Salva o ID do primeiro toque
        activeTouchId = event.touches[0].identifier;
        meu_status.innerText = "Primeiro toque detectado: x-" + event.touches[0].clientX + " y-" + event.touches[0].clientY;
    } else {
        // Ignora toques adicionais
        meu_status.innerText = "Toque adicional ignorado";
        return;
    }
    
    const touch = event.changedTouches[0];
    //console.log(event.type);
    //meu_status.innerText = event.type;
    //if(event.type == "touchstart")meu_status.innerText = "mousedown";
    //event.type = "mousedown";
    //if(event.type == "touchend")event.type = "mouseup";
    //if(event.type == "touchmove")event.type = "mousemove";
    // Cria um evento de mouse com base nas informações do toque
    const mouseEvent = new MouseEvent("mousedown", {
      bubbles: true,  // Propagar para os pais
      cancelable: true, // O evento pode ser cancelado
      view: window,  // A janela do navegador
      clientX: touch.clientX,  // Posição X do toque
      clientY: touch.clientY,  // Posição Y do toque
      screenX: touch.screenX,  // Posição na tela
      screenY: touch.screenY   // Posição na tela
    });
  
    // Dispara o evento de mouse no mesmo alvo do evento de toque
    touch.target.dispatchEvent(mouseEvent);
  }
  
  // Adiciona o ouvinte de eventos para touchstart
  function converterTouchMoveToMousemove(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (activeTouchId !== null) {
        // Verifica se o movimento pertence ao toque inicial
        const touch = Array.from(event.touches).find(t => t.identifier === activeTouchId);
        if (touch) {
          meu_status.innerText = "Movimento do primeiro toque:" + touch.clientX + "y-" + touch.clientY;
        } else {
          meu_status.innerText = "Movimento ignorado";
          return;
        }
    } else {
        return;
    }

    //const touch = event.changedTouches[0];
    //console.log(event.type);
    
    // Cria um evento de mouse com base nas informações do toque
    const mouseEvent = new MouseEvent("mousemove", {
      bubbles: true,  // Propagar para os pais
      cancelable: true, // O evento pode ser cancelado
      view: window,  // A janela do navegador
      clientX: touch.clientX,  // Posição X do toque
      clientY: touch.clientY,  // Posição Y do toque
      screenX: touch.screenX,  // Posição na tela
      screenY: touch.screenY   // Posição na tela
    });
  
    // Dispara o evento de mouse no mesmo alvo do evento de toque
    touch.target.dispatchEvent(mouseEvent);    
  }

  function converterTouchEndToMouseup(event) {
    event.preventDefault();
    event.stopPropagation();

    const touch = Array.from(event.changedTouches).find(t => t.identifier === activeTouchId);
    if (touch) {
        meu_status.innerText = "Primeiro toque terminou:";
        activeTouchId = null; // Reseta para permitir novos toques
    } else {
        return;
    }

    //const touch = event.changedTouches[0];
    //console.log(event.type);
    //touchactive = false;
    //meu_status.innerText = event.type;
    //if(event.type == "touchstart")meu_status.innerText = "mousedown";
    //event.type = "mousedown";
    //if(event.type == "touchend")event.type = "mouseup";
    //if(event.type == "touchmove")event.type = "mousemove";
    // Cria um evento de mouse com base nas informações do toque
    const mouseEvent = new MouseEvent("mouseup", {
      bubbles: true,  // Propagar para os pais
      cancelable: true, // O evento pode ser cancelado
      view: window,  // A janela do navegador
      clientX: touch.clientX,  // Posição X do toque
      clientY: touch.clientY,  // Posição Y do toque
      screenX: touch.screenX,  // Posição na tela
      screenY: touch.screenY   // Posição na tela
    });
  
    // Dispara o evento de mouse no mesmo alvo do evento de toque
    touch.target.dispatchEvent(mouseEvent);  
  }