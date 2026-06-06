import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_js = """            document.getElementById('sidebarContent').innerHTML = `
                <h3>${data.title}</h3>
                <p style="margin-bottom: 2rem;">${data.text}</p>
                <ul style="list-style-type: none; padding-left: 0; margin-top: 1.5rem; margin-bottom: 2rem; color: var(--text-secondary);">
                    ${bulletsHtml}
                </ul>
                ${teamHtml}
                ${ctaHtml}
            `;"""

new_js = """            let currentStepNum = parseInt(step);
            let prevStep = currentStepNum > 1 ? currentStepNum - 1 : null;
            let nextStep = currentStepNum < 4 ? currentStepNum + 1 : null;
            
            let navHtml = `<div style="display: flex; justify-content: space-between; margin-top: 3rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 1.5rem;">`;
            if (prevStep) {
                navHtml += `<a href="#" onclick="event.preventDefault(); openSidebar('${prevStep}', '${type}')" style="display: flex; align-items: center; gap: 0.5rem; color: var(--novartis-primary); font-weight: 600; font-size: 0.95rem; text-decoration: none;" class="hover-target">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> Prev
                </a>`;
            } else {
                navHtml += `<div></div>`;
            }
            
            if (nextStep) {
                navHtml += `<a href="#" onclick="event.preventDefault(); openSidebar('${nextStep}', '${type}')" style="display: flex; align-items: center; gap: 0.5rem; color: var(--novartis-primary); font-weight: 600; font-size: 0.95rem; text-decoration: none;" class="hover-target">
                    Next <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>`;
            } else {
                navHtml += `<div></div>`;
            }
            navHtml += `</div>`;

            document.getElementById('sidebarContent').innerHTML = `
                <h3>${data.title}</h3>
                <p style="margin-bottom: 2rem;">${data.text}</p>
                <ul style="list-style-type: none; padding-left: 0; margin-top: 1.5rem; margin-bottom: 2rem; color: var(--text-secondary);">
                    ${bulletsHtml}
                </ul>
                ${teamHtml}
                ${ctaHtml}
                ${navHtml}
            `;"""

content = content.replace(old_js, new_js)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Sidebar navigation added.")
