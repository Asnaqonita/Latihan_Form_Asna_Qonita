const canvas = document.getElementById('formcanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

const properties = {
    particleCount: 150,           
    particleColor: '#6d25ff',    
    minVelocity: 0.2,             
    maxVelocity: 2.0,             
    minSize: 1,                  
    maxSize: 4                   
};

class Star {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;    
        this.y = Math.random() * canvas.height;   
        this.size = Math.random() * (properties.maxSize - properties.minSize) + properties.minSize;
        this.velocity = Math.random() * (properties.maxVelocity - properties.minVelocity) + properties.minVelocity;
        this.opacity = Math.random() * 0.5 + 0.2;  
    }

    update() {
        this.y += this.velocity; 

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 190, 255, ${this.opacity})`; // Warna ungu dengan transparansi
        ctx.fill();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = properties.particleColor;
    }
}

const starsArray = [];
for (let i = 0; i < properties.particleCount; i++) {
    starsArray.push(new Star());
}

function animate() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
        starsArray[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();
