
function status_out(texto){
    meu_status_old = meu_status_new;
    meu_status_new = texto;
    meu_status.innerText =  "NEW: " + meu_status_new + "\t" + "OLD: " + meu_status_old;
}

function objClick(event){
    event.stopPropagation();
    event.preventDefault();
    objeto = this;
    //status_out("objClick");
    
    focarObjeto(objeto);

    if(event.shiftKey){
        if(objeto.classList.contains("selecionado")){
            deselecionaObjeto(objeto);
        } else {
            selecionaObjeto(objeto);
        }
    } else {
        if(objeto.classList.contains("selecionado")){
            deselecionaObjeto(objeto);
        } else {
            deselecionarTodos();
            selecionaObjeto(objeto);
        }
    }
}

function focarObjeto(objeto){
    dmx.forEach(dmx_local=>{
        if(dmx_local.obj.style.zIndex > objeto.style.zIndex){
            dmx_local.obj.style.zIndex--;
        }
    });
    objeto.style.zIndex = dmx.length-1;
}

function selecionaObjeto(objeto){
    objeto.classList.add("selecionado");
    objetos_selecionados.push(objeto);
}

function deselecionaObjeto(objeto){
    objeto.classList.remove("selecionado");
    objeto.style.zIndex = 0;
    const index = objetos_selecionados.indexOf(objeto);
    if (index > -1) {
        objetos_selecionados.splice(index, 1); //retira o objeto da matriz
    }
}

function dragFunction(event) {
    // Evitar que o arrasto aconteça se o clique for em qualquer coisa que não a área do arrasto
    isDragging = true;
    slider_isDragging = false;
    objeto = this;

    event.preventDefault();
    event.stopPropagation();
    // Calcula a diferença entre a posição do mouse e a posição do elemento
    offsetX = event.clientX - this.getBoundingClientRect().left;
    offsetY = event.clientY - this.getBoundingClientRect().top;

    // Desabilitar seleção de texto enquanto arrasta (para uma melhor experiência)
    document.body.style.userSelect = 'none';

    //melhorar a experiencia ao selecionar um objeto para o topo
    focarObjeto(objeto);
    
    //console.log(objeto.dataset.info);
    //meu_status("Mouse Down"); 
    if (event.shiftKey) { //se tecla shift pressionada
        if(objeto.classList.contains("selecionado")){ //se objeto estiver selecionado
            deselecionaObjeto(objeto);
        } else {
            selecionaObjeto(objeto);
        }
        //ajusta o offset para movimentação
        ajusta_offset();
    } else {
        deselecionarTodos();
        selecionaObjeto(objeto);
        ajusta_offset();
    }
    //atualiza os valores do slider conforme o ultimo objeto selecionado
    let ultimo = objetos_selecionados.length - 1;
    if(ultimo >= 0){
        //status_out(objetos_selecionados[ultimo].id);
        set_posicao_value_meu_slider(0, dmx[objetos_selecionados[ultimo].id].intensidade, false);
        set_posicao_value_meu_slider(1, dmx[objetos_selecionados[ultimo].id].vermelho, false);
        set_posicao_value_meu_slider(2, dmx[objetos_selecionados[ultimo].id].verde, false);
        set_posicao_value_meu_slider(3, dmx[objetos_selecionados[ultimo].id].azul, false);
        set_posicao_value_meu_slider(4, dmx[objetos_selecionados[ultimo].id].branco, false);
        set_posicao_value_meu_slider(5, dmx[objetos_selecionados[ultimo].id].amarelo, false);
        set_posicao_value_meu_slider(6, dmx[objetos_selecionados[ultimo].id].efeitos, false);
    }
    //set_posicao_value_meu_slider(0, objetos_selecionados[ultimo].id);
    
    //console.log(objetos_selecionados.map(div => div.dataset.id));
};

//deseleciona todos os objetos
function deselecionarTodos(){
    objetos_selecionados.forEach((objSel, index) => {
        objSel.classList.remove("selecionado");
    })
    objetos_selecionados.length = 0;
}

//ajusta offset para movimentação
function ajusta_offset(objeto){
    objetos_selecionados.forEach(objSel => {
        objSel.dataset.offsetX = event.clientX - objSel.getBoundingClientRect().left;
        objSel.dataset.offsetY = event.clientY - objSel.getBoundingClientRect().top;
    })
}

// Quando o usuário APERTA o mouse
function MouseDown(event){
    document.body.style.userSelect = 'none';
    event.preventDefault();
    event.stopPropagation(); 
    if (event.shiftKey) {
        
    } else {
        //objetos_selecionados.forEach((objSel, index) => {
          //  objSel.classList.remove("selecionado");
        //})
        //objetos_selecionados.length = 0;
    }
}

