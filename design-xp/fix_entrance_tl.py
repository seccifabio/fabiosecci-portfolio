import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace the entranceTl sequence with fromTo to ensure DESIGN XP stays hidden
old_js = """                // Show DESIGN XP and UI elements
                .to(svcWord1, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=0.5')
                .to(svcWord2, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=1.0')"""

new_js = """                // Show DESIGN XP and UI elements (force from 110% to prevent early visibility)
                .fromTo(svcWord1, { y: '110%' }, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=0.5')
                .fromTo(svcWord2, { y: '110%' }, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=1.0')"""

content = content.replace(old_js, new_js)

# Also force them down before the timeline starts to be absolutely safe
init_js_old = """            gsap.set('.nav-logo', { opacity: 0 });
            gsap.set('#scrollIndicator', { opacity: 0 });"""
            
init_js_new = """            gsap.set('.nav-logo', { opacity: 0 });
            gsap.set('#scrollIndicator', { opacity: 0 });
            gsap.set([svcWord1, svcWord2], { y: '110%' });"""
            
content = content.replace(init_js_old, init_js_new)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
