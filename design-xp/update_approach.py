import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

css_replacement = """        .approach-steps {
            width: 100%;
            position: relative;
            z-index: 2;
            height: 200px;
            margin: 4rem 0;
        }

        .approach-step {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transform: translate(-50%, -50%);
        }
        
        .approach-step[data-step="1"] { left: 30%; top: 5%; }
        .approach-step[data-step="2"] { left: 30%; top: 95%; }
        .approach-step[data-step="3"] { left: 70%; top: 5%; }
        .approach-step[data-step="4"] { left: 70%; top: 95%; }

        .approach-step-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.3s ease;
        }"""

content = re.sub(r'\.approach-steps \{.*?\n        \}\n\n        \.approach-step-content \{.*?\}', css_replacement, content, flags=re.DOTALL)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
