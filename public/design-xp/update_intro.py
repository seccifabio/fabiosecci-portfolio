import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Inject HTML for introClaim
# Find: <!-- Layer B: Billboard text -->
pattern_html = r"            <!-- Layer B: Billboard text -->"
html_injection = """            <!-- Layer A: Intro Claim -->
            <div id="introClaim" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 0; pointer-events: none; padding: 0 5%; transform: translateY(30px);">
                <h3 style="font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 800; color: #fff; margin-bottom: 1.5rem; letter-spacing: -0.02em;">We are a <span style="color: var(--novartis-primary);">force multiplier</span> for Novartis.</h3>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 400; color: #ccc; max-width: 900px; margin-bottom: 1rem; line-height: 1.4;">Designing experiences that empower faster, smarter, and more confident work.</p>
                <p style="font-size: clamp(1rem, 1.5vw, 1.3rem); font-weight: 300; color: #888; max-width: 800px; line-height: 1.5;">By removing friction, we unlock the organization's full potential.</p>
            </div>

            <!-- Layer B: Billboard text -->"""
content = content.replace("            <!-- Layer B: Billboard text -->", html_injection)

# 2. Update GSAP Timeline
pattern_js = r"            // ---- PHASE 0: One-shot entrance when section scrolls into view ----[\s\S]*?                \.to\(svcWord2, \{ y: '0%', duration: 1\.2, ease: 'power4\.out' \}, '-=1\.0'\);"

js_replacement = """            // Hide elements initially so they can fade in with DESIGN XP
            gsap.set('.nav-logo', { opacity: 0 });
            gsap.set('#scrollIndicator', { opacity: 0 });

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
                // Show DESIGN XP and UI elements
                .to(svcWord1, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=0.5')
                .to(svcWord2, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=1.0')
                .to('.nav-logo', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=1.0')
                .to('#scrollIndicator', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=1.0');"""

content = re.sub(pattern_js, js_replacement, content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
