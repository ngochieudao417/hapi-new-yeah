const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
const actionButton = document.getElementById('actionButton');
const mainText = document.getElementById('mainText');
const extraText = document.getElementById('extraText');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ['#ff0000', '#ff4500', '#ff6347'];
    const particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: x,
            y: y,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
        });
    }

    fireworks.push(particles);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.alpha -= 0.01;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.alpha})`;
            ctx.fill();
        });

        if (firework.every(particle => particle.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

actionButton.addEventListener('click', () => {
    // Ẩn dòng chữ chính
    mainText.classList.add('hidden');
    
    // Hiện dòng chữ mới sau một khoảng thời gian
    setTimeout(() => {
        extraText.innerHTML = 'Happy New Yeah!<br>New Yeah, New Me(ntal Issues)';
        extraText.classList.remove('hidden'); // Hiện dòng chữ mới
        extraText.style.display = 'block'; // Đặt display thành block
    }, 1000); // Thời gian trễ 1000ms (1 giây) trước khi hiện dòng chữ mới
});

setInterval(createFirework, 500);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
