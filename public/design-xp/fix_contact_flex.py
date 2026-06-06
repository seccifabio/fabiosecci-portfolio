import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# First, let's revert all instances back to justify-content: center;
content = content.replace('justify-content: flex-start;', 'justify-content: center;')

# Now carefully update the .contact class
# The current contact block looks like:
#        .contact {
#            position: absolute;
#            inset: 0;
#            background: #ffffff;
#            z-index: 10;
#            display: flex;
#            flex-direction: column;
#            justify-content: center;
#            padding: 2rem 10%;

new_contact = """        .contact {
            position: absolute;
            inset: 0;
            background: #ffffff;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 10rem 10% 12rem 10%;"""

content = re.sub(r'        \.contact \{\s*position: absolute;\s*inset: 0;\s*background: #ffffff;\s*z-index: 10;\s*display: flex;\s*flex-direction: column;\s*justify-content: center;\s*padding: 2rem 10%;', new_contact, content)

# Remove the inline padding from the HTML
content = content.replace('<section class="team contact" id="team" style="padding-bottom: 12rem;">', '<section class="team contact" id="team">')

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
