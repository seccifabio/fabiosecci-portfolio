import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# The current approachData block:
pattern = r"        const approachData = \{\n[\s\S]*?        \};\n\n        const serviceData ="

new_approach_data = """        const approachData = {
            1: { 
                title: "Planning", 
                text: "We start by deeply understanding your core objectives. We map out the entire project roadmap, allocate necessary resources, establish clear milestones, and align stakeholders to ensure a seamless transformation journey.",
                bullets: [
                    "Strategy & Journey mapping: Defining business goals and mapping high-level pain points.",
                    "Architecture & Design: Auditing existing legacy systems and technical constraints.",
                    "Brand and communication: Aligning on visual identity and initial messaging expectations.",
                    "System Thinking & Collaboration: Setting up cross-functional workflows and stakeholder alignment."
                ]
            },
            2: { 
                title: "Seek and scope", 
                text: "We dive deep into the user experience. Through contextual inquiries and rigorous usability audits, we uncover hidden pain points to precisely define the exact scope of the final solution.",
                bullets: [
                    "Strategy & Journey mapping: Conducting deep user research to validate assumptions.",
                    "Architecture & Design: Defining component requirements and scalable structures.",
                    "Brand and communication: Planning internal advocacy and communication campaigns.",
                    "System Thinking & Collaboration: Aligning all teams on a precise, actionable project scope."
                ]
            },
            3: { 
                title: "Solution", 
                text: "With a clear blueprint in hand, we design, build, and rigorously refine the core experience. Our team engineers an intuitive, accessible, and high-performance solution that directly addresses the scoped challenges.",
                bullets: [
                    "Strategy & Journey mapping: Validating UX flows and journeys with real users.",
                    "Architecture & Design: Building pixel-perfect interfaces and robust design systems.",
                    "Brand and communication: Crafting compelling visual assets and intuitive interactions.",
                    "System Thinking & Collaboration: Working hand-in-hand with development for seamless handoff."
                ]
            },
            4: { 
                title: "Sustain", 
                text: "Launching is just the beginning. We focus heavily on change management, providing comprehensive training materials and active support to ensure long-term user adoption and continuous growth.",
                bullets: [
                    "Strategy & Journey mapping: Measuring post-launch KPIs and iterating based on feedback.",
                    "Architecture & Design: Maintaining and expanding the core component library.",
                    "Brand and communication: Driving continuous adoption through internal marketing.",
                    "System Thinking & Collaboration: Providing ongoing support and closing the feedback loop."
                ]
            }
        };

        const serviceData ="""

content = re.sub(pattern, new_approach_data, content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
