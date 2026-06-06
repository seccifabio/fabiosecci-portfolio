import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Fix introClaim layout so it anchors to the 100vh viewport, NOT the massive mobile container
old_claim_html = """<div id="introClaim" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 1; pointer-events: none; padding: 0 5%; transform: translateY(0);">"""

new_claim_html = """<div id="introClaim" style="position: absolute; top: 0; left: 0; right: 0; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 1; pointer-events: none; padding: 0 5%; transform: translateY(0);">"""

content = content.replace(old_claim_html, new_claim_html)

# 2. Fix scrollIndicator so it sits at the bottom of the 100vh viewport, NOT the bottom of the massive container
old_scroll_css = """        .scroll-indicator-container {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);"""

new_scroll_css = """        .scroll-indicator-container {
            position: absolute;
            top: calc(100vh - 80px);
            left: 50%;
            transform: translateX(-50%);"""

content = content.replace(old_scroll_css, new_scroll_css)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
