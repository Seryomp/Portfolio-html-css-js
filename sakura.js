function sakuraBackground(container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');

    const petals = [];
    for (let i = 0; i < 70; i++) {
        petals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 10 + Math.random() * 10,
            speedY: 0.5 + Math.random(),
            speedX: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * 360
        });
    }

    function drawBranch(ctx, startX, startY, length, angle, width) {
        ctx.strokeStyle = '#8B5A2B';
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        ctx.lineTo(endX, endY);
        ctx.stroke();

        if (length > 40) { 
            drawBranch(ctx, endX, endY, length * 0.7, angle + Math.PI / 6, width * 0.7);
            drawBranch(ctx, endX, endY, length * 0.7, angle - Math.PI / 6, width * 0.7);
        }
    }

    function drawPetal(ctx, x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.6, size, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    const interval = setInterval(() => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBranch(ctx, 50, canvas.height, 180, -Math.PI / 3, 12);
        drawBranch(ctx, canvas.width - 50, canvas.height, 180, -2 * Math.PI / 3, 12);

        petals.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += 2;
            if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }

            drawPetal(ctx, p.x, p.y, p.size, p.rotation);
        });
    }, 30);

    return { canvas, interval };
}
