import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Move teamHtml below bulletsHtml
old_sidebar_inner = """                ${teamHtml}
                <ul style="list-style-type: none; padding-left: 0; margin-top: 1.5rem; color: var(--text-secondary);">
                    ${bulletsHtml}
                </ul>
                ${ctaHtml}"""
new_sidebar_inner = """                <ul style="list-style-type: none; padding-left: 0; margin-top: 1.5rem; margin-bottom: 2rem; color: var(--text-secondary);">
                    ${bulletsHtml}
                </ul>
                ${teamHtml}
                ${ctaHtml}"""

content = content.replace(old_sidebar_inner, new_sidebar_inner)

# 2. Add GSAP fade-in for principles and standards
# Find a good place to inject the new GSAP code. Right after the form validation logic or at the end of the script.
# Let's find: document.querySelectorAll('a[href="#partnership"]').forEach(link => {
pattern_gsap = r"        // FORM WIZARD LOGIC"
gsap_addition = """
        // Fade in Principles and Standards on scroll
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

        // FORM WIZARD LOGIC"""

content = content.replace("        // FORM WIZARD LOGIC", gsap_addition)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
