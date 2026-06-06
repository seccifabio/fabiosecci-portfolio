import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_text = "Submit your technology or asset proposal directly to our global business development team. Together, we can reimagine scientific possibilities."
new_text = "Fill in our E&A Team form in order to help us to assess your needs and come back to you with a direction and approach.<br><br>Thank you and talk soon."

content = content.replace(old_text, new_text)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
