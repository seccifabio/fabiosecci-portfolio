import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Add .step-name CSS block before @keyframes pulse
step_name_css = """        .step-name {
            font-family: var(--font-main);
            font-size: 1.6rem;
            font-weight: 500;
            color: #ffffff;
            margin: 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
        }

        @keyframes pulse {"""
content = content.replace('        @keyframes pulse {', step_name_css)

# 2. Fix the @media (max-width: 1200px) block
media_1200_fix = """        @media (max-width: 1200px) {
            .step-name {
                font-size: 1.4rem;
            }
        }"""
content = re.sub(r'        @media \(max-width: 1200px\) \{.*?        \}', media_1200_fix, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
