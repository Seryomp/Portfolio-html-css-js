function solarSystemBackground(container) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    // Fonction pour redimensionner le canvas selon la taille du container
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas(); // initial
    window.addEventListener('resize', resizeCanvas);

    // Étoiles
    const stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2
        });
    }

    // Planètes
    const planets = [
        {name:'Mercure', radius:50, size:5, angle:Math.random()*Math.PI*2, speed:0.04, color:'gray'},
        {name:'Venus', radius:80, size:8, angle:Math.random()*Math.PI*2, speed:0.03, color:'yellow'},
        {name:'Terre', radius:110, size:10, angle:Math.random()*Math.PI*2, speed:0.02, color:'blue'},
        {name:'Mars', radius:150, size:8, angle:Math.random()*Math.PI*2, speed:0.015, color:'red'},
        {name:'Jupiter', radius:200, size:18, angle:Math.random()*Math.PI*2, speed:0.01, color:'orange'},
        {name:'Saturne', radius:260, size:16, angle:Math.random()*Math.PI*2, speed:0.008, color:'goldenrod'},
        {name:'Uranus', radius:310, size:12, angle:Math.random()*Math.PI*2, speed:0.006, color:'lightblue'},
        {name:'Neptune', radius:360, size:12, angle:Math.random()*Math.PI*2, speed:0.005, color:'blue'}
    ];

    const moon = {distance:15, size:3, angle:Math.random()*Math.PI*2, speed:0.05};

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // Étoiles
        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, 2*Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
        });

        const centerX = canvas.width/2;
        const centerY = canvas.height/2;

        // Soleil
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, 2*Math.PI);
        ctx.fillStyle='yellow';
        ctx.fill();

        // Planètes et orbites
        planets.forEach(p => {
            p.angle += p.speed;
            const x = centerX + Math.cos(p.angle)*p.radius;
            const y = centerY + Math.sin(p.angle)*p.radius;

            // Orbite
            ctx.beginPath();
            ctx.strokeStyle='rgba(255,255,255,0.1)';
            ctx.arc(centerX, centerY, p.radius, 0, 2*Math.PI);
            ctx.stroke();

            // Planète
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, 2*Math.PI);
            ctx.fillStyle=p.color;
            ctx.fill();

            // Lune pour la Terre
            if(p.name==='Terre'){
                moon.angle += moon.speed;
                const moonX = x + Math.cos(moon.angle)*moon.distance;
                const moonY = y + Math.sin(moon.angle)*moon.distance;
                ctx.beginPath();
                ctx.arc(moonX, moonY, moon.size, 0, 2*Math.PI);
                ctx.fillStyle='lightgray';
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    draw();

    return {canvas, interval: null};
}
