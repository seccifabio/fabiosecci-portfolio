import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Remove inline styles from HTML
old_html = """    <section class="partnership-contact" id="partnership" style="padding: 10rem 8%; background: var(--novartis-primary); color: #fff; text-align: center; margin: 10rem 8% 12rem 8%; border-radius: 64px;">"""
new_html = """    <section class="partnership-contact" id="partnership">"""
content = content.replace(old_html, new_html)

# Add CSS classes
css_to_add = """        .partnership-contact {
            padding: 10rem 8%; 
            background: var(--novartis-primary); 
            color: #fff; 
            text-align: center; 
            margin: 10rem 8% 12rem 8%; 
            border-radius: 64px;
        }
        @media (max-width: 768px) {
            .partnership-contact {
                margin: 6rem 0 0 0; /* Remove horizontal margins to cover full width */
                border-radius: 0; /* Remove rounded corners */
                padding: 6rem 6%;
            }
        }
    </style>"""

content = content.replace("    </style>", css_to_add)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