// Quando o usuário move o mouse
function MouseMove(event) {
    document.body.style.userSelect = 'none';
    event.preventDefault();
    event.stopPropagation();
    //status_out("mouse down slider 1");

    if (isDragging) {
        // Atualiza a posição do elemento com base na posição do mouse
        //caixa.style.left = Math.min(Math.max(0,event.clientX - offsetX), window.innerWidth-caixa.offsetWidth) + 'px';
        //objeto.style.left = Math.min(Math.max(0,event.clientX - offsetX), window.innerWidth -objeto.offsetWidth) + window.scrollX + 'px';
        //caixa.style.top = Math.min(Math.max(0,event.clientY - offsetY), window.innerHeight - caixa.offsetHeight) + 'px';
        //objeto.style.top = Math.min(Math.max(0,event.clientY - offsetY), window.innerHeight - objeto.offsetHeight - div_comandos.offsetHeight) + window.scrollY + 'px';
        objetos_selecionados.forEach(objsel=>{
            objsel.style.top = Math.min(Math.max(0,event.clientY - objsel.dataset.offsetY), window.innerHeight - objsel.offsetHeight - div_comandos.offsetHeight) + window.scrollY + 'px';
            objsel.style.left = Math.min(Math.max(0,event.clientX - objsel.dataset.offsetX), window.innerWidth -objsel.offsetWidth) + window.scrollX + 'px';
            //console.log(objsel.style.top);
            //console.log(objsel.dataset.id + " - " + objsel.style.top);
        });
    }
    if (slider_isDragging) {
        // Atualiza a posição do elemento com base na posição do mouse
        //slider_objeto.style.left = 0; //event.clientX - slider_offsetX + 'px';
        let pai = slider_objeto.parentNode;
        let min = pai.offsetTop;//+//slider_objeto.getBoundingClientRect().height/2;
        let max = pai.offsetHeight+pai.offsetTop-slider_objeto.offsetHeight;
        //console.log(event.clientY - slider_offsetY);
        //slider_objeto.style.top = Math.min(max, Math.max(min, event.clientY - slider_offsetY) )+ 'px';
        let pos = Math.min(max, Math.max(min, event.clientY - slider_offsetY) ); //+ 'px';
        set_posicao_meu_slider(slider_objeto.dataset.index, pos);
        //status_out("mouse down slider");
        //console.log(slider_objeto.style.top);
        //console.log(slider_objeto.dataset.index);
        //console.log(min);
        //console.log(max);
        //console.log(slider_objeto.dataset.id);
        //let slider_value = 255*(1 -(slider_objeto.offsetTop - pai.offsetTop)/(pai.offsetHeight-slider_objeto.getBoundingClientRect().height));
        //slider_objeto.innerHTML = Math.round(slider_value);
        //set_value_meu_slider(slider_objeto.dataset.index, slider_value);
        //console.log(slider_value);
    }
}

// Quando o usuário solta o botão do mouse
function MouseUp(event){
    isDragging = false;
    //document.body.style.userSelect = ''; // Restaura a seleção de texto
    slider_isDragging = false;
    if(slider_objeto)slider_objeto.classList.remove("selecionado");
    //status_out("mouse up " + event.target.id);
}

function dragSlider(event){
    slider_objeto= this;
    objeto = null;
    isDragging = false;
    slider_isDragging = true;
    slider_objeto.classList.add("selecionado");

    // Calcula a diferença entre a posição do mouse e a posição do elemento
    slider_offsetX = 0; //event.clientX - this.getBoundingClientRect().left;
    slider_offsetY = event.clientY - this.offsetTop;
    // Desabilitar seleção de texto enquanto arrasta (para uma melhor experiência)
    //document.body.style.userSelect = 'none';
    //slider_objeto.style.userSelect = "none";
    //slider_objeto.style.backgroundColor = "rgb(255,0,0)";
    event.preventDefault();
    event.stopPropagation();
    status_out("mouse down slider");
    status_out(slider_objeto.id);
}

function FundoDown(event){
    
    if (event.currentTarget !== event.target) {
        return; // Sai da função se o evento não estiver na fase "at target"
    }

    event.stopPropagation();
    event.preventDefault();

    isDragging = false;
    //document.body.style.userSelect = ''; // Restaura a seleção de texto
    slider_isDragging = false;
    if(slider_objeto)slider_objeto.classList.remove("selecionado");

    //status_out(event.target.id);
    //status_out(event); 
    objetos_selecionados.forEach((objSel, index) => {
        objSel.classList.remove("selecionado");
    })
    objetos_selecionados.length = 0;

    if(div_foco.classList.contains("selecionado"))div_foco.classList.remove("selecionado");
}