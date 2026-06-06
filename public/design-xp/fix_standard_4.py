import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_4 = """                <h3 style="font-size: 1.6rem; font-weight: 800; color: #1a1a1a; margin-bottom: 0.5rem; line-height: 1.2;">Universal Access</h3>
                <h4 style="font-size: 1.2rem; font-weight: 400; font-style: italic; color: var(--novartis-primary); margin-bottom: 1.5rem; letter-spacing: 0.02em;">&ldquo;Exclusion is a design failure.&rdquo;</h4>
                <p style="font-size: 1.05rem; color: #555; line-height: 1.7; font-weight: 400;">We design for the full spectrum of human ability from day one. Our tools are perceivable, operable, and robust for every colleague, ensuring that no mind is left out of the scientific process.</p>
            </div>

        </div>"""

new_4 = """                <h3 style="font-size: 1.6rem; font-weight: 800; color: #1a1a1a; margin-bottom: 0.5rem; line-height: 1.2;">Unified Ecosystem</h3>
                <h4 style="font-size: 1.2rem; font-weight: 400; font-style: italic; color: var(--novartis-primary); margin-bottom: 1.5rem; letter-spacing: 0.02em;">&ldquo;Predictable consistency scales value.&rdquo;</h4>
                <p style="font-size: 1.05rem; color: #555; line-height: 1.7; font-weight: 400;">We build connected experiences that feel like one cohesive tool. If users abandon legacy spreadsheets for our platforms, it proves we have built a predictable, scalable pattern.</p>
            </div>

        </div>"""

content = content.replace(old_4, new_4)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
