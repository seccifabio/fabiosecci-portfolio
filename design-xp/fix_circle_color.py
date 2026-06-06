import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Make step name white
css_step_name = """        .step-name {
            font-family: var(--font-main);
            font-size: 1.6rem;
            font-weight: 500;
            color: #ffffff;
            margin: 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
        }"""
content = re.sub(r'        \.step-name \{.*?letter-spacing: -0\.02em;\n        \}', css_step_name, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
