import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace the HTML structure
old_html = r'<div id="tab-principles" style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 6rem 4rem; max-width: 1400px; margin: 0 auto; opacity: 1; transition: opacity 0\.4s ease;">(.*?)</div>\s*<div id="tab-standards" style="display: none; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 6rem 4rem; max-width: 1400px; margin: 0 auto; opacity: 0; transition: opacity 0\.4s ease;">(.*?)</div>'

new_html = r"""<div style="display: grid; grid-template-columns: 1fr; max-width: 1400px; margin: 0 auto; position: relative;">
            <div id="tab-principles" style="grid-column: 1; grid-row: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6rem 4rem; opacity: 1; visibility: visible; transition: opacity 0.4s ease, visibility 0.4s; z-index: 2;">\1</div>
            <div id="tab-standards" style="grid-column: 1; grid-row: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6rem 4rem; opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s; z-index: 1;">\2</div>
        </div>"""

content = re.sub(old_html, new_html, content, flags=re.DOTALL)

# Replace JS logic
old_js = r"""                    // Crossfade
                    standards.style.opacity = '0';
                    setTimeout\(\(\) => \{
                        standards.style.display = 'none';
                        principles.style.display = 'grid';
                        // Force reflow
                        void principles.offsetWidth;
                        principles.style.opacity = '1';
                        if\(window.ScrollTrigger\) ScrollTrigger.refresh\(\);
                    \}, 300\);
                \} else \{
                    // Update Switcher UI
                    bg.style.transform = 'translateX\(calc\(100% - 1rem\)\)';
                    btnPrinciples.style.color = '#888';
                    btnStandards.style.color = '#1a1a1a';

                    // Crossfade
                    principles.style.opacity = '0';
                    setTimeout\(\(\) => \{
                        principles.style.display = 'none';
                        standards.style.display = 'grid';
                        // Force reflow
                        void standards.offsetWidth;
                        standards.style.opacity = '1';
                        if\(window.ScrollTrigger\) ScrollTrigger.refresh\(\);
                    \}, 300\);"""

new_js = r"""                    // Crossfade
                    standards.style.opacity = '0';
                    standards.style.visibility = 'hidden';
                    standards.style.zIndex = '1';
                    
                    principles.style.visibility = 'visible';
                    principles.style.zIndex = '2';
                    principles.style.opacity = '1';
                } else {
                    // Update Switcher UI
                    bg.style.transform = 'translateX(calc(100% - 1rem))';
                    btnPrinciples.style.color = '#888';
                    btnStandards.style.color = '#1a1a1a';

                    // Crossfade
                    principles.style.opacity = '0';
                    principles.style.visibility = 'hidden';
                    principles.style.zIndex = '1';
                    
                    standards.style.visibility = 'visible';
                    standards.style.zIndex = '2';
                    standards.style.opacity = '1';"""

content = re.sub(old_js, new_js, content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Updated to prevent layout shift.")
