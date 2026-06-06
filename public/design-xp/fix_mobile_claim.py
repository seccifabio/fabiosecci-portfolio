import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# The block to extract and move
old_block = """        // =============================================================
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

            const blockScroll = () => {
                // Only use CSS to block scroll, avoiding aggressive event interceptors that might crash the browser
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            };
            const unblockScroll = () => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
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

            // ---- PHASE 1-3: Scroll-scrubbed morph, CSS sticky handles the pin ----"""

new_block = """        // =============================================================
        const svcWord1 = document.getElementById('svcWord1');
        const svcWord2 = document.getElementById('svcWord2');

        // ---- UNIVERSAL PHASE 0: Intro Claim & Billboard Entrance (Mobile + Desktop) ----
        gsap.set([svcWord1, svcWord2], { y: '110%', opacity: 0, visibility: 'hidden' });
        gsap.set('.claim-word', { opacity: 0, y: 20 });

        const blockScroll = () => {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        };
        const unblockScroll = () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };

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
            .to('.nav-logo, #scrollIndicator', { opacity: 0, duration: 0.3 }, 0)
            .to('.claim-word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, 0.2)
            .to('.claim-word', { opacity: 1, duration: 1.5 })
            .to('#introClaim', { opacity: 0, filter: 'blur(10px)', y: -20, duration: 1.0, ease: 'power2.inOut' })
            .fromTo(svcWord1, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=0.3')
            .fromTo(svcWord2, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=0.8')
            .to('.nav-logo', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.8')
            .to('#scrollIndicator', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.8');

        // =============================================================
        // SERVICES SCROLL MORPH (Desktop Only)
        // =============================================================
        if (window.innerWidth > 768) {
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

            // ---- PHASE 1-3: Scroll-scrubbed morph, CSS sticky handles the pin ----"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
        f.write(content)
    print("Successfully moved entranceTl out of the desktop-only block.")
else:
    print("Could not find the block to replace!")
