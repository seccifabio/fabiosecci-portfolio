import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

# 1. Update .approach-sidebar CSS to be a flex container
old_sidebar_css = """        .approach-sidebar {
            position: fixed;
            top: 0;
            right: -40%;
            width: 40%;
            height: 100vh;
            background: #ffffff;
            z-index: 100000;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
            transition: right 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            padding: 4rem 3rem;
            overflow-y: auto;
            color: var(--text-primary);
        }"""

new_sidebar_css = """        .approach-sidebar {
            position: fixed;
            top: 0;
            right: -40%;
            width: 40%;
            height: 100vh;
            background: #ffffff;
            z-index: 100000;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
            transition: right 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            padding: 4rem 3rem 2rem 3rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            color: var(--text-primary);
        }
        .approach-sidebar-content {
            flex-grow: 1;
            overflow-y: auto;
            padding-right: 1rem;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        .approach-sidebar-nav {
            flex-shrink: 0;
            padding-top: 1.5rem;
            margin-top: 1.5rem;
            background: white;
        }"""

content = content.replace(old_sidebar_css, new_sidebar_css)

# Update mobile CSS padding so it doesn't break
old_mobile_sidebar = """            .approach-sidebar {
                width: 100%;
                right: -100%;
                padding: 3rem 2rem;
            }"""
new_mobile_sidebar = """            .approach-sidebar {
                width: 100%;
                right: -100%;
                padding: 3rem 2rem 2rem 2rem;
            }"""
content = content.replace(old_mobile_sidebar, new_mobile_sidebar)

# 2. Update the JS `openSidebar` to do a fade transition and separate the nav container
old_js = """            let navHtml = `<div style="display: flex; justify-content: space-between; margin-top: 3rem;">`;
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

new_js = """            let navHtml = `<div class="approach-sidebar-nav" style="display: flex; justify-content: space-between;">`;
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

            const contentEl = document.getElementById('sidebarContent');
            
            // Fade out
            contentEl.style.opacity = '0';
            
            setTimeout(() => {
                contentEl.innerHTML = `
                    <div style="flex-grow: 1;">
                        <h3>${data.title}</h3>
                        <p style="margin-bottom: 2rem;">${data.text}</p>
                        <ul style="list-style-type: none; padding-left: 0; margin-top: 1.5rem; margin-bottom: 2rem; color: var(--text-secondary);">
                            ${bulletsHtml}
                        </ul>
                        ${teamHtml}
                        ${ctaHtml}
                    </div>
                `;
                
                // Add the nav outside of the scrollable area if possible, or just keep it at the bottom of the DOM but we restructured CSS
                // Wait, if it's inside sidebarContent, then sidebarContent is the scrolling area.
                // We should append navHtml as a sibling to sidebarContent!
                
                // Remove any existing nav first
                const existingNav = document.getElementById('sidebarNavContainer');
                if (existingNav) existingNav.remove();
                
                const navContainer = document.createElement('div');
                navContainer.id = 'sidebarNavContainer';
                navContainer.innerHTML = navHtml;
                document.getElementById('approachSidebar').appendChild(navContainer);

                // Fade back in
                contentEl.style.opacity = '1';
                
                // Scroll to top
                contentEl.scrollTop = 0;
            }, 150);"""

content = content.replace(old_js, new_js)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Updated sticky nav and fade in")
