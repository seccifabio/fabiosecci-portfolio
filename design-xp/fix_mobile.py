import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

mobile_css = """        @media (max-width: 768px) {
            .approach-steps {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                min-height: auto;
                height: auto;
                margin: 2rem 0;
            }
            .approach-step {
                position: relative;
                transform: none;
                left: auto !important;
                top: auto !important;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }"""

content = re.sub(r'        @media \(max-width: 768px\) \{\n            \.approach-steps \{\n                grid-template-columns: 1fr;\n                gap: 1\.5rem 0;\n                min-height: auto;\n            \}', mobile_css, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
