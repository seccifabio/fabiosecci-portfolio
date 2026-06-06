import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_svg = """                <div class="scroll-indicator-swipe mweb-scroll-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2 2 2 0 0 0-2 2v12" />
                        <path d="M22 15.5a8 8 0 0 1-8 8H9a8 8 0 0 1-8-8v-3.5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v.5" />
                        <path d="M14 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2" />
                    </svg>
                </div>"""

new_svg = """                <div class="scroll-indicator-swipe mweb-scroll-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="m19 13-7 7-7-7"/></svg>
                </div>"""
content = content.replace(old_svg, new_svg)

old_anim = """        .scroll-indicator-swipe svg {
            animation: swipeUpGesture 2s infinite cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes swipeUpGesture {
            0% { transform: translateY(12px); opacity: 0; }
            20% { opacity: 1; }
            70% { transform: translateY(-15px); opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0; }
        }"""

new_anim = """        .scroll-indicator-swipe svg {
            animation: bounceArrow 2s infinite ease-in-out;
        }
        @keyframes bounceArrow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
        }"""
content = content.replace(old_anim, new_anim)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
