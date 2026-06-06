import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Make the label bold again
old_label = '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--novartis-primary); display: block; margin-bottom: 0.4rem; font-weight: 500;">Collaborating Teams</span>'
new_label = '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--novartis-primary); display: block; margin-bottom: 0.4rem; font-weight: 800;">Collaborating Teams</span>'
content = content.replace(old_label, new_label)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
