import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Force DESIGN XP to be completely invisible with opacity: 0 initially
old_js = """            gsap.set('.nav-logo', { opacity: 0 });
            gsap.set('#scrollIndicator', { opacity: 0 });
            gsap.set([svcWord1, svcWord2], { y: '110%' });"""

new_js = """            gsap.set('.nav-logo', { opacity: 0 });
            gsap.set('#scrollIndicator', { opacity: 0 });
            gsap.set([svcWord1, svcWord2], { y: '110%', opacity: 0, visibility: 'hidden' });"""

content = content.replace(old_js, new_js)

old_tl = """                .fromTo(svcWord1, { y: '110%' }, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=0.5')
                .fromTo(svcWord2, { y: '110%' }, { y: '0%', duration: 1.2, ease: 'power4.out' }, '-=1.0')"""

new_tl = """                .fromTo(svcWord1, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=0.5')
                .fromTo(svcWord2, { y: '110%', opacity: 0, visibility: 'hidden' }, { y: '0%', opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power4.out' }, '-=1.0')"""

content = content.replace(old_tl, new_tl)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
