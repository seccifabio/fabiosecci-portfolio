import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace .step-icon and .approach-step:hover .step-icon
css_replacement = """        .step-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #ffffff;
            background: #ffffff;
            color: var(--novartis-primary);
            font-size: 1.2rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            transition: background 0.3s, color 0.3s, border-color 0.3s;
            z-index: 5;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }

        .approach-step:hover .step-icon {
            animation: pulse 1.5s infinite;
        }"""

content = re.sub(r'        \.step-icon \{.*?\.approach-step:hover \.step-icon \{\n            background: #ffffff;\n            color: var\(--novartis-primary\);\n        \}', css_replacement, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
