import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace width="56" height="56" with width="40" height="40" only in the <svg> tags that have stroke="var(--novartis-primary)"
# We can just replace the specific strings we inserted previously.

# We inserted SVGs that look like:
# <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--novartis-primary)"

content = content.replace('width="56" height="56"', 'width="40" height="40"')

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
