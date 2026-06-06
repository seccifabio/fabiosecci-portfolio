import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Find Principles Section
principles_match = re.search(r'<!-- DESIGN PRINCIPLES SECTION -->(.*?)<!-- OUR STANDARDS SECTION -->', content, re.DOTALL)
if not principles_match:
    print("Could not find principles section")
    exit(1)
principles_raw = principles_match.group(1).strip()

# Find Standards Section
standards_match = re.search(r'<!-- OUR STANDARDS SECTION -->(.*?)<!-- PARTNERSHIP CONTACT SECTION -->', content, re.DOTALL)
if not standards_match:
    print("Could not find standards section")
    exit(1)
standards_raw = standards_match.group(1).strip()

# 1. We need the content inside the "grid" divs.
p_grid_match = re.search(r'<div style="display: grid;[^>]*>(.*?)</div>\s*</section>', principles_raw, re.DOTALL)
s_grid_match = re.search(r'<div style="display: grid;[^>]*>(.*?)</div>\s*</section>', standards_raw, re.DOTALL)

p_content = p_grid_match.group(1) if p_grid_match else ""
s_content = s_grid_match.group(1) if s_grid_match else ""

# 2. Invert colors in p_content
# Replace color: #fff with color: #1a1a1a
p_content = p_content.replace('color: #fff;', 'color: #1a1a1a;')
# Replace color: #aaa with color: #555;
p_content = p_content.replace('color: #aaa;', 'color: #555;')
# Replace color: #666 with color: #888;
p_content = p_content.replace('color: #666;', 'color: #888;')

# 3. Create unified section
unified_section = f"""<!-- UNIFIED DESIGN PRINCIPLES & STANDARDS SECTION -->
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

        <div id="tab-principles" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6rem 4rem; max-width: 1400px; margin: 0 auto; opacity: 1; transition: opacity 0.4s ease;">
{p_content}
        </div>

        <div id="tab-standards" style="display: none; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6rem 4rem; max-width: 1400px; margin: 0 auto; opacity: 0; transition: opacity 0.4s ease;">
{s_content}
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
                    setTimeout(() => {{
                        standards.style.display = 'none';
                        principles.style.display = 'grid';
                        // Force reflow
                        void principles.offsetWidth;
                        principles.style.opacity = '1';
                        if(window.ScrollTrigger) ScrollTrigger.refresh();
                    }}, 300);
                }} else {{
                    // Update Switcher UI
                    bg.style.transform = 'translateX(calc(100% - 1rem))';
                    btnPrinciples.style.color = '#888';
                    btnStandards.style.color = '#1a1a1a';

                    // Crossfade
                    principles.style.opacity = '0';
                    setTimeout(() => {{
                        principles.style.display = 'none';
                        standards.style.display = 'grid';
                        // Force reflow
                        void standards.offsetWidth;
                        standards.style.opacity = '1';
                        if(window.ScrollTrigger) ScrollTrigger.refresh();
                    }}, 300);
                }}
            }}
        </script>
    </section>
"""

# Replace in content
start_marker = "<!-- DESIGN PRINCIPLES SECTION -->"
end_marker = "<!-- PARTNERSHIP CONTACT SECTION -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_content = content[:start_idx] + unified_section + "\n    " + content[end_idx:]

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(new_content)
print("Sections merged successfully.")
