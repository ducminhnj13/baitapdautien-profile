// Fireworks effect for 'Tặng quà' button
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10 - 5;
            this.color = color;
            this.alpha = 1;
            this.size = Math.random() * 4 + 2;
            this.gravity = 0.05;
            this.friction = 0.98;
        }

        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 0.015;
            this.size *= 0.99;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createFirework(x, y) {
        const colors = [
            '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3',
            '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
        ];
        const numParticles = 50;
        for (let i = 0; i < numParticles; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.alpha <= 0 || particle.size <= 0.5) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    const giftBtn = document.getElementById('gift-btn');
    giftBtn.addEventListener('click', function(e) {
        // Button click sound effect (optional)
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcDjeC1/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcDjeC1/');
        audio.play().catch(() => {});

        const rect = giftBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;

        // Create multiple bursts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFirework(x, y), i * 200);
        }
    });
});

// Message form handling
document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('message-form');
    const messagesDiv = document.getElementById('messages');

    messageForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const sender = document.getElementById('sender-name').value.trim();
        const content = document.getElementById('message-content').value.trim();

        if (!sender || !content) {
            return;
        }

        const message = { sender, content };

        try {
            const response = await fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            if (!response.ok) {
                const error = await response.text();
                alert('Gửi tin nhắn thất bại: ' + error);
                return;
            }

            displayMessage(message);
            messageForm.reset();
        } catch (err) {
            alert('Không thể gửi tin nhắn. Vui lòng kiểm tra server.');
            console.error(err);
        }
    });

    function displayMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <div class="sender">${message.sender}</div>
            <div class="content">${message.content}</div>
        `;
        messagesDiv.appendChild(messageDiv);
    }
});
