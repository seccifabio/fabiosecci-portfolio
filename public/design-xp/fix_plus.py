import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Update CSS for step-icon and steps layout
css_replacement = """        .approach-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            width: 100%;
            position: relative;
            z-index: 2;
            height: 200px;
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
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 0.3s ease;
        }

        .step-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.4);
            background: #1a1a1a;
            font-size: 1.2rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            transition: background 0.3s, color 0.3s, border-color 0.3s;
            z-index: 5;
        }

        .approach-step:nth-child(odd) .step-icon {
            top: calc(10% - 14px);
        }

        .approach-step:nth-child(even) .step-icon {
            top: calc(90% - 14px);
        }

        .approach-step:nth-child(odd) .step-name {
            margin-top: calc(10% - 50px);
        }

        .approach-step:nth-child(even) .step-name {
            margin-top: calc(90% + 20px);
        }
"""

content = re.sub(r'        \.approach-steps \{.*?\.approach-step:nth-child\(even\) \{\n            justify-content: flex-end;\n            padding-bottom: 0;\n        \}', css_replacement, content, flags=re.DOTALL)

# Now we need to remove the <span class="step-icon">+</span> from inside the <h3> and put it as a sibling
content = content.replace('<h3 class="step-name">Planning <span class="step-icon">+</span></h3>', '<h3 class="step-name">Planning</h3><span class="step-icon">+</span>')
content = content.replace('<h3 class="step-name">Seek and scope <span class="step-icon">+</span></h3>', '<h3 class="step-name">Seek and scope</h3><span class="step-icon">+</span>')
content = content.replace('<h3 class="step-name">Solution <span class="step-icon">+</span></h3>', '<h3 class="step-name">Solution</h3><span class="step-icon">+</span>')
content = content.replace('<h3 class="step-name">Sustain <span class="step-icon">+</span></h3>', '<h3 class="step-name">Sustain</h3><span class="step-icon">+</span>')

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
