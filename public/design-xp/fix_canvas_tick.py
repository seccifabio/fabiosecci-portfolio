import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_tick = """                    if (config.sparkle) {
                        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
                        if ((hash % 100) < 3) {
                            ctx.moveTo(drawX + rad * 1.8, drawY);
                            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
                        } else {
                            ctx.moveTo(drawX + rad, drawY);
                            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
                        }
                    } else {
                        ctx.moveTo(drawX + rad, drawY);
                        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
                    }"""

new_tick = """                    if (config.sparkle) {
                        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
                        if ((hash % 100) < 3) {
                            const size = rad * 3.6;
                            ctx.rect(drawX - size/2, drawY - size/2, size, size);
                        } else {
                            ctx.rect(drawX - rad, drawY - rad, rad*2, rad*2);
                        }
                    } else {
                        ctx.rect(drawX - rad, drawY - rad, rad*2, rad*2);
                    }"""

content = content.replace(old_tick, new_tick)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Optimized tick.")
