import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Delete the #principles GSAP
content = re.sub(r'        gsap\.from\(\'#principles > div\', \{[\s\S]*?\}\);\n', '', content)

# Delete the #standards GSAP
content = re.sub(r'        gsap\.from\(\'#standards > div\', \{[\s\S]*?\}\);\n', '', content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("GSAP cleaned.")
