import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace the path
old_path = r'<path class="animated-dotted-path" d="M 0,100 L 125,20 L 250,100 L 375,180 L 500,100 L 625,20 L 750,100 L 875,180 L 1000,100" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-dasharray="6,6"/>'
new_path = r'<path class="animated-dotted-path" d="M 0,100 Q 62.5,50 125,20 Q 187.5,50 250,100 Q 312.5,150 375,180 Q 437.5,150 500,100 Q 562.5,50 625,20 Q 687.5,50 750,100 Q 812.5,150 875,180 Q 937.5,150 1000,100" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-dasharray="6,6"/>'

content = content.replace(old_path, new_path)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
