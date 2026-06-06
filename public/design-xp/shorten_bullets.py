import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_3 = """            3: {
                title: "Brand and communication",
                text: "We design stunning visual identities and compelling campaigns that resonate with teams and accelerate product adoption.",
                bullets: [
                    "Visual Identity Design: Crafting stunning, cohesive, and modern brand design languages.",
                    "Internal Campaign Creative: Designing high-impact visual campaigns that drive internal engagement and adoption.",
                    "Product Adoption Assets: Building promotional materials designed to accelerate growth and onboarding.",
                    "Asset Production Scaling: Delivering high-quality email layouts and digital media assets.",
                    "Self-Service Template Systems: Analyzing recurring needs to build reusable templates that empower teams to work independently."
                ]
            },"""

new_3 = """            3: {
                title: "Brand and communication",
                text: "We design visual identities and campaigns to accelerate product adoption.",
                bullets: [
                    "Visual Identity: Crafting modern brand design languages.",
                    "Internal Campaigns: Driving engagement and adoption.",
                    "Product Assets: Building materials for fast onboarding.",
                    "Asset Production: Delivering digital media and emails.",
                    "Templates: Building reusable templates for autonomy."
                ]
            },"""

content = content.replace(old_3, new_3)

old_4 = """            4: {
                title: "System Thinking & Collaboration",
                text: "We partner with your teams across the product lifecycle, improving efficiency and ensuring we deliver the best experience together.",
                bullets: [
                    "Life Cycle Onboarding: Educating partner teams on design methodologies across all product creation stages.",
                    "Cross-Functional Collaboration: Partnering deeply with internal teams to build a shared language and alignment.",
                    "Workflow Efficiency Optimization: Analyzing existing development handoffs to eliminate operational friction.",
                    "Co-Creation Frameworks: Facilitating joint design sessions to ensure everyone contributes to the final experience.",
                    "Continuous Improvement Feedback: Establishing regular review loops to refine how teams deliver together"
                ]
            }"""

new_4 = """            4: {
                title: "System Thinking & Collaboration",
                text: "We partner with your teams across the lifecycle to deliver the best experience together.",
                bullets: [
                    "Onboarding: Educating teams on design methodologies.",
                    "Collaboration: Building shared language and alignment.",
                    "Workflow Optimization: Eliminating operational friction.",
                    "Co-Creation: Joint sessions for shared contributions.",
                    "Continuous Improvement: Refining how teams deliver."
                ]
            }"""

content = content.replace(old_4, new_4)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Bullets shortened.")
