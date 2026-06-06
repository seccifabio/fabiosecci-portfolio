import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace the margin-left: calc(50% - 50vw); specifically in .services-pin-wrap
pattern = r"        \.services-pin-wrap \{\n            position: sticky;  /\* CSS sticky: zero layout shift, browser-native \*/\n            top: 0;\n            width: 100%;\n            margin-left: calc\(50% - 50vw\);"
replacement = r"        .services-pin-wrap {\n            position: sticky;  /* CSS sticky: zero layout shift, browser-native */\n            top: 0;\n            width: 100%;"

content = re.sub(pattern, replacement, content)

# Check if there are other calc(50% - 50vw)
content = content.replace('margin-left: calc(50% - 50vw);', '/* removed to prevent horizontal shift */')

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
