import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_gsap_p = """        gsap.from('#principles > div', {
            scrollTrigger: {
                trigger: '#principles',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });"""

old_gsap_s = """        gsap.from('#standards > div', {
            scrollTrigger: {
                trigger: '#standards',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });"""

new_gsap = """        gsap.from('#unified-standards', {
            scrollTrigger: {
                trigger: '#unified-standards',
                start: 'top 85%',
                once: true
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });"""

content = content.replace(old_gsap_p, new_gsap)
content = content.replace(old_gsap_s, "")

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("GSAP updated.")
