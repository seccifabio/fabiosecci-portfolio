import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Remove contact class from team section
content = content.replace('<section class="team contact" id="team">', '<section class="team" id="team" style="padding: 10rem 4% 8rem 4%;">')

# 2. Extract the TEAM SECTION HTML
team_match = re.search(r'( {12}<!-- TEAM SECTION -->\s*<section class="team" id="team".*?</section>)', content, flags=re.DOTALL)
if team_match:
    team_html = team_match.group(1)
    
    # 3. Remove the team html from its current location
    content = content.replace(team_html, '')
    
    # 4. Insert it AFTER the closing divs of the pinned stage
    # Look for:
    #        </div>
    #    </div>
    #
    #    <!-- DESIGN PRINCIPLES SECTION -->
    insertion_point = """        </div>
    </div>

    <!-- DESIGN PRINCIPLES SECTION -->"""
    
    new_insertion = f"""        </div>
    </div>

{team_html}

    <!-- DESIGN PRINCIPLES SECTION -->"""
    
    content = content.replace(insertion_point, new_insertion)

# 5. Remove opacity CSS
content = re.sub(r'\s*\.team-header,\s*\.team-card\s*\{\s*opacity:\s*0;\s*transform:\s*translateY\(20px\);\s*\}', '', content)

# 6. Remove GSAP timeline steps for contact and team
# Find the morphTl section
# Step 10: .to('.approach', { opacity: 0 ...
gsap_remove_pattern = r"                \.to\('\.approach', \{ opacity: 0, duration: 0\.6, ease: 'power2\.inOut' \}, 10\.0\)\n                \.set\('\.approach', \{ pointerEvents: 'none' \}, 10\.5\)\n                \.set\('\.contact', \{ pointerEvents: 'auto' \}, 10\.5\)\n                \.to\('\.contact', \{ opacity: 1, duration: 0\.6, ease: 'power2\.inOut' \}, 10\.5\);\n\n            // Step 10 \(220-240%\): Fade in team content\n            morphTl\n                \.fromTo\('\.team-header', \{ opacity: 0, y: 20 \}, \{ opacity: 1, y: 0, duration: 0\.8, ease: 'power3\.out' \}, 11\.0\)\n                \.fromTo\('\.team-card', \{ opacity: 0, y: 20 \}, \{ opacity: 1, y: 0, duration: 0\.6, stagger: 0\.05, ease: 'power3\.out' \}, 11\.2\);"

content = re.sub(gsap_remove_pattern, '', content)

# Remove the mobile contact GSAP logic
mobile_gsap_pattern = r"            // Mobile contact fluid reveal\n            gsap\.set\('\.contact', \{\n                position: 'relative',\n                pointerEvents: 'auto',\n                padding: '4rem 6%',\n                background: '#ffffff'\n            \}\);\n            \n            gsap\.fromTo\('\.contact',\n                \{ opacity: 0 \},\n                \{\n                    opacity: 1,\n                    duration: 1\.0,\n                    ease: 'power2\.out',\n                    scrollTrigger: \{\n                        trigger: '\.contact',\n                        start: 'top 85%',\n                        once: true\n                    \}\n                \}\n            \);"

content = re.sub(mobile_gsap_pattern, '', content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
