import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_str = '<strong style="color: var(--text-primary); font-size: 0.95rem;">${data.team}</strong>'
new_str = '<span style="color: var(--text-primary); font-size: 0.95rem; font-weight: 400;">${data.team}</span>'
content = content.replace(old_str, new_str)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
