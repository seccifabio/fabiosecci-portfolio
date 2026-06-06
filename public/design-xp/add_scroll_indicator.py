import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Add CSS right before </style>
css_to_add = """
        .scroll-indicator-container {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 50;
            pointer-events: none;
            opacity: 1;
        }

        .scroll-indicator-text {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--text-primary);
        }

        .scroll-indicator-mouse {
            width: 26px;
            height: 42px;
            border: 2px solid var(--text-primary);
            border-radius: 20px;
            position: relative;
        }

        .scroll-indicator-wheel {
            width: 4px;
            height: 8px;
            background: var(--novartis-primary);
            border-radius: 2px;
            position: absolute;
            top: 6px;
            left: 50%;
            transform: translateX(-50%);
            animation: scrollWheel 1.5s infinite;
        }

        @keyframes scrollWheel {
            0% { top: 6px; opacity: 1; }
            100% { top: 22px; opacity: 0; }
        }
    </style>
"""
content = content.replace('    </style>', css_to_add)

# 2. Add HTML inside .services-pin-wrap
html_to_add = """
            <!-- Scroll Indicator -->
            <div class="scroll-indicator-container" id="scrollIndicator">
                <span class="scroll-indicator-text">Discover our services</span>
                <div class="scroll-indicator-mouse">
                    <div class="scroll-indicator-wheel"></div>
                </div>
            </div>

            <!-- Only the H bar -->"""
content = content.replace('            <!-- Only the H bar — the stretched \'I\' is the vertical line -->', html_to_add)

# 3. Add GSAP fade out in morphTl
gsap_original = """            // Step 1 (0-30%): all text exits
            morphTl
                .set('#svcClip2', { overflow: 'visible' }, 0)"""
gsap_new = """            // Step 1 (0-30%): all text exits
            morphTl
                .to('#scrollIndicator', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.inOut' }, 0)
                .set('#svcClip2', { overflow: 'visible' }, 0)"""
content = content.replace(gsap_original, gsap_new)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
