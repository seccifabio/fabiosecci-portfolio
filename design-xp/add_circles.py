import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Add circles
new_svg_content = """                            <!-- Double Diamond Smooth Shape (Dotted Border) -->
                            <path class="animated-dotted-path" d="M 0,100 Q 62.5,50 125,20 Q 187.5,50 250,100 Q 312.5,150 375,180 Q 437.5,150 500,100 Q 562.5,50 625,20 Q 687.5,50 750,100 Q 812.5,150 875,180 Q 937.5,150 1000,100" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-dasharray="6,6"/>
                            <!-- Center Line -->
                            <path d="M 0,100 L 1000,100" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" />
                            <!-- Start and End Dots -->
                            <circle cx="0" cy="100" r="6" fill="#ffffff" />
                            <circle cx="1000" cy="100" r="6" fill="#ffffff" />"""

content = re.sub(r'                            <!-- Double Diamond Smooth Shape \(Dotted Border\) -->[\s\S]*?<!-- Arrows at nodes -->', new_svg_content, content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
