import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Add arrow to Open Form
old_btn = """        <a href="#" class="btn hover-target" style="background: #ffffff; color: var(--novartis-primary); padding: 1.5rem 3.5rem; font-size: 1.1rem; border: none; font-weight: 800; display: inline-flex; align-items: center; justify-content: center;">
            Open Form
        </a>"""
new_btn = """        <a href="#" class="btn hover-target" style="background: #ffffff; color: var(--novartis-primary); padding: 1.5rem 3.5rem; font-size: 1.1rem; border: none; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
            Open Form
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: translateY(-1px);"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>"""

content = content.replace(old_btn, new_btn)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
