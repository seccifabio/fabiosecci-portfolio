import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

css_replacement = """        .approach-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            width: 100%;
            position: relative;
            z-index: 2;
            min-height: 200px;
        }

        .approach-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            cursor: pointer;
        }

        .approach-step-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.3s ease;
        }"""

content = re.sub(r'\        \.approach-steps \{.*?\.approach-step-content \{\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            transition: transform 0\.3s ease;\n        \}', css_replacement, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
