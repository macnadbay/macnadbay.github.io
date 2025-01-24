    function moving_space(){
        let div = document.createElement('div');
        div.classList.add('div_moving_space');
        div.id = "div_moving_map";
        
        div_comandos.appendChild(div);

        let canvas = document.createElement('canvas');
        canvas.style.height = '100%';
        canvas.style.width = '100%';
        canvas.height = div.offsetHeight;
        canvas.width = canvas.height;
        canvas.id = "canvas_moving_map";
        div.appendChild(canvas);
        //let canvas = document.getElementById(div.id);
        desenhe_moving_map(canvas);
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
            if (i !== 0) {
                ctx.fillText((i / axisRange).toFixed(1), x - 10, centerY + 15);
             }

        // Marcação no eixo Y
            ctx.fillRect(centerX - 5, y - 1, 10, 2);
            if (i !== 0) {
                ctx.fillText((i / axisRange).toFixed(1), centerX + 5, y + 8);
            }
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