/* Script with to manage Mobile functions*/
var activeTouchId = null;
var meu_status_old;
var meu_status_new;

function status_out(texto){
    meu_status_old = meu_status_new;
    meu_status_new = texto;
    meu_status.innerText = "old: " + meu_status_old + " new: " + meu_status_new;
}

function converterTouchToMouseDown(event) {
    // Obtém as informações do toque (coordenadas do toque)
    event.preventDefault();
    event.stopPropagation();
    
    if (activeTouchId === null) {
        // Salva o ID do primeiro toque
        activeTouchId = event.touches[0].identifier;
        status_out("Primeiro toque detectado: x-" + event.touches[0].clientX + " y-" + event.touches[0].clientY);
        
    } else {
        // Ignora toques adicionais
        status_out("Toque adicional ignorado");
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
        status_out("Movimento do primeiro toque:" + touch.clientX + "y-" + touch.clientY);
        } else {
          status_out("Movimento ignorado");
          return;
        }
    } else {
        return;
    }

    //const touch = event.changedTouches[0];
    //console.log(event.type);
    touch = event.changedTouches[0];
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
        status_out("Primeiro toque terminou:");
        activeTouchId = null; // Reseta para permitir novos toques
    } else {
        status_out("Touch end adicional ignorado");
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
    touch = event.changedTouches[0];
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