function dragFunction(event) {
    // Evitar que o arrasto aconteça se o clique for em qualquer coisa que não a área do arrasto
    isDragging = true;
    objeto = this;

    event.preventDefault();
    event.stopPropagation();
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
    //selecao.
    //objeto.innerHTML = objeto.style.zIndex;
    //console.log(objeto.dataset.info);
    //meu_status("Mouse Down"); 
    if (event.shiftKey) {
        if(objeto.classList.contains("selecionado")){
            objeto.classList.remove("selecionado");
            const index = objetos_selecionados.indexOf(objeto);
            if (index > -1) {
                objetos_selecionados.splice(index, 1);
            }
        } else {
            objeto.classList.add("selecionado");
            objetos_selecionados.push(objeto);
        }
        objetos_selecionados.forEach(objSel => {
            objSel.dataset.offsetX = event.clientX - objSel.getBoundingClientRect().left;
            objSel.dataset.offsetY = event.clientY - objSel.getBoundingClientRect().top;
        })
    } else {
        objetos_selecionados.forEach((objSel, index) => {
            objSel.classList.remove("selecionado");
        })
        objetos_selecionados.length = 0;
        objeto.classList.add("selecionado");
        objetos_selecionados.push(objeto);
        objetos_selecionados.forEach(objSel => {
            objSel.dataset.offsetX = event.clientX - objSel.getBoundingClientRect().left;
            objSel.dataset.offsetY = event.clientY - objSel.getBoundingClientRect().top;
        })
    }
    //console.log(objetos_selecionados.map(div => div.dataset.id));
};

// Quando o usuário move o mouse
function MouseDown(event){
    document.body.style.userSelect = 'none';
    event.preventDefault();
    event.stopPropagation(); 
    if (event.shiftKey) {
        
    } else {
        //objetos_selecionados.forEach((objSel, index) => {
        //    objSel.classList.remove("selecionado");
        //})
        //objetos_selecionados.length = 0;
    }
}

// Quando o usuário move o mouse
function MouseMove(event) {
    document.body.style.userSelect = 'none';
    event.preventDefault();
    event.stopPropagation();
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
function MouseUp(){
    isDragging = false;
    //document.body.style.userSelect = ''; // Restaura a seleção de texto
    slider_isDragging = false;
    //status_out("mouse up"); 
}