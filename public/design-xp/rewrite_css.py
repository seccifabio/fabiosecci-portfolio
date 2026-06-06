import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Completely rewrite the CSS block for approach steps
css_rewrite = """        .approach-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            width: 100%;
            position: relative;
            z-index: 2;
            height: 200px;
            margin: 4rem 0;
        }

        .approach-step {
            position: relative;
            cursor: pointer;
        }

        .approach-step-content {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.3s ease;
        }

        .step-name {
            font-family: var(--font-main);
            font-size: 1.6rem;
            font-weight: 500;
            color: #ffffff;
            margin: 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: max-content;
            text-align: center;
            z-index: 10;
        }

        .step-icon {
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

        .approach-step:nth-child(odd) .step-icon {
            top: 6px;
        }

        .approach-step:nth-child(even) .step-icon {
            bottom: 6px;
        }

        .approach-step:nth-child(odd) .step-name {
            top: -40px;
        }

        .approach-step:nth-child(even) .step-name {
            bottom: -40px;
        }

        @keyframes pulse {"""

# We'll match from .approach-steps { to @keyframes pulse {
content = re.sub(r'        \.approach-steps \{.*?@keyframes pulse \{', css_rewrite, content, flags=re.DOTALL)

# Now, we also must completely remove the problematic media query max-width: 1200px
# that messes up the heights!
content = re.sub(r'        @media \(max-width: 1200px\) \{[\s\S]*?        \}\n', '', content)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
