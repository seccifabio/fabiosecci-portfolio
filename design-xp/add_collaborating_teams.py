import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Update approachData to add the 'team' property
old_data_1 = 'title: "Planning", \n                text: "We start by deeply understanding your core objectives'
new_data_1 = 'title: "Planning", \n                text: "We start by deeply understanding your core objectives. We map out the entire project roadmap, allocate necessary resources, establish clear milestones, and align stakeholders to ensure a seamless transformation journey.",\n                team: "Full Experience & Adoption team",\n                bullets: [\n                    "Strategy & Journey mapping: Defining business goals and mapping high-level pain points.",\n                    "Architecture & Design: Auditing existing legacy systems and technical constraints.",\n                    "Brand and communication: Aligning on visual identity and initial messaging expectations.",\n                    "System Thinking & Collaboration: Setting up cross-functional workflows and stakeholder alignment."\n                ]\n            },'

# Let's use re.sub for safety
pattern_1 = r'title: "Planning", \n                text: "We start by deeply understanding your core objectives.*?\]\n            \},'
replacement_1 = """title: "Planning", 
                text: "We start by deeply understanding your core objectives. We map out the entire project roadmap, allocate necessary resources, establish clear milestones, and align stakeholders to ensure a seamless transformation journey.",
                team: "Full Experience & Adoption team",
                bullets: [
                    "Strategy & Journey mapping: Defining business goals and mapping high-level pain points.",
                    "Architecture & Design: Auditing existing legacy systems and technical constraints.",
                    "Brand and communication: Aligning on visual identity and initial messaging expectations.",
                    "System Thinking & Collaboration: Setting up cross-functional workflows and stakeholder alignment."
                ]
            },"""
content = re.sub(pattern_1, replacement_1, content, flags=re.DOTALL)

pattern_2 = r'title: "Seek and scope", \n                text: "We dive deep into the user experience.*?\]\n            \},'
replacement_2 = """title: "Seek and scope", 
                text: "We dive deep into the user experience. Through contextual inquiries and rigorous usability audits, we uncover hidden pain points to precisely define the exact scope of the final solution.",
                team: "User research & Insight",
                bullets: [
                    "Strategy & Journey mapping: Conducting deep user research to validate assumptions.",
                    "Architecture & Design: Defining component requirements and scalable structures.",
                    "Brand and communication: Planning internal advocacy and communication campaigns.",
                    "System Thinking & Collaboration: Aligning all teams on a precise, actionable project scope."
                ]
            },"""
content = re.sub(pattern_2, replacement_2, content, flags=re.DOTALL)

pattern_3 = r'title: "Solution", \n                text: "With a clear blueprint in hand.*?\]\n            \},'
replacement_3 = """title: "Solution", 
                text: "With a clear blueprint in hand, we design, build, and rigorously refine the core experience. Our team engineers an intuitive, accessible, and high-performance solution that directly addresses the scoped challenges.",
                team: "User research & insight, Development, Adoption",
                bullets: [
                    "Strategy & Journey mapping: Validating UX flows and journeys with real users.",
                    "Architecture & Design: Building pixel-perfect interfaces and robust design systems.",
                    "Brand and communication: Crafting compelling visual assets and intuitive interactions.",
                    "System Thinking & Collaboration: Working hand-in-hand with development for seamless handoff."
                ]
            },"""
content = re.sub(pattern_3, replacement_3, content, flags=re.DOTALL)

pattern_4 = r'title: "Sustain", \n                text: "Launching is just the beginning.*?\]\n            \}'
replacement_4 = """title: "Sustain", 
                text: "Launching is just the beginning. We focus heavily on change management, providing comprehensive training materials and active support to ensure long-term user adoption and continuous growth.",
                team: "User research & insight, Adoption",
                bullets: [
                    "Strategy & Journey mapping: Measuring post-launch KPIs and iterating based on feedback.",
                    "Architecture & Design: Maintaining and expanding the core component library.",
                    "Brand and communication: Driving continuous adoption through internal marketing.",
                    "System Thinking & Collaboration: Providing ongoing support and closing the feedback loop."
                ]
            }"""
content = re.sub(pattern_4, replacement_4, content, flags=re.DOTALL)


# 2. Update openSidebar to inject teamHtml
old_sidebar_code = """            document.getElementById('sidebarTitle').innerText = data.title;
            document.getElementById('sidebarText').innerText = data.text;
            
            document.getElementById('sidebarBullets').innerHTML = bulletsHtml + ctaHtml;"""

new_sidebar_code = """            document.getElementById('sidebarTitle').innerText = data.title;
            document.getElementById('sidebarText').innerText = data.text;
            
            let teamHtml = '';
            if (data.team) {
                teamHtml = `<div style="margin-top: 1.5rem; margin-bottom: 2rem; padding: 1rem 1.5rem; background: rgba(236, 74, 8, 0.05); border-left: 3px solid var(--novartis-primary); border-radius: 0 8px 8px 0;">
                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--novartis-primary); display: block; margin-bottom: 0.4rem; font-weight: 700;">Collaborating Teams</span>
                    <strong style="color: var(--text-primary); font-size: 0.95rem;">${data.team}</strong>
                </div>`;
            }
            
            document.getElementById('sidebarBullets').innerHTML = teamHtml + bulletsHtml + ctaHtml;"""
content = content.replace(old_sidebar_code, new_sidebar_code)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
