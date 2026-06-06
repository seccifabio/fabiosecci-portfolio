import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Pattern to remove the standalone gsap.fromTo for team-header
pattern = r"\s*gsap\.fromTo\(\['\.team-header', '\.team-grid'\],[\s\S]*?once: true\s*\}\s*\}\s*\);"

content = re.sub(pattern, '', content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
