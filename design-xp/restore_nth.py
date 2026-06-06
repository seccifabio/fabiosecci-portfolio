import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Add them back before @keyframes pulse
rules_to_add = """        .approach-step:nth-child(odd) .step-icon {
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

        @keyframes pulse {"""

content = content.replace('        @keyframes pulse {', rules_to_add)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
