
        const approachData = {
            1: { 
                title: "Planning", 
                text: "We start by deeply understanding your core objectives. We map out the entire project roadmap, allocate necessary resources, establish clear milestones, and align stakeholders to ensure a seamless transformation journey.",
                team: "Full Experience & Adoption team",
                bullets: [
                    "Strategy & Journey mapping: Defining business goals and mapping high-level pain points.",
                    "Architecture & Design: Auditing existing legacy systems and technical constraints.",
                    "Brand and communication: Aligning on visual identity and initial messaging expectations.",
                    "System Thinking & Collaboration: Setting up cross-functional workflows and stakeholder alignment."
                ]
            },
            2: { 
                title: "Seek and scope", 
                text: "We dive deep into the user experience. Through contextual inquiries and rigorous usability audits, we uncover hidden pain points to precisely define the exact scope of the final solution.",
                team: "User research & Insight",
                bullets: [
                    "Strategy & Journey mapping: Conducting deep user research to validate assumptions.",
                    "Architecture & Design: Defining component requirements and scalable structures.",
                    "Brand and communication: Planning internal advocacy and communication campaigns.",
                    "System Thinking & Collaboration: Aligning all teams on a precise, actionable project scope."
                ]
            },
            3: { 
                title: "Solution", 
                text: "With a clear blueprint in hand, we design, build, and rigorously refine the core experience. Our team engineers an intuitive, accessible, and high-performance solution that directly addresses the scoped challenges.",
                team: "User research & insight, Development, Adoption",
                bullets: [
                    "Strategy & Journey mapping: Validating UX flows and journeys with real users.",
                    "Architecture & Design: Building pixel-perfect interfaces and robust design systems.",
                    "Brand and communication: Crafting compelling visual assets and intuitive interactions.",
                    "System Thinking & Collaboration: Working hand-in-hand with development for seamless handoff."
                ]
            },
            4: { 
                title: "Sustain", 
                text: "Launching is just the beginning. We focus heavily on change management, providing comprehensive training materials and active support to ensure long-term user adoption and continuous growth.",
                team: "User research & insight, Adoption",
                bullets: [
                    "Strategy & Journey mapping: Measuring post-launch KPIs and iterating based on feedback.",
                    "Architecture & Design: Maintaining and expanding the core component library.",
                    "Brand and communication: Driving continuous adoption through internal marketing.",
                    "System Thinking & Collaboration: Providing ongoing support and closing the feedback loop."
                ]
            }
        };

        const serviceData = {
            1: {
                title: "Strategy & Journeys",
                text: "We map end-to-end user journeys to align business goals with user needs, uncovering hidden gaps, mapping dependencies across ecosystems, and defining clear strategic directions for your products.",
                bullets: [
                    "Problem Framing: Defining user needs, problem statements, and value propositions.",
                    "Journey Mapping: Visualizing current customer experiences and pain points.",
                    "Experience Visioning: Crafting the long-term, ideal future-state product vision.",
                    "Service Blueprinting: Mapping the internal systems and processes that support journeys.",
                    "Impact Assessment: Evaluating ideas based on user value and business impact.",
                    "Opportunity Prioritization: Translating future visions into actionable roadmap phases."
                ]
            },
            2: {
                title: "Architecture & Design",
                text: "We craft beautiful, high-fidelity interfaces and build robust design system components supported by scalable system architectures, ensuring a seamless and connected experience across all your digital platforms.",
                bullets: [
                    "High-Fidelity Interface Craft: Designing beautiful, polished, and visually stunning user interfaces.",
                    "Scalable UI Components: Building robust, reusable components that adapt to growth.",
                    "System Architecture Design: Structuring systemic design frameworks that integrate with code.",
                    "Cross-Platform Orchestration: Creating seamless, connected experiences across all digital platforms.",
                    "Rapid Strategic Prototyping: Building functional Proof-of-Concepts (POCs) to validate ideas early.",
                    "Engineering Feasibility Collaboration: Partnering directly with tech teams to ensure designs can be built."
                ]
            },
            3: {
                title: "Brand and communication",
                text: "We design stunning visual identities and compelling internal campaigns that deeply resonate with your teams and rapidly accelerate product adoption.",
                bullets: [
                    "Visual Identity Design: Crafting stunning, cohesive, and modern brand design languages.",
                    "Internal Campaign Creative: Designing high-impact visual campaigns that drive internal engagement and adoption.",
                    "Product Adoption Assets: Building promotional materials designed to accelerate growth and onboarding.",
                    "Asset Production Scaling: Delivering high-quality email layouts and digital media assets.",
                    "Self-Service Template Systems: Analyzing recurring needs to build reusable templates that empower teams to work independently."
                ]
            },
            4: {
                title: "System Thinking & Collaboration",
                text: "We partner closely with your teams to help you understand how we work and our approach in the different stages of the product creation life cycle, with the goal of improving and making efficient how we deliver the best experience together.",
                bullets: [
                    "Life Cycle Onboarding: Educating partner teams on design methodologies across all product creation stages.",
                    "Cross-Functional Collaboration: Partnering deeply with internal teams to build a shared language and alignment.",
                    "Workflow Efficiency Optimization: Analyzing existing development handoffs to eliminate operational friction.",
                    "Co-Creation Frameworks: Facilitating joint design sessions to ensure everyone contributes to the final experience.",
                    "Continuous Improvement Feedback: Establishing regular review loops to refine how teams deliver together"
                ]
            }
        };

        function openSidebar(step, type = 'approach') {
            const data = type === 'service' ? serviceData[step] : approachData[step];
            const bulletsHtml = data.bullets.map(b => {
                let formattedText = b;
                const colonIndex = b.indexOf(':');
                if (colonIndex !== -1) {
                    const title = b.substring(0, colonIndex + 1);
                    const rest = b.substring(colonIndex + 1);
                    formattedText = `<strong style="font-weight: 800; color: var(--text-primary);">${title}</strong>${rest}`;
                }
                return `<li style="margin-bottom: 0.8rem; font-weight: 400; display: flex; align-items: baseline; gap: 12px; line-height: 1.5;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: var(--novartis-primary); flex-shrink: 0; transform: translateY(-2px);"></span>
                    <span>${formattedText}</span>
                </li>`;
            }).join('');
            
            let ctaHtml = '';
            if (type === 'service') {
                ctaHtml = `<div style="margin-top: 3rem;"><a href="#partnership" class="drawer-cta-btn hover-target" onclick="closeSidebar()">Need Our Help? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></div>`;
            }
            let teamHtml = '';
            if (data.team) {
                teamHtml = `<div style="margin-top: 1.5rem; margin-bottom: 2rem; padding: 1rem 1.5rem; background: rgba(236, 74, 8, 0.05); border-left: 3px solid var(--novartis-primary); border-radius: 0 8px 8px 0;">
                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--novartis-primary); display: block; margin-bottom: 0.4rem; font-weight: 800;">Collaborating Teams</span>
                    <span style="color: var(--text-primary); font-size: 0.95rem; font-weight: 400;">${data.team}</span>
                </div>`;
            }
            
            document.getElementById('sidebarContent').innerHTML = `
                <h3>${data.title}</h3>
                <p style="margin-bottom: 2rem;">${data.text}</p>
                <ul style="list-style-type: none; padding-left: 0; margin-top: 1.5rem; margin-bottom: 2rem; color: var(--text-secondary);">
                    ${bulletsHtml}
                </ul>
                ${teamHtml}
                ${ctaHtml}
            `;
            document.getElementById('approachSidebar').classList.add('open');
            document.getElementById('sidebarOverlay').classList.add('open');
        }

        function closeSidebar() {
            document.getElementById('approachSidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.remove('open');
        }

        document.querySelectorAll('.approach-step').forEach(step => {
            step.addEventListener('click', () => {
                openSidebar(step.getAttribute('data-step'), 'approach');
            });
        });

        document.querySelectorAll('.svc-discover-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openSidebar(index + 1, 'service');
            });
        });
        document.querySelectorAll('a[href="#partnership"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
            
            // --- NEW GSAP SCROLL ANIMATIONS ---

        gsap.from('#principles > div', {
            scrollTrigger: {
                trigger: '#principles',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('#standards > div', {
            scrollTrigger: {
                trigger: '#standards',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('#partnership > *', {
            scrollTrigger: {
                trigger: '#partnership',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('#team .team-card', {
            scrollTrigger: {
                trigger: '#team',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
        });

        
            ScrollTrigger.refresh();
        });

        // FORM WIZARD LOGIC
        let currentStep = 1;
        const totalSteps = 4;

        function validateStep(step) {
            const stepEl = document.getElementById(`step${step}`);
            const inputs = stepEl.querySelectorAll('input, textarea, select');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    isValid = false;
                }
            });
            return isValid;
        }

        function updateIndicators(step) {
            document.querySelector('#stepIndicator span').innerText = `Step ${step} of ${totalSteps}`;
            const dots = document.querySelectorAll('.step-dot');
            dots.forEach((dot, index) => {
                if (index < step) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextStep(step) {
            if (!validateStep(currentStep)) return;
            
            const currentEl = document.getElementById(`step${currentStep}`);
            const nextEl = document.getElementById(`step${step}`);
            
            currentEl.style.opacity = '0';
            setTimeout(() => {
                currentEl.classList.remove('active');
                currentStep = step;
                nextEl.classList.add('active');
                updateIndicators(currentStep);
                void nextEl.offsetWidth; // force reflow
                nextEl.style.opacity = '1';
                if(window.ScrollTrigger) ScrollTrigger.refresh();
            }, 400);
        }

        function prevStep(step) {
            const currentEl = document.getElementById(`step${currentStep}`);
            const prevEl = document.getElementById(`step${step}`);
            
            currentEl.style.opacity = '0';
            setTimeout(() => {
                currentEl.classList.remove('active');
                currentStep = step;
                prevEl.classList.add('active');
                updateIndicators(currentStep);
                void prevEl.offsetWidth;
                prevEl.style.opacity = '1';
                if(window.ScrollTrigger) ScrollTrigger.refresh();
            }, 400);
        }

        function selectPriority(btnElement, value) {
            // Remove active from all chips
            const chips = document.querySelectorAll('.priority-chip');
            chips.forEach(chip => chip.classList.remove('active'));
            // Add active to clicked
            btnElement.classList.add('active');
            // Update hidden input
            document.getElementById('priorityLevel').value = value;
        }

        function submitWizardForm() {
            if (!validateStep(4)) return;
            
            const form = document.getElementById('partnerForm');
            const submitBtn = form.querySelector('button[onclick="submitWizardForm()"]');
            
            // Loading state
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            // Simulate API Call
            setTimeout(() => {
                // Show notification
                const notif = document.getElementById('submitNotification');
                notif.classList.add('show');
                
                // Reset form visually
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
                form.reset();
                
                // Reset priority chips visual state
                document.querySelectorAll('.priority-chip').forEach(chip => chip.classList.remove('active'));
                document.querySelector('.priority-chip[onclick*="High"]').classList.add('active');
                document.getElementById('priorityLevel').value = 'High';
                
                // Go back to step 1
                const currentEl = document.getElementById(`step${currentStep}`);
                const step1El = document.getElementById('step1');
                currentEl.style.opacity = '0';
                setTimeout(() => {
                    currentEl.classList.remove('active');
                    currentStep = 1;
                    step1El.classList.add('active');
                    updateIndicators(1);
                    void step1El.offsetWidth;
                    step1El.style.opacity = '1';
                    if(window.ScrollTrigger) ScrollTrigger.refresh();
                }, 400);

                // Hide notification after 5s
                setTimeout(() => {
                    notif.classList.remove('show');
                }, 5000);

            }, 1000);
        }
        
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
                const cols = Math.floor(w / step);
                const rows = Math.floor(h / step);
                const padX = (w % step) / 2;
                const padY = (h % step) / 2;
                
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

                    let drawX = d.sx;
                    let drawY = d.sy;
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

        // Fade out logo on scroll
        gsap.to('.nav-logo', {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.services-scroll-stage',
                start: 'top -100px',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate XP square continuously ticking
        function tickRotate() {
            gsap.to('.xp-square', {
                rotation: "+=20",
                duration: 0.4,
                ease: "power2.inOut",
                transformOrigin: "center center",
                onComplete: () => {
                    gsap.delayedCall(0.8, tickRotate);
                }
            });
        }
        tickRotate();

    