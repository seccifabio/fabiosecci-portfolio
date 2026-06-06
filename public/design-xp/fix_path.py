import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace the path
new_path = r"""<path class="animated-dotted-path" d="M 0,100 L 125,20 L 250,100 L 375,180 L 500,100 L 625,20 L 750,100 L 875,180 L 1000,100" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-dasharray="6,6"/>"""
content = re.sub(r'<path class="animated-dotted-path".*?Z" fill="none" stroke="rgba\(255,255,255,0\.6\)" stroke-width="2" stroke-dasharray="6,6"/>', new_path, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
