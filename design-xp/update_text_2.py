import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# Remove the "Thank you and talk soon." line.
old_text = "Fill in our E&A Team form in order to help us to assess your needs and come back to you with a direction and approach.<br><br>Thank you and talk soon."
new_text = "Fill in our E&A Team form in order to help us to assess your needs and come back to you with a direction and approach."

content = content.replace(old_text, new_text)

# Change "Submit a Proposal" button text
content = content.replace("Submit a Proposal", "Open Form")

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
