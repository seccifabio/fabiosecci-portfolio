import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

replacements = {
    # Approach
    'text: "We start by deeply understanding your core objectives. We map out the entire project roadmap, allocate necessary resources, establish clear milestones, and align stakeholders to ensure a seamless transformation journey."':
    'text: "We deeply understand your objectives, map the roadmap, and align stakeholders to ensure a seamless transformation."',

    'text: "We dive deep into the user experience. Through contextual inquiries and rigorous usability audits, we uncover hidden pain points to precisely define the exact scope of the final solution."':
    'text: "Through rigorous usability audits, we uncover hidden pain points to precisely define the exact scope of the final solution."',

    'text: "With a clear blueprint in hand, we design, build, and rigorously refine the core experience. Our team engineers an intuitive, accessible, and high-performance solution that directly addresses the scoped challenges."':
    'text: "We design, build, and rigorously refine an intuitive, accessible, and high-performance solution that addresses your challenges."',

    'text: "Launching is just the beginning. We focus heavily on change management, providing comprehensive training materials and active support to ensure long-term user adoption and continuous growth."':
    'text: "We focus heavily on change management, providing training and active support to ensure long-term user adoption and continuous growth."',

    # Services
    'text: "We map end-to-end user journeys to align business goals with user needs, uncovering hidden gaps, mapping dependencies across ecosystems, and defining clear strategic directions for your products."':
    'text: "We map end-to-end user journeys to align business goals with user needs and define clear strategic product directions."',

    'text: "We craft beautiful, high-fidelity interfaces and build robust design system components supported by scalable system architectures, ensuring a seamless and connected experience across all your digital platforms."':
    'text: "We craft high-fidelity interfaces and robust design systems for a seamless, connected experience across all digital platforms."',

    'text: "We design stunning visual identities and compelling internal campaigns that deeply resonate with your teams and rapidly accelerate product adoption."':
    'text: "We design stunning visual identities and compelling campaigns that resonate with teams and accelerate product adoption."',

    'text: "We partner closely with your teams to help you understand how we work and our approach in the different stages of the product creation life cycle, with the goal of improving and making efficient how we deliver the best experience together."':
    'text: "We partner with your teams across the product lifecycle, improving efficiency and ensuring we deliver the best experience together."'
}

for old_text, new_text in replacements.items():
    content = content.replace(old_text, new_text)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Descriptions shortened.")
