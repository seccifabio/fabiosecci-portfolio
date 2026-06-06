
        // Register GSAP ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // --- CINEMATIC SQUIRCLE CURSOR ---
        // Proxy to track base cursor color without GSAP overwriting timeline tweens
        const cursorProxy = { color: "#EC4A08" };
        let isHovering = false;
        const cursorSquare = document.getElementById('cursorSquare');

        if (window.innerWidth > 768) {
            const fpX = gsap.quickTo(cursorSquare, "x", { duration: 0.08, ease: "power3.out" });
            const fpY = gsap.quickTo(cursorSquare, "y", { duration: 0.08, ease: "power3.out" });

            window.addEventListener("mousemove", (e) => {
                const mouse = { x: e.clientX, y: e.clientY };
                fpX(mouse.x);
                fpY(mouse.y);
                
                if (!isHovering) {
                    gsap.set("#cursorSquare", { display: "block" });
                }
            });

            // Hide custom cursor inside the partnership form
            const partnershipSection = document.getElementById('partnership');
            if (partnershipSection) {
                partnershipSection.addEventListener('mouseenter', () => {
                    gsap.set("#cursorSquare", { opacity: 0, display: "none" });
                });
                partnershipSection.addEventListener('mouseleave', () => {
                    gsap.set("#cursorSquare", { opacity: 1, display: "block" });
                });
            }

            // Interactive hovers for square cursor
            const hoverElements = document.querySelectorAll('.hover-target, a, button, .btn, .service-card, .stat-card, input, textarea, select');
            hoverElements.forEach(elem => {
                elem.addEventListener('mouseenter', (e) => {
                    isHovering = true;
                    const inContact = e.target.closest('.contact') !== null;
                    const inApproach = e.target.closest('.approach') !== null;
                    let hoverColor = "var(--novartis-primary-text)";
                    if (inApproach) hoverColor = "#ffffff";
                    if (inContact) hoverColor = "var(--novartis-primary)";

                    gsap.to(cursorSquare, {
                        scale: 1.8,
                        rotation: 45,
                        backgroundColor: hoverColor,
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
                elem.addEventListener('mouseleave', (e) => {
                    isHovering = false;
                    gsap.to(cursorSquare, {
                        scale: 1,
                        rotation: 0,
                        backgroundColor: cursorProxy.color,
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
            });
        }

        // --- SCROLL PROGRESS INDICATOR ---
        gsap.to(".scroll-progress", {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });



        // --- FLOATING BACKGROUND BLOBS ---
        gsap.to(".blob-1", {
            x: "random(-120, 120)",
            y: "random(-120, 120)",
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to(".blob-2", {
            x: "random(-100, 100)",
            y: "random(-100, 100)",
            duration: 16,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // --- HERO ENTRANCE STAGGERED REVEAL ---
        const tl = gsap.timeline();
        tl.fromTo(".hero-logo-centered img", { opacity: 0, y: -20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" })
          .fromTo(".tagline-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .to(".title-line", { translateY: "0%", duration: 1.2, stagger: 0.15, ease: "power4.out" }, "-=0.6")
          .fromTo(".hero-content p", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
          .fromTo(".hero-actions", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

        // --- PINNED TAGLINE MORPH TIMELINE ---
        const morphTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=1200", // Smooth scroll track length for morphing
                pin: true,
                scrub: true,
                anticipatePin: 1
            }
        });

        // Crossfade and translate Claim 1 (Tagline) and Claim 2 (Vision)
        morphTl.to(".hero-tagline-container", {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: "power2.inOut"
        })
        .fromTo(".hero-vision-container", 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            },
            "-=0.4" // Crossfade overlap
        );

        // --- NAVBAR SCROLL BLUR & TRANSFORMATION ---
        // Placed downstream of the hero scroll pinned timeline to ensure ScrollTrigger includes the 1200px pin-spacing in calculations
        ScrollTrigger.create({
            trigger: "#team",
            start: "top 150px", // Reveal top nav slightly in anticipation before entering the Orchestrators (Team) section viewport
            onEnter: () => {
                gsap.to("nav", {
                    opacity: 1,
                    pointerEvents: "auto",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.02)",
                    duration: 0.4,
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                gsap.to("nav", {
                    opacity: 0,
                    pointerEvents: "none",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid rgba(0, 0, 0, 0)",
                    boxShadow: "none",
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });

        // (3D card tilt removed — quadrant layout replaces service-grid-card)


        // Legacy mission reveal removed since it's merged into Hero Scroll Pinning

        // =============================================================
        // SERVICES SCROLL MORPH — 'I' from SERVICES → cross → quadrants
        // CSS sticky pins the stage. GSAP only animates (no pin spacer).
        // =============================================================
        if (window.innerWidth > 768) {
            const svcWord1     = document.getElementById('svcWord1');
            const svcWord2     = document.getElementById('svcWord2');
            const lettersLeft  = document.getElementById('lettersLeft');
            const letterI      = document.getElementById('letterI');
            const lettersRight = document.getElementById('lettersRight');
            const morphH       = document.getElementById('morpherH');
            
            // Precisely measure the "I" target center without scroll dependencies
            const wrap = document.querySelector('.services-pin-wrap');
            const wrapRect = wrap.getBoundingClientRect();
            
            // Temporarily clear entrance transform to measure accurate layout position
            const oldTransform = svcWord2.style.transform;
            svcWord2.style.transform = 'translateY(0)';
            
            const iRect = letterI.getBoundingClientRect();
            const targetX = (wrapRect.width / 2) - ((iRect.left - wrapRect.left) + iRect.width / 2);
            const targetY = (wrapRect.height / 2) - ((iRect.top - wrapRect.top) + iRect.height / 2);
            
            svcWord2.style.transform = oldTransform || '';

            // Hide elements initially so they can fade in with DESIGN XP
            gsap.set([svcWord1, svcWord2], { y: '110%', opacity: 0, visibility: 'hidden' });
            gsap.set('.claim-word', { opacity: 0, y: 20 });

            function preventScroll(e) { e.preventDefault(); e.stopPropagation(); return false; }
            const blockScroll = () => {
                document.body.style.overflow = 'hidden';
                window.addEventListener('wheel', preventScroll, { passive: false });
                window.addEventListener('touchmove', preventScroll, { passive: false });
            };
            const unblockScroll = () => {
                document.body.style.overflow = '';
                window.removeEventListener('wheel', preventScroll);
                window.removeEventListener('touchmove', preventScroll);
            };

            // ---- PHASE 0: Intro Claim & Billboard Entrance ----
            const entranceTl = gsap.timeline({
                onStart: blockScroll,
                onComplete: unblockScroll,
                scrollTrigger: {
                    trigger: '.services-scroll-stage',
                    start: 'top 80%',
                    once: true
                }
            });
            
            entranceTl
                // Hide logo/indicator while claim plays
                .to('.nav-logo, #scrollIndicator', { opacity: 0, duration: 0.3 }, 0)
                // Animate words cascading (Split Text effect)
                .to('.claim-word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, 0.2)
                // Hold
                .to('.claim-word', { opacity: 1, duration: 1.5 })
                // Blur and fade out whole block
                .to('#introClaim', { opacity: 0, filter: 'blur(10px)', y: -20, duration: 1.0, ease: 'power2.inOut' })
                // Show DESIGN XP and UI elements
                .fromTo(svcWord1, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=0.3')
                .fromTo(svcWord2, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=0.8')
                // Restore logo/indicator
                .to('.nav-logo', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.8')
                .to('#scrollIndicator', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.8');

            // ---- PHASE 1-3: Scroll-scrubbed morph, CSS sticky handles the pin ----
            const morphTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.services-scroll-stage',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.2
                }
            });

            // Step 1 (0-30%): all text exits
            morphTl
                .to('#scrollIndicator', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.inOut' }, 0)
                .set('#svcClip2', { overflow: 'visible' }, 0)
                .to(svcWord1,     { y: '-120%', duration: 1.2, ease: 'power3.in' }, 0)
                .to(lettersLeft,  { x: '-140%', opacity: 0, duration: 1.0, ease: 'power3.in' }, 0.1)
                .to(lettersRight, { x:  '140%', opacity: 0, duration: 1.0, ease: 'power3.in' }, 0.1);

            // Step 2 (25-65%): I slides to center then stretches — becomes the vertical line
            // No fade-out: quad backgrounds (z-index 6) cover it as they appear
            morphTl
                .to(letterI, {
                    x: targetX,
                    y: targetY,
                    duration: 1.0, ease: 'power3.inOut'
                }, 0.8)
                .to(letterI, { scaleX: 0.03, scaleY: 18, duration: 1.4, ease: 'power3.inOut' }, 1.2)
                // H bar explodes from center of the stretched I
                .to(morphH, { scaleX: 1, duration: 1.4, ease: 'power4.out' }, 2.1);

            // Step 3 (65-100%): quadrants fade in — their #F7F7F7 backgrounds bury the I naturally
            morphTl
                .to('#quad1', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 2.7)
                .to('#quad2', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 2.85)
                .to('#quad3', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 3.0)
                .to('#quad4', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 3.15);

            // The morpher-h stays visible as the horizontal divider between rows
            
            // Step 4 (100-115%): Pause briefly so user can read quads
            morphTl.to({}, {duration: 1.0}, 4.35);
            
            // Step 5 (115-140%): Fade out quads, shrink grid back to rectangle
            morphTl
                .to('.svc-quad', { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 5.35)
                .to(morphH, { scaleX: 0, duration: 1.0, ease: 'power3.inOut' }, 5.35)
                .to(letterI, { scaleX: 0.1, scaleY: 3, duration: 1.0, ease: 'power3.inOut' }, 5.35);

            // Step 6 (140-165%): Rectangle expands to fill screen using dedicated absolute div to prevent any layout shifts
            morphTl
                .set('#orangeExpander', { scale: 1 }, 6.35)
                .to(letterI, { opacity: 0, duration: 0.01 }, 6.35) // hide text I instantly
                .to('#orangeExpander', { scaleX: 2500, scaleY: 30, duration: 1.2, ease: 'power4.inOut' }, 6.35)
                .set('.approach', { pointerEvents: 'auto' }, 6.35)
                .to(cursorProxy, { 
                    color: '#ffffff', 
                    duration: 0.5, 
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        if (!isHovering) gsap.set('#cursorSquare', { backgroundColor: cursorProxy.color });
                    }
                }, 6.35)
                .to('.approach', { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, 6.95);

            // Step 7 (165-185%): Fade in approach header and stagger steps
            morphTl
                .fromTo('.approach-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 7.0)
                .fromTo('.approach-step', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, 7.2);

            // Step 8 (185-200%): Pause briefly so user can read approach
            morphTl.to({}, {duration: 1.0}, 8.2);

            // Step 9 (200-220%): Fade out approach, fade in contact background context
            morphTl
                .to('.approach-header', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.inOut' }, 9.2)
                .to('.approach-step', { opacity: 0, y: -20, duration: 0.6, stagger: 0.1, ease: 'power2.inOut' }, 9.3)
                .to(cursorProxy, { 
                    color: '#ffffff', 
                    duration: 0.6, 
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        if (!isHovering) gsap.set('#cursorSquare', { backgroundColor: cursorProxy.color });
                    }
                }, 9.3)


        } else {
            // Mobile: Simple, fluid scroll reveals instead of complex morph
            gsap.fromTo('.svc-quad', 
                { opacity: 0, y: 30 },
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.15, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.svc-quadrants',
                        start: 'top 85%',
                        once: true
                    }
                }
            );

            // Mobile approach fluid reveal
            gsap.set('.approach', {
                position: 'relative',
                pointerEvents: 'auto',
                padding: '4rem 6%',
                background: 'var(--novartis-primary)'
            });
            
            gsap.fromTo('.approach',
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.approach',
                        start: 'top 85%',
                        once: true
                    }
                }
            );
            
            gsap.fromTo('.approach-header',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.approach', start: 'top 85%', once: true } }
            );

            gsap.fromTo('.approach-step',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.approach', start: 'top 85%', once: true } }
            );
        }

        // --- GENERAL SCROLL REVEAL FOR SECTION HEADERS ---
        const revealElements = document.querySelectorAll('.reveal-element');
        revealElements.forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // --- SECTION MASKED TITLE REVEAL ---
        const maskedTitles = document.querySelectorAll('.section-masked-title');
        maskedTitles.forEach(title => {
            const lines = title.querySelectorAll('.title-line');
            gsap.fromTo(lines,
                { translateY: "100%" },
                {
                    translateY: "0%",
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // --- FORM SUBMIT STATE ---
        function handleFormSubmit(event) {
            event.preventDefault();
            const btn = document.querySelector('.form-submit-btn');
            const originalText = btn.textContent;
            btn.textContent = "Brief Request Sent ✓";
            
            gsap.to(btn, {
                backgroundColor: "#10b981", // Success Green
                scale: 1.05,
                duration: 0.3
            });
            
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('project').value = '';
            document.getElementById('message').value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                gsap.to(btn, {
                    backgroundColor: "var(--novartis-neutral-dark)",
                    scale: 1,
                    duration: 0.3
                });
            }, 3000);
            return false;
        }

        // --- DOT FIELD CANVAS BACKGROUND LOGIC ---
        (function() {
            const canvas = document.getElementById('dotFieldCanvas');
            const glowEl = document.getElementById('dotFieldCircle');
            if (!canvas) return;

            const ctx = canvas.getContext('2d', { alpha: true });
            if (!ctx) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            let resizeTimer;
            let dots = [];
            const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
            let rafId = null;
            const size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
            let glowOpacity = 0;
            let engagement = 0;

            const config = {
                dotRadius: 1.8,
                dotSpacing: 14,
                cursorRadius: 500,
                cursorForce: 0.1,
                bulgeOnly: true,
                bulgeStrength: 67,
                glowRadius: 160,
                sparkle: false,
                waveAmplitude: 0,
                gradientFrom: 'rgba(236, 74, 8, 0.5)', // Novartis Orange gradient
                gradientTo: 'rgba(236, 74, 8, 0.15)'    // Novartis Orange softer fade
            };

            function resize() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(doResize, 100);
            }

            function doResize() {
                const parent = canvas.parentElement;
                if (!parent) return;
                const rect = parent.getBoundingClientRect();
                const w = rect.width;
                const h = rect.height;

                canvas.width = w * dpr;
                canvas.height = h * dpr;
                canvas.style.width = `${w}px`;
                canvas.style.height = `${h}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

                size.w = w;
                size.h = h;
                size.offsetX = rect.left + scrollX;
                size.offsetY = rect.top + scrollY;

                buildDots(w, h);
            }

            function buildDots(w, h) {
                const step = config.dotRadius + config.dotSpacing;
                const bleed = 400; // Extra bleed for cinematic shift
                const startX = -bleed;
                const startY = -bleed;
                const endX = w + bleed;
                const endY = h + bleed;
                const cols = Math.floor((endX - startX) / step);
                const rows = Math.floor((endY - startY) / step);
                const padX = ((endX - startX) % step) / 2 + startX;
                const padY = ((endY - startY) % step) / 2 + startY;
                
                dots = [];
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const ax = padX + col * step + step / 2;
                        const ay = padY + row * step + step / 2;
                        dots.push({ ax, ay, sx: ax, sy: ax, vx: 0, vy: 0, x: ax, y: ay });
                    }
                }
            }

            function onMouseMove(e) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }

            function updateMouseSpeed() {
                const dx = mouse.prevX - mouse.x;
                const dy = mouse.prevY - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                mouse.speed += (dist - mouse.speed) * 0.5;
                if (mouse.speed < 0.001) mouse.speed = 0;
                mouse.prevX = mouse.x;
                mouse.prevY = mouse.y;
            }

            const speedInterval = setInterval(updateMouseSpeed, 20);
            let frameCount = 0;
            const TWO_PI = Math.PI * 2;

            function tick() {
                frameCount++;
                const t = frameCount * 0.02;
                const len = dots.length;

                const targetEngagement = Math.min(mouse.speed / 5, 1);
                engagement += (targetEngagement - engagement) * 0.06;
                if (engagement < 0.001) engagement = 0;

                glowOpacity += (engagement - glowOpacity) * 0.08;

                if (glowEl) {
                    glowEl.setAttribute('cx', String(mouse.x));
                    glowEl.setAttribute('cy', String(mouse.y));
                    glowEl.style.opacity = String(glowOpacity);
                }

                ctx.clearRect(0, 0, size.w, size.h);

                const grad = ctx.createLinearGradient(0, 0, size.w, size.h);
                grad.addColorStop(0, config.gradientFrom);
                grad.addColorStop(1, config.gradientTo);
                ctx.fillStyle = grad;

                const crSq = config.cursorRadius * config.cursorRadius;
                const rad = config.dotRadius / 2;

                ctx.beginPath();

                for (let i = 0; i < len; i++) {
                    const d = dots[i];
                    const dx = mouse.x - d.ax;
                    const dy = mouse.y - d.ay;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < crSq && engagement > 0.01) {
                        const dist = Math.sqrt(distSq);
                        if (config.bulgeOnly) {
                            const tVal = 1 - dist / config.cursorRadius;
                            const push = tVal * tVal * config.bulgeStrength * engagement;
                            const angle = Math.atan2(dy, dx);
                            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
                            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
                        } else {
                            const angle = Math.atan2(dy, dx);
                            const move = (500 / dist) * (mouse.speed * config.cursorForce);
                            d.vx += Math.cos(angle) * -move;
                            d.vy += Math.sin(angle) * -move;
                        }
                    } else if (config.bulgeOnly) {
                        d.sx += (d.ax - d.sx) * 0.1;
                        d.sy += (d.ay - d.sy) * 0.1;
                    }

                    if (!config.bulgeOnly) {
                        d.vx *= 0.9;
                        d.vy *= 0.9;
                        d.x = d.ax + d.vx;
                        d.y = d.ay + d.vy;
                        d.sx += (d.x - d.sx) * 0.1;
                        d.sy += (d.y - d.sy) * 0.1;
                    }

                    // Cinematic slow-mo shift (Amplified)
                    const panX = Math.sin(t * 0.25) * 350; 
                    const panY = Math.cos(t * 0.18) * 200;
                    let drawX = d.sx + panX;
                    let drawY = d.sy + panY;
                    if (config.waveAmplitude > 0) {
                        drawY += Math.sin(d.ax * 0.03 + t) * config.waveAmplitude;
                        drawX += Math.cos(d.ay * 0.03 + t * 0.7) * config.waveAmplitude * 0.5;
                    }

                    if (config.sparkle) {
                        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
                        if ((hash % 100) < 3) {
                            ctx.moveTo(drawX + rad * 1.8, drawY);
                            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
                        } else {
                            ctx.moveTo(drawX + rad, drawY);
                            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
                        }
                    } else {
                        ctx.moveTo(drawX + rad, drawY);
                        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
                    }
                }

                ctx.fill();
                rafId = requestAnimationFrame(tick);
            }

            doResize();
            window.addEventListener('resize', resize);
            window.addEventListener('mousemove', onMouseMove, { passive: true });
            rafId = requestAnimationFrame(tick);
        })();
    