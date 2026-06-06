import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Replace white text with black/dark gray for the claim
old_claim = """            <!-- Layer A: Intro Claim -->
            <div id="introClaim" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 0; pointer-events: none; padding: 0 5%; transform: translateY(30px);">
                <h3 style="font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 800; color: #fff; margin-bottom: 1.5rem; letter-spacing: -0.02em;">We are a <span style="color: var(--novartis-primary);">force multiplier</span> for Novartis.</h3>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 400; color: #ccc; max-width: 900px; margin-bottom: 1rem; line-height: 1.4;">Designing experiences that empower faster, smarter, and more confident work.</p>
                <p style="font-size: clamp(1rem, 1.5vw, 1.3rem); font-weight: 300; color: #888; max-width: 800px; line-height: 1.5;">By removing friction, we unlock the organization's full potential.</p>
            </div>"""

new_claim = """            <!-- Layer A: Intro Claim -->
            <div id="introClaim" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 10; opacity: 0; pointer-events: none; padding: 0 5%; transform: translateY(30px);">
                <h3 style="font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 800; color: #1a1a1a; margin-bottom: 1.5rem; letter-spacing: -0.02em;">We are a <span style="color: var(--novartis-primary);">force multiplier</span> for Novartis.</h3>
                <p style="font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 400; color: #333; max-width: 900px; margin-bottom: 1rem; line-height: 1.4;">Designing experiences that empower faster, smarter, and more confident work.</p>
                <p style="font-size: clamp(1rem, 1.5vw, 1.3rem); font-weight: 300; color: #666; max-width: 800px; line-height: 1.5;">By removing friction, we unlock the organization's full potential.</p>
            </div>"""

content = content.replace(old_claim, new_claim)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
