import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Skip lines between 3717 (inclusive) and 3907 (inclusive)
    # Since enumerate is 0-indexed, line 3718 is index 3717
    if 3717 <= i <= 3907:
        continue
    new_lines.append(line)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.writelines(new_lines)

print("Deleted duplicate lines safely.")
