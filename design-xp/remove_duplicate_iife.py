import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if i == 3718 and "(function() {" in line:
        skip = True
    
    if skip and "        })();" in line and i < 3915 and i > 3850:
        skip = False
        continue
    
    if not skip:
        new_lines.append(line)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.writelines(new_lines)
print("Duplicate removed.")
