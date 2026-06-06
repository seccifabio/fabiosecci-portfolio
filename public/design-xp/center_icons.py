import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# For Principles (height: 100%)
old_principle = '<div style="position: relative; display: flex; flex-direction: column; height: 100%;">'
new_principle = '<div style="position: relative; display: flex; flex-direction: column; height: 100%; align-items: center; text-align: center;">'
content = content.replace(old_principle, new_principle)

# For Standards
old_standard = '<div style="position: relative; display: flex; flex-direction: column;">'
new_standard = '<div style="position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;">'
content = content.replace(old_standard, new_standard)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
