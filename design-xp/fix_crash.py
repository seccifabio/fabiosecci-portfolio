import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Remove the preventScroll event listeners to see if they are causing the crash
old_js = """            function preventScroll(e) { e.preventDefault(); e.stopPropagation(); return false; }
            const blockScroll = () => {
                document.body.style.overflow = 'hidden';
                window.addEventListener('wheel', preventScroll, { passive: false });
                window.addEventListener('touchmove', preventScroll, { passive: false });
            };
            const unblockScroll = () => {
                document.body.style.overflow = '';
                window.removeEventListener('wheel', preventScroll);
                window.removeEventListener('touchmove', preventScroll);
            };"""

new_js = """            const blockScroll = () => {
                // Only use CSS to block scroll, avoiding aggressive event interceptors that might crash the browser
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            };
            const unblockScroll = () => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            };"""

content = content.replace(old_js, new_js)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
