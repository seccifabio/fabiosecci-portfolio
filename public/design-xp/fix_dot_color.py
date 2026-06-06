import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Change the background-color of the dot from var(--novartis-primary) to #ffffff in the approach title
content = content.replace('<span style="display: inline-block; width: 0.18em; height: 0.18em; background-color: var(--novartis-primary); margin-left: 0.05em;"></span>\n                    </h2>', '<span style="display: inline-block; width: 0.18em; height: 0.18em; background-color: #ffffff; margin-left: 0.05em;"></span>\n                    </h2>')

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
