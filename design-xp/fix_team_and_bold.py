import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Fix "Collaborating Teams" bold text
# Change font-weight: 600 to font-weight: 400
old_team_text = '<div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${data.team.join(\' &middot; \')}</div>'
new_team_text = '<div style="font-weight: 400; font-size: 0.95rem; color: var(--text-primary);">${data.team.join(\' &middot; \')}</div>'
content = content.replace(old_team_text, new_team_text)

# Also change the "Collaborating Teams" label to be less heavy if needed
old_label = '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--novartis-primary); display: block; margin-bottom: 0.4rem; font-weight: 700;">Collaborating Teams</span>'
new_label = '<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--novartis-primary); display: block; margin-bottom: 0.4rem; font-weight: 500;">Collaborating Teams</span>'
content = content.replace(old_label, new_label)

# 2. Fix the GSAP animations that are stuck at opacity: 0
# Extract them and move them into the load event listener
pattern = r"        // Fade in Principles and Standards on scroll(.*?)// FORM WIZARD LOGIC"
match = re.search(pattern, content, re.DOTALL)
if match:
    gsap_code = match.group(1)
    # Remove from original location
    content = content.replace(match.group(0), "        // FORM WIZARD LOGIC")
    
    # Inject right before the end of load event listener
    # The load event ends with:
    #             window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    #         });
    #     });
    # Let's just find "window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });\n            });\n        });"
    
    inject_target = """                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        });"""
    
    injected_code = f"""                window.scrollTo({{ top: document.body.scrollHeight, behavior: 'smooth' }});
            }});
            
            // --- NEW GSAP SCROLL ANIMATIONS ---
{gsap_code}
            ScrollTrigger.refresh();
        }});"""
    
    content = content.replace(inject_target, injected_code)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
