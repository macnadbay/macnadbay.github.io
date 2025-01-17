/* Script with function to setup html enviroment*/

class Objetos_DMX{
    static contadorID = 0;
    constructor (canais = 8, endereco = 1){
        this.canais = canais;
        this.endereco = endereco;
        this.id = Objetos_DMX.contadorID++;
        this.intensidade = 0;
        this.vermelho = 0;
        this.verde = 0;
        this.azul = 0;
        this.branco = 0;
        this.amarelo = 0;
        this.efeitos = 0;
        this.pisca = 0;
        this.x = 0;
        this.y = 0;
        this.x_fine = 0;
        this.y_fine = 0;
    }

    
    obj = null; //representa a div na pagina
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

    intensidade;
    vermelho;
    verde;
    azul;
    branco;
    amarelo;
    efeitos;
    pisca;
    x;
    y;
    x_fine;
    y_fine;
};
// Referência ao elemento que será arrastado
var objetos = [];
var dmx = [];
var selecao = [];

const NumeroObjetos = 6;
var objeto; //variavel para fazer o drag dos objetos
var slider_objeto; //variavel para fazer o drag dos sliders

const div_comandos = document.getElementById("comando");
const div_fundo = document.getElementById("fundo");
    div_fundo.addEventListener('click', FundoClick);

const meu_status = document.getElementById("status");
const objetos_selecionados = [];
const sliders = [];

const body = document.getElementById("body");
    body.addEventListener('mousemove', MouseMove);
    body.addEventListener('mousedown', MouseDown);
    body.addEventListener('mouseup', MouseUp);
// Variáveis para armazenar a posição inicial do mouse
let offsetX, offsetY, isDragging = false;
let slider_offsetX, slider_offsetY, slider_isDragging = false;

//document.addEventListener('mousemove', MouseMove);
//document.addEventListener('mouseup', MouseUp);
//document.addEventListener('mousedown', MouseDown);
document.addEventListener('touchmove', converterTouchMoveToMousemove);
document.addEventListener('touchend', converterTouchEndToMouseup);

add_classe_objeto(NumeroObjetos);
add_meu_slider();

// Quando o usuário começa a arrastar (pressiona o botão do mouse)

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
        //dmx[ultimo].obj.classList.add("azul");
        dmx[ultimo].intensidade = Math.round(Math.random()*255);
        dmx[ultimo].vermelho = Math.round(Math.random()*255);
        dmx[ultimo].verde = Math.round(Math.random()*255);
        dmx[ultimo].azul = Math.round(Math.random()*255);
        dmx[ultimo].branco = Math.round(Math.random()*255);
        dmx[ultimo].amarelo = Math.round(Math.random()*255);
        dmx[ultimo].efeitos = 0;

        
        dmx[ultimo].endereco = endereco_local;
        dmx[ultimo].obj.innerText = `DMX ${dmx[ultimo].endereco}.${dmx[ultimo].canais}`;
        endereco_local = endereco_local + dmx[ultimo].canais;
        dmx[ultimo].obj.style.left = 100*i+"px";
        let l_vermelho = Math.round(dmx[ultimo].vermelho*dmx[ultimo].intensidade/255);
        let l_verde = Math.round(dmx[ultimo].verde*dmx[ultimo].intensidade/255);
        let l_azul = Math.round(dmx[ultimo].azul*dmx[ultimo].intensidade/255);
        dmx[ultimo].obj.style.backgroundColor = `rgb(${l_vermelho},${l_verde},${l_azul})`;
        //dmx[ultimo].obj.style.top = "300px";
        dmx[ultimo].obj.style.zIndex = ultimo;
        dmx[ultimo].obj.id = dmx[ultimo].id;
        dmx[ultimo].obj.addEventListener('mousedown',dragFunction);
        dmx[ultimo].obj.addEventListener('click', objClick);
        //dmx[ultimo].obj.addEventListener('touchmove', converterTouchMoveToMousemove);
        //dmx[ultimo].obj.addEventListener('touchend', converterTouchEndToMouseup);
        dmx[ultimo].obj.addEventListener('touchstart', converterTouchToMouseDown);

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

function increment_slider(event){
    let objeto = this;
    //console.log("incremente_slider: slide " + objeto.dataset.id);
    let l_slider = document.getElementById("meu_slider"+objeto.dataset.id);
    if(l_slider){
        let i = Math.min(255, parseInt(l_slider.dataset.valor) + 1);
        // console.log(i);
        //meu_slider_set_valor(l_slider, i+1);
        set_posicao_value_meu_slider(objeto.dataset.id, i);
    } else {
        console.log("increment_slider: slider nao identificado")
    }
    
}

function decrement_slider(event){
    let objeto = this;
    //console.log("decrement_slider: slide " + objeto.dataset.id);
    let l_slider = document.getElementById("meu_slider"+objeto.dataset.id);
    if(l_slider){
        let i = Math.max(0, parseInt(l_slider.dataset.valor) - 1);
        // console.log(i);
        //meu_slider_set_valor(l_slider, i+1);
        set_posicao_value_meu_slider(objeto.dataset.id, i);
    } else {
        console.log("decrement_slider: slider nao identificado")
    }
    
}

