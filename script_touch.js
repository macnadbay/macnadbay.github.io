/* Script with to manage Mobile functions*/
var activeTouchId = null;
var meu_status_old;
var meu_status_new;
let touchTimeout = null;
//let lastTouch = 0;

function converterTouchToMouseDown(event) {
    // Obtém as informações do toque (coordenadas do toque)
  if (activeTouchId === null) { //se for o primeito toque
    // Salva o ID do primeiro toque
    activeTouchId = event.touches[0].identifier;
    //status_out("Primeiro toque detectado: x-" + event.touches[0].clientX + " y-" + event.touches[0].clientY);
    //const currentTime = new Date().getTime();
    // Detectar se é um duplo toque (em 300ms, por exemplo)
    //let temp = lastTouch;
    //lastTouch = currentTime;
    status_out(event.target.id);
    if(event.target.id == "fundo"){
      FundoClick(event);
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    if(event.target.id == "body"){
      //event.stopPropagation();
      //event.preventDefault();
      return;
    }

    if(event.target.id == "comando"){
      //event.stopPropagation();
      //event.preventDefault();
      return;
    }

    //if (currentTime - temp < 300) {
        //simulateMouseDownShift(event);
        //return;
    //}
    if (touchTimeout !== null) {
      // Toque duplo detectado
      clearTimeout(touchTimeout);
      touchTimeout = null;
      simulateMouseDownShift(event);
    } else {
      // Configurar temporizador para identificar toque único
      touchTimeout = setTimeout(() => { 
        touchTimeout = null;
        // Toque único: selecionar apenas este objeto
        simulateMouseDown(event);
        }, 200); // Tempo limite para reconhecer toque duplo
    }
  } else {
    // Ignora toques adicionais
    //status_out("Toque adicional ignorado");
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  //const touch = event.changedTouches[0];
  //console.log(event.type);
  //meu_status.innerText = event.type;
  //if(event.type == "touchstart")meu_status.innerText = "mousedown";
  //event.type = "mousedown";
  //if(event.type == "touchend")event.type = "mouseup";
  //if(event.type == "touchmove")event.type = "mousemove";
  // Cria um evento de mouse com base nas informações do toque
  /*const mouseEvent = new MouseEvent("mousedown", {
    bubbles: true,  // Propagar para os pais
    cancelable: true, // O evento pode ser cancelado
    view: window,  // A janela do navegador
    clientX: touch.clientX,  // Posição X do toque
    clientY: touch.clientY,  // Posição Y do toque
    screenX: touch.screenX,  // Posição na tela
    screenY: touch.screenY   // Posição na tela
  });*/
  
 // Dispara o evento de mouse no mesmo alvo do evento de toque
 // touch.target.dispatchEvent(mouseEvent);
}

function simulateMouseDownShift(touchEvent) {
    const touch = touchEvent.changedTouches[0]; // Primeiro ponto de toque
  
    // Criar evento de mousedown
    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: touch.clientX,
      clientY: touch.clientY,
      shiftKey: true, // Ativar a tecla Shift
    });
  
    // Disparar o evento no elemento embaixo do toque
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement) {
      targetElement.dispatchEvent(mouseEvent);
    }
    status_out("simulateMouseDownShift");
}

function simulateMouseDown(touchEvent) {
  const touch = touchEvent.changedTouches[0]; // Primeiro ponto de toque

  // Criar evento de mousedown
  const mouseEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    clientX: touch.clientX,
    clientY: touch.clientY,
    shiftKey: false, // Ativar a tecla Shift
  });

  // Disparar o evento no elemento embaixo do toque
  const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
  if (targetElement) {
    targetElement.dispatchEvent(mouseEvent);
  }
  status_out("simulateMouseDown: " + touchEvent.target.id);
}

// Adiciona o ouvinte de eventos para touchstart
function converterTouchMoveToMousemove(event) {
/*    const touch = Array.from(event.touches).find(t => t.identifier === activeTouchId);

    if (activeTouchId !== null) {
        // Verifica se o movimento pertence ao toque inicial
        if (touch) {
          //status_out("Movimento do primeiro toque:" + touch.clientX + "y-" + touch.clientY);
          event.preventDefault();
          event.stopPropagation();
        } else {
          //status_out("Movimento ignorado");
          return;
        }
    } else {
        return;
    }*/
        event.preventDefault();
        event.stopPropagation();
   const touch = event.changedTouches[0]; // Primeiro ponto de toque

    //const touch = event.changedTouches[0];
    //console.log(event.type);
    //touch = Array.from(event.touches[0]).find(t => t.identifier === activeTouchId);
    //touch = event.changedTouches[0];
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
    //touch.target.dispatchEvent(mouseEvent);    
    //const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    //if (targetElement) {
      //targetElement.dispatchEvent(mouseEvent);
    //}
    event.target.dispatchEvent(mouseEvent);
    status_out("simulateMouseMove");
    status_out(event.target);
    
}

function converterTouchEndToMouseup( event) {
    event.preventDefault();
    //event.stopPropagation();
    status_out("touchUP: " + event.target.id);
    objeto = null;
    isDragging = false;
    slider_isDragging = false;
    clearTimeout(touchTimeout);

    const touch = Array.from(event.changedTouches).find(t => t.identifier === activeTouchId);
    if (touch) {
        //status_out("Primeiro toque terminou:");
        activeTouchId = null; // Reseta para permitir novos toques
    } else {
       // status_out("Touch end adicional ignorado");
        return;
    }
    event.stopPropagation();

    //const touch = event.changedTouches[0];
    //console.log(event.type);
    //touchactive = false;
    //meu_status.innerText = event.type;
    //if(event.type == "touchstart")meu_status.innerText = "mousedown";
    //event.type = "mousedown";
    //if(event.type == "touchend")event.type = "mouseup";
    //if(event.type == "touchmove")event.type = "mousemove";
    // Cria um evento de mouse com base nas informações do toque
    //touch = event.changedTouches[0];
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
    //touch.target.dispatchEvent(mouseEvent);  
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement) {
      targetElement.dispatchEvent(mouseEvent);
    }
  }

function TouchStartSliders(event) {
  event.preventDefault();
  event.stopPropagation();

  const touch = event.changedTouches[0]; // Primeiro ponto de toque
  const mouseEvent = new MouseEvent("mousedown", {
    bubbles: true,  // Propagar para os pais
    cancelable: true, // O evento pode ser cancelado
    view: window,  // A janela do navegador
    clientX: touch.clientX,  // Posição X do toque
    clientY: touch.clientY,  // Posição Y do toque
    screenX: touch.screenX,  // Posição na tela
    screenY: touch.screenY   // Posição na tela
  });
  const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement) {
        targetElement.dispatchEvent(mouseEvent);
    }
    status_out("TouchStartSliders" + targetElement.id);
}

function TouchEndSliders(event) {
  event.preventDefault();
  event.stopPropagation();
  
  if(slider_isDragging)slider_isDragging = false;
  if(isDragging)isDragging = false;
  status_out("TouchEndSliders");
  const touch = event.changedTouches[0]; // Primeiro ponto de toque
  const mouseEvent = new MouseEvent("mouseup", {
    bubbles: true,  // Propagar para os pais
    cancelable: true, // O evento pode ser cancelado
    view: window,  // A janela do navegador
    clientX: touch.clientX,  // Posição X do toque
    clientY: touch.clientY,  // Posição Y do toque
    screenX: touch.screenX,  // Posição na tela
    screenY: touch.screenY   // Posição na tela
  });
  const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement) {
        targetElement.dispatchEvent(mouseEvent);
    }
}
