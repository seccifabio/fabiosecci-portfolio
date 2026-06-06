import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Replace the introClaim HTML with pre-split span words
old_html = """            <!-- Layer A: Intro Claim -->
            <div id="introClaim" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 0; pointer-events: none; padding: 0 5%; transform: translateY(30px);">
                <h3 style="font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 800; color: #1a1a1a; margin-bottom: 1.5rem; letter-spacing: -0.02em;">We are a <span style="color: var(--novartis-primary);">force multiplier</span> for Novartis.</h3>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 300; color: #666; max-width: 900px; margin-bottom: 1rem; line-height: 1.5;">Designing experiences that empower faster, smarter, and more confident work.</p>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 300; color: #666; max-width: 800px; line-height: 1.5;">By removing friction, we unlock the organization's full potential.</p>
            </div>"""

new_html = """            <!-- Layer A: Intro Claim -->
            <div id="introClaim" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 1; pointer-events: none; padding: 0 5%; transform: translateY(0);">
                <h3 style="font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 800; color: #1a1a1a; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
                    <span class="claim-word" style="display:inline-block;">We</span> <span class="claim-word" style="display:inline-block;">are</span> <span class="claim-word" style="display:inline-block;">a</span> 
                    <span class="claim-word" style="display:inline-block; color: var(--novartis-primary);">force</span> <span class="claim-word" style="display:inline-block; color: var(--novartis-primary);">multiplier</span> 
                    <span class="claim-word" style="display:inline-block;">for</span> <span class="claim-word" style="display:inline-block;">Novartis.</span>
                </h3>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 300; color: #666; max-width: 900px; margin-bottom: 1rem; line-height: 1.5;">
                    <span class="claim-word" style="display:inline-block;">Designing</span> <span class="claim-word" style="display:inline-block;">experiences</span> <span class="claim-word" style="display:inline-block;">that</span> <span class="claim-word" style="display:inline-block;">empower</span> <span class="claim-word" style="display:inline-block;">faster,</span> <span class="claim-word" style="display:inline-block;">smarter,</span> <span class="claim-word" style="display:inline-block;">and</span> <span class="claim-word" style="display:inline-block;">more</span> <span class="claim-word" style="display:inline-block;">confident</span> <span class="claim-word" style="display:inline-block;">work.</span>
                </p>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 300; color: #666; max-width: 800px; line-height: 1.5;">
                    <span class="claim-word" style="display:inline-block;">By</span> <span class="claim-word" style="display:inline-block;">removing</span> <span class="claim-word" style="display:inline-block;">friction,</span> <span class="claim-word" style="display:inline-block;">we</span> <span class="claim-word" style="display:inline-block;">unlock</span> <span class="claim-word" style="display:inline-block;">the</span> <span class="claim-word" style="display:inline-block;">organization's</span> <span class="claim-word" style="display:inline-block;">full</span> <span class="claim-word" style="display:inline-block;">potential.</span>
                </p>
            </div>"""

content = content.replace(old_html, new_html)

# 2. Update GSAP Timeline
old_js = """            gsap.set('.nav-logo', { opacity: 0 });
            gsap.set('#scrollIndicator', { opacity: 0 });
            gsap.set([svcWord1, svcWord2], { y: '110%', opacity: 0, visibility: 'hidden' });

            // ---- PHASE 0: Intro Claim & Billboard Entrance ----
            const entranceTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.services-scroll-stage',
                    start: 'top 80%',
                    once: true
                }
            });
            
            entranceTl
                // Show intro claim
                .to('#introClaim', { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' })
                // Hold
                .to('#introClaim', { opacity: 1, duration: 2.5 })
                // Blur and fade out
                .to('#introClaim', { opacity: 0, filter: 'blur(10px)', y: -20, duration: 1.2, ease: 'power2.inOut' })
                // Show DESIGN XP and UI elements (force from 110% to prevent early visibility)
                .fromTo(svcWord1, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=0.5')
                .fromTo(svcWord2, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=1.0')
                .to('.nav-logo', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=1.0')
                .to('#scrollIndicator', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=1.0');"""

new_js = """            gsap.set([svcWord1, svcWord2], { y: '110%', opacity: 0, visibility: 'hidden' });
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
                .to('#scrollIndicator', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.8');"""

content = content.replace(old_js, new_js)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
