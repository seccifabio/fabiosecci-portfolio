import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# We need to find the unified section and rebuild it exactly.
start_marker = "<!-- UNIFIED DESIGN PRINCIPLES & STANDARDS SECTION -->"
end_marker = "<!-- PARTNERSHIP CONTACT SECTION -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

unified_html = content[start_idx:end_idx]

# Let's extract the principles content
# It starts at <!-- Principle 01 --> and ends at the div before <div id="tab-standards"
principles_content_match = re.search(r'(<!-- Principle 01 -->.*?)\s*</div>\s*<div id="tab-standards"', unified_html, re.DOTALL)
principles_content = principles_content_match.group(1) if principles_content_match else ""

# Let's extract the standards content
# It starts at <!-- Standard 01 --> and ends before </section>
standards_content_match = re.search(r'(<!-- Standard 01 -->.*?)\s*</div>\s*</section>', unified_html, re.DOTALL)
standards_content = standards_content_match.group(1) if standards_content_match else ""

fixed_unified = f"""<!-- UNIFIED DESIGN PRINCIPLES & STANDARDS SECTION -->
    <section class="design-standards" id="unified-standards" style="padding: 10rem 4%; background: #fafafa; position: relative;">
        
        <!-- Switcher UI -->
        <div style="text-align: center; margin-bottom: 4rem;">
            <div style="display: inline-flex; background: #eee; border-radius: 50px; padding: 0.5rem; position: relative;">
                <div id="switcherBg" style="position: absolute; top: 0.5rem; bottom: 0.5rem; left: 0.5rem; width: 50%; background: #fff; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);"></div>
                <button id="btn-principles" onclick="switchTab('principles')" style="position: relative; z-index: 1; border: none; background: transparent; padding: 1rem 2rem; font-size: 1.1rem; font-weight: 700; color: #1a1a1a; cursor: pointer; border-radius: 50px; transition: color 0.3s;">
                    Design Principles
                </button>
                <button id="btn-standards" onclick="switchTab('standards')" style="position: relative; z-index: 1; border: none; background: transparent; padding: 1rem 2rem; font-size: 1.1rem; font-weight: 700; color: #888; cursor: pointer; border-radius: 50px; transition: color 0.3s;">
                    Our Standards
                </button>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; max-width: 1400px; margin: 0 auto; position: relative;">
            
            <div id="tab-principles" style="grid-column: 1; grid-row: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6rem 4rem; opacity: 1; visibility: visible; transition: opacity 0.4s ease, visibility 0.4s; z-index: 2;">
{principles_content}
            </div>

            <div id="tab-standards" style="grid-column: 1; grid-row: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6rem 4rem; opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s; z-index: 1;">
{standards_content}
            </div>

        </div>

        <script>
            function switchTab(tab) {{
                const principles = document.getElementById('tab-principles');
                const standards = document.getElementById('tab-standards');
                const btnPrinciples = document.getElementById('btn-principles');
                const btnStandards = document.getElementById('btn-standards');
                const bg = document.getElementById('switcherBg');

                if (tab === 'principles') {{
                    // Update Switcher UI
                    bg.style.transform = 'translateX(0)';
                    btnPrinciples.style.color = '#1a1a1a';
                    btnStandards.style.color = '#888';

                    // Crossfade
                    standards.style.opacity = '0';
                    standards.style.visibility = 'hidden';
                    standards.style.zIndex = '1';
                    
                    principles.style.visibility = 'visible';
                    principles.style.zIndex = '2';
                    principles.style.opacity = '1';
                }} else {{
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
                    standards.style.opacity = '1';
                }}
            }}
        </script>
    </section>
"""

new_full_content = content[:start_idx] + fixed_unified + content[end_idx:]

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(new_full_content)

print("Fixed HTML structure.")
