import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Fix .svc-billboard to take up 100vh on mobile so it pushes the quadrants out of the viewport
old_css = """        @media (max-width: 1024px) {
            .svc-billboard {
                position: relative;
                padding: 10rem 6% 4rem 6%; /* Increased top padding for breathing room */
                min-height: auto;
            }"""

new_css = """        @media (max-width: 1024px) {
            .svc-billboard {
                position: relative;
                padding: 0 6%;
                min-height: 100vh;
            }"""

if old_css in content:
    content = content.replace(old_css, new_css)
    with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
        f.write(content)
    print("Fixed billboard height successfully.")
else:
    print("Could not find the CSS block to replace!")