function add_meu_slider(){
    const comandos = ["LIGHT", "RED","GREEN","BLUE","WHITE","YELLOW","COLORS"];
    comandos.forEach( (comando,index) => {
        let height = div_comandos.offsetHeight;
        //console.log(height);

        let div = document.createElement("div");
        div.classList.add("div_meu_slider");

        let div_superior = document.createElement("div");
        div_superior.classList.add("meu_slider_mais");
        div_superior.dataset.id = index;
        
        
        let div_superior_conteudo = document.createElement("div");
        div_superior_conteudo.classList.add("meu_slider_mais_conteudo");
        div_superior_conteudo.innerHTML = "+";
        div_superior_conteudo.dataset.id = index;


        div_superior_conteudo.addEventListener("mousedown", increment_slider);
        
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
        div_botao_slider.dataset.id = comando;
        div_botao_slider.dataset.index = index;
        div_botao_slider.addEventListener("mousedown", dragSlider);
        div_botao_slider.addEventListener('touchstart', converterTouchToMouseDown);
        sliders.push(div_botao_slider);
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
        div_inferior.dataset.id = index;
        div_inferior.addEventListener("mousedown", decrement_slider);

        //div_inferior.addEventListener("onclick", minus)

        //console.log(comando);
        div.appendChild(div_superior);
        div.appendChild(div_centro);
        div.appendChild(div_inferior);
        div_comandos.appendChild(div);
        //set_posicao_meu_slider(index, 100*Math.random());
        set_posicao_value_meu_slider(index, 255*Math.random());
    })
}

function set_posicao_value_meu_slider(local_slider,valor){
    let l_slider = document.getElementById("meu_slider"+local_slider);
    if(l_slider){
        meu_slider_set_valor(l_slider,valor);
        valor = mapValue(valor, 0, 255, l_slider.parentElement.offsetHeight + l_slider.parentElement.offsetTop - l_slider.offsetHeight, l_slider.parentElement.offsetTop);
        l_slider.style.top = valor + "px";
    } else {
        console.log("set_posicao_value_meu_slider: Slider não encontrado")
    }
}

function set_posicao_meu_slider(local_slider, valor){
    let l_slider = document.getElementById("meu_slider"+local_slider);
    if(l_slider){
        l_slider.style.top = valor + "px"; //mapValue(valor, 255, 0, l_slider.parentNode.offsetTop, l_slider.parentNode.offsetHeight + l_slider.offsetHeight/2 + 1) + 'px'; //Math.min(min, Math.max(max, event.clientY - slider_offsetY) )+ 'px';
        //console.log(l_slider.parentNode.offsetHeight);
        set_value_posicao_meu_slider(local_slider, valor);
        //l_slider.innerHTML = Math.round(valor);
    } else {
        console.log("set_posicao_meu_slider: Slider não encontrado")
    }
}

function set_value_posicao_meu_slider(local_slider, valor){
    let l_slider = document.getElementById("meu_slider"+local_slider);
    if(l_slider){
        //console.log("valor: "+ valor);
        valor = mapValue(valor, l_slider.parentElement.offsetTop, l_slider.parentElement.offsetHeight + l_slider.parentElement.offsetTop - l_slider.offsetHeight, 255, 0);
        //console.log((l_slider.parentElement.offsetTop));
        meu_slider_set_valor(l_slider, Math.round(valor));
    } else {
        console.log("set_value_posicao_meu_slider: Slider não encontrado")
    }
}

function meu_slider_set_valor(l_slider, valor){
    l_slider.dataset.valor = Math.round(valor);
    l_slider.innerText = Math.round(valor);
    
    objetos_selecionados.forEach(obj=>{
        let index = l_slider.dataset.id;
        //console.log("meu_slider_set_valor: " + index);
        switch (index) {
            case "LIGHT":
                dmx[obj.id].intensidade = valor;
                break;
            case "RED":
                dmx[obj.id].vermelho = valor;
                break;
            case "GREEN":
                dmx[obj.id].verde = valor;
                break;
            case "BLUE":
                dmx[obj.id].azul = valor
                break;
            case "WHITE":
                dmx[obj.id].branco = valor;
                break;
            case "YELLOW":
                dmx[obj.id].amarelo = valor;
                break;
            case "CORES":
                dmx[obj.id].efeitos = valor;
                break;

            default:
                //console.log("meu_slider_ser_valor: slider nao identificado: " + index);
                break;
        }
            let lintensidade = dmx[obj.id].intensidade;
            let lvermelho = dmx[obj.id].vermelho*lintensidade/255;
            let lverde = dmx[obj.id].verde*lintensidade/255;
            let lazul = dmx[obj.id].azul*lintensidade/255;   
            dmx[obj.id].obj.style.backgroundColor = `rgb(${lvermelho},${lverde}, ${lazul})`;
        //obj.style.backgroundColor = `rgb(${obj.canal_vermelho}, ${obj.canal_verde}, ${obj.canal_azul})`;
        //obj.style.backgroundColor = "red";
        //obj.style.top = 10 + 'px';
        //AQUIIIIIIIIIIIII
        //console.log(;
    })
}

function mapValue(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}