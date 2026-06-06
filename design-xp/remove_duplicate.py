import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

content = re.sub(r'        \.step-icon \{\n            display: inline-flex;\n            align-items: center;\n            justify-content: center;\n            width: 28px;\n            height: 28px;\n            border-radius: 50%;\n            border: 1px solid rgba\(255,255,255,0\.4\);\n            font-size: 1\.2rem;\n            margin-left: 0\.8rem;\n            transition: background 0\.3s, color 0\.3s;\n            font-weight: 400;\n        \}\n', '', content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
