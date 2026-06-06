import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace font-size: clamp(3rem, 10vw, 8rem); with font-size: clamp(2.5rem, 4vw, 4rem);
content = content.replace('font-size: clamp(3rem, 10vw, 8rem);', 'font-size: clamp(2.5rem, 4vw, 4rem);')

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
