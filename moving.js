    let div_map;
    let div_foco;
    
    function moving_space(){
        div_map = document.createElement('div');
        div_map.classList.add('div_moving_space');
        div_map.id = "div_moving_map";
        
        div_comandos.appendChild(div_map);

        let canvas = document.createElement('canvas');
        canvas.style.height = '100%';
        canvas.style.width = '100%';
        canvas.height = div_map.offsetHeight;
        canvas.width = canvas.height;
        canvas.id = "canvas_moving_map";
        div_map.appendChild(canvas);
        //let canvas = document.getElementById(div.id); //errado
        desenhe_moving_map(canvas);
        desenheFoco();
        //div_map.addEventListener("mousemove", focoMove);
        div_map.addEventListener("mousedown", mapDown);
        div_map.addEventListener("dblclick", mapDblclick);

    }

    function desenhe_moving_map(canvas){
        let ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2
        const axisRange = 100;

        // Limpar canvas
        ctx.clearRect(0, 0, width, height);

        // Desenhar eixos X e Y
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;

        // Eixo X
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // Eixo Y
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        // Desenhar marcações nos eixos
        ctx.fillStyle = "#000";
        for (let i = -axisRange; i <= axisRange; i += 20) {
            const x = centerX + (i * (width / (2 * axisRange)));
            const y = centerY - (i * (height / (2 * axisRange)));

        // Marcação no eixo X
            ctx.fillRect(x - 1, centerY - 5, 2, 10);
            //if (i !== 0) {
            //    ctx.fillText((i / axisRange).toFixed(1), x - 10, centerY + 15);
            // }

        // Marcação no eixo Y
            ctx.fillRect(centerX - 5, y - 1, 10, 2);
            //if (i !== 0) {
            //    ctx.fillText((i / axisRange).toFixed(1), centerX + 5, y + 8);
            //}
        }

    // Escrever o texto "(0,0)" no centro
    //ctx.fillText("(0,0)", centerX + 5, centerY + 15); // Posição inferior esquerda do ponto central
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 0.5;

        for (i = 0; i <= height; i += 10) {
            const posX = i; // Posição em X
            const posY = i; // Posição em Y

            // Linhas verticais
            ctx.beginPath();
            ctx.moveTo(posX, 0);
            ctx.lineTo(posX, height);
            ctx.stroke();

            // Linhas horizontais
            ctx.beginPath();
            ctx.moveTo(0, posY);
            ctx.lineTo(width, posY);
            ctx.stroke();
        }
    }

    function desenheFoco(){
        div_foco = document.createElement("div");
        div_foco.classList.add("meu_foco");
        div_foco.id = "foco";
        div_foco.addEventListener("mousedown", focoDown);
        //div_foco.addEventListener("mousemove", focoMove);

        div_map.appendChild(div_foco);

        div_foco.dataset.offsetX = 0;
        div_foco.dataset.offsetY = 0;
        moveFoco(0, 0);
    }

    function moveFoco(x,y){
        let div_map = document.getElementById("div_moving_map");
        
        let maxx = div_map.offsetWidth + div_foco.offsetWidth/2;
        let maxy = div_map.offsetHeight + div_foco.offsetHeight/2;
        let minx = -div_foco.offsetWidth/2;
        let miny = -div_foco.offsetHeight/2;


        div_foco.style.left = Math.min(maxx, Math.max(minx,(mapValue(x, -100, 100, 0, div_map.offsetWidth) - div_foco.offsetWidth/2))) + "px";
        div_foco.style.top = Math.min(maxy, Math.max(miny, (mapValue(y, 100, -100, 0, div_map.offsetHeight) - div_foco.offsetHeight/2)))+ "px";
        //div_foco.style.left = "0px";
        //div_foco.style.top = "0px";
        
        //status_out(div_foco.style.left);
        //console.log(div_map.offsetLeft);
        //console.log(div_map.offsetTop);
        //div_foco.style.top = event.clientY - div_foco.dataset.offsetY + "px";
    }

    let timer_seleciona;

function focoDown(event){
    event.preventDefault();
    event.stopPropagation();

    //if(div_foco.classList.contains("selecionado")){
    //    div_foco.classList.remove("selecionado");
    //} else {
    div_foco.classList.add("selecionado");
    /*if(timer_seleciona){
        clearTimeout(timer_seleciona);
    }
   timer_seleciona = setTimeout(()=>{
        div_foco.classList.remove("selecionado")
    }, 5000);
    //}*/

    div_foco.dataset.offsetX = event.clientX - div_foco.offsetLeft;
    div_foco.dataset.offsetY = event.clientY - div_foco.offsetTop;
    
}

function focoMove(event){ //mousemove
    event.preventDefault();
    event.stopPropagation();

    if(div_foco.classList.contains("selecionado") && event.buttons === 1){
       // moveFoco(event.clientX, event.clientY);
       let min = 0 - div_foco.offsetWidth/2;
       let max = div_map.offsetWidth - div_foco.offsetWidth/2;
       let minY = 0 - div_foco.offsetHeight/2;
       let maxY = div_map.offsetHeight - div_foco.offsetHeight/2;
      
       div_foco.style.left = Math.min(max, Math.max(min, event.clientX - div_foco.dataset.offsetX)) + "px";
       div_foco.style.top = Math.min(maxY, Math.max(minY, event.clientY - div_foco.dataset.offsetY)) + "px";
       //status_out(div_foco.style.left);
       //status_out(div_foco.style.top);
       //console.log(minY);
       //console.log(maxY);
       //console.log(div_foco.style.top);
       //console.log(div_foco.offsetHeight);
    }
}

let tempoClique;

function mapDown(event){
    event.preventDefault();
    event.stopPropagation();
    if(div_foco.classList.contains("selecionado") && event.buttons === 1){
        //moveFoco(event.clientX, event.clientY);
        let x = div_map.getBoundingClientRect().left;
        div_foco.style.left = event.clientX - x - div_foco.offsetWidth/2 + "px";
        let y = div_map.getBoundingClientRect().top;
        div_foco.style.top = event.clientY - y -div_foco.offsetHeight/2 + "px";
        //console.log(div_foco.style.left);
        //console.log(div_foco.style.top);
        //clearTimeout(timer_seleciona);
        //timer_seleciona = setTimeout(()=>{
        //    div_foco.classList.remove("selecionado");
       // }, 5000);
    }
    if(event.buttons ===2){
        moveFoco(0,0);
        return;
    }
}

function mapDblclick(event){
    //event.preventDefault();
    //event.stopPropagation();
}