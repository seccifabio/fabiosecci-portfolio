class DotGrid {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.config = {
            dotSize: 12,
            gap: 28,
            baseColor: '#d3d3d3', // Light grey
            activeColor: '#EC4A08', // Novartis Orange
            proximity: 150,
            speedTrigger: 100,
            shockRadius: 250,
            shockStrength: 5,
            maxSpeed: 5000,
            resistance: 750,
            returnDuration: 1.5
        };

        this.dots = [];
        this.pointer = { x: 0, y: 0, vx: 0, vy: 0, speed: 0, lastTime: 0, lastX: 0, lastY: 0 };
        this.rafId = null;

        this.init();
        this.bindEvents();
    }

    hexToRgb(hex) {
        const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        return m ? {
            r: parseInt(m[1], 16),
            g: parseInt(m[2], 16),
            b: parseInt(m[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    init() {
        this.baseRgb = this.hexToRgb(this.config.baseColor);
        this.activeRgb = this.hexToRgb(this.config.activeColor);
        this.buildGrid();
        this.draw();
    }

    buildGrid() {
        const parent = this.canvas.parentElement;
        const rect = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
        this.ctx.scale(dpr, dpr);

        const cols = Math.floor((rect.width + this.config.gap) / (this.config.dotSize + this.config.gap));
        const rows = Math.floor((rect.height + this.config.gap) / (this.config.dotSize + this.config.gap));
        const cell = this.config.dotSize + this.config.gap;

        const gridW = cell * cols - this.config.gap;
        const gridH = cell * rows - this.config.gap;
        const startX = (rect.width - gridW) / 2 + this.config.dotSize / 2;
        const startY = (rect.height - gridH) / 2 + this.config.dotSize / 2;

        this.dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, active: false });
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const { x: px, y: py } = this.pointer;
        const proxSq = this.config.proximity * this.config.proximity;

        this.dots.forEach(dot => {
            const ox = dot.cx + dot.xOffset;
            const oy = dot.cy + dot.yOffset;
            const dx = dot.cx - px;
            const dy = dot.cy - py;
            const dsq = dx * dx + dy * dy;

            let color = this.config.baseColor;
            if (dsq <= proxSq) {
                const dist = Math.sqrt(dsq);
                const t = 1 - dist / this.config.proximity;
                const r = Math.round(this.baseRgb.r + (this.activeRgb.r - this.baseRgb.r) * t);
                const g = Math.round(this.baseRgb.g + (this.activeRgb.g - this.baseRgb.g) * t);
                const b = Math.round(this.baseRgb.b + (this.activeRgb.b - this.baseRgb.b) * t);
                color = `rgb(${r},${g},${b})`;
            }

            this.ctx.beginPath();
            this.ctx.arc(ox, oy, this.config.dotSize / 2, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        });

        this.rafId = requestAnimationFrame(() => this.draw());
    }

    bindEvents() {
        window.addEventListener('resize', () => this.buildGrid());
        
        let lastMove = 0;
        window.addEventListener('mousemove', (e) => {
            const now = performance.now();
            if (now - lastMove < 50) return;
            lastMove = now;

            const dt = this.pointer.lastTime ? now - this.pointer.lastTime : 16;
            const dx = e.clientX - this.pointer.lastX;
            const dy = e.clientY - this.pointer.lastY;
            
            let vx = (dx / dt) * 1000;
            let vy = (dy / dt) * 1000;
            let speed = Math.hypot(vx, vy);
            
            if (speed > this.config.maxSpeed) {
                const scale = this.config.maxSpeed / speed;
                vx *= scale;
                vy *= scale;
                speed = this.config.maxSpeed;
            }

            this.pointer.lastTime = now;
            this.pointer.lastX = e.clientX;
            this.pointer.lastY = e.clientY;
            
            const rect = this.canvas.getBoundingClientRect();
            this.pointer.x = e.clientX - rect.left;
            this.pointer.y = e.clientY - rect.top;

            this.dots.forEach(dot => {
                const dist = Math.hypot(dot.cx - this.pointer.x, dot.cy - this.pointer.y);
                if (speed > this.config.speedTrigger && dist < this.config.proximity && !dot.active) {
                    dot.active = true;
                    const pushX = dot.cx - this.pointer.x + vx * 0.005;
                    const pushY = dot.cy - this.pointer.y + vy * 0.005;
                    
                    gsap.killTweensOf(dot);
                    gsap.to(dot, {
                        xOffset: pushX,
                        yOffset: pushY,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            gsap.to(dot, {
                                xOffset: 0,
                                yOffset: 0,
                                duration: this.config.returnDuration,
                                ease: 'elastic.out(1,0.75)',
                                onComplete: () => dot.active = false
                            });
                        }
                    });
                }
            });
        });

        window.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;
            
            this.dots.forEach(dot => {
                const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
                if (dist < this.config.shockRadius && !dot.active) {
                    dot.active = true;
                    const falloff = Math.max(0, 1 - dist / this.config.shockRadius);
                    const pushX = (dot.cx - cx) * this.config.shockStrength * falloff;
                    const pushY = (dot.cy - cy) * this.config.shockStrength * falloff;
                    
                    gsap.killTweensOf(dot);
                    gsap.to(dot, {
                        xOffset: pushX,
                        yOffset: pushY,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            gsap.to(dot, {
                                xOffset: 0,
                                yOffset: 0,
                                duration: this.config.returnDuration,
                                ease: 'elastic.out(1,0.75)',
                                onComplete: () => dot.active = false
                            });
                        }
                    });
                }
            });
        });
    }
}
