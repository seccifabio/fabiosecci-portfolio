import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace the HTML for the Our approach title
new_title = """                    <h2 class="section-masked-title" style="margin-bottom: 6rem; font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 800; line-height: 0.9; letter-spacing: -0.03em;">
                        <span class="title-line-container" style="overflow: visible; display: inline-block;"><span class="title-line approach-title-line">Our approach</span></span><span style="display: inline-block; width: 0.18em; height: 0.18em; background-color: var(--novartis-primary); margin-left: 0.05em;"></span>
                    </h2>"""

content = re.sub(r'                    <h2 class="section-masked-title".*?</h2>', new_title, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
