import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Update HTML
old_html = """                <div class="scroll-indicator-mouse">
                    <div class="scroll-indicator-wheel"></div>
                </div>"""
new_html = """                <div class="scroll-indicator-mouse desk-scroll-icon">
                    <div class="scroll-indicator-wheel"></div>
                </div>
                <div class="scroll-indicator-swipe mweb-scroll-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="m19 13-7 7-7-7"/></svg>
                </div>"""
content = content.replace(old_html, new_html)

# 2. Add base CSS for the new icon
old_css = """        @keyframes scrollWheel {"""
new_css = """        .mweb-scroll-icon {
            display: none;
            margin-top: 5px;
        }
        .scroll-indicator-swipe svg {
            animation: bounceArrow 2s infinite ease-in-out;
        }
        @keyframes bounceArrow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
        }
        @keyframes scrollWheel {"""
content = content.replace(old_css, new_css)

# 3. Add mobile visibility rules
mobile_css_target = """        @media (max-width: 1024px) {
            .scroll-indicator-container {"""
mobile_css_replacement = """        @media (max-width: 1024px) {
            .desk-scroll-icon { display: none !important; }
            .mweb-scroll-icon { display: block !important; }
            .scroll-indicator-container {"""
content = content.replace(mobile_css_target, mobile_css_replacement)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
