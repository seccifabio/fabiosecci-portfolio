import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Inner paths of Principle 02
p2_inner = """<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>"""

# Inner paths of Principle 03
p3_inner = """<circle cx="16" cy="4" r="1"></circle><path d="m18 19 1-7-6 1"></path><path d="m5 8 3-3 5.5 3-2.36 3.5"></path><path d="M4.24 14.5a5 5 0 0 0 6.88 6"></path><path d="M13.76 17.5a5 5 0 0 0-6.88-6"></path>"""

# Create unique placeholders so we don't double replace
content = content.replace(p2_inner, "%%P2_PLACEHOLDER%%")
content = content.replace(p3_inner, "%%P3_PLACEHOLDER%%")

# Swap them
content = content.replace("%%P2_PLACEHOLDER%%", p3_inner)
content = content.replace("%%P3_PLACEHOLDER%%", p2_inner)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Icons swapped.")
