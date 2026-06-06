import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Add animation for .team-grid children
pattern = r"        gsap\.from\('#partnership > \*', \{[\s\S]*?        \}\);"
addition = """        gsap.from('#partnership > *', {
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
        });"""

content = re.sub(pattern, addition, content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
