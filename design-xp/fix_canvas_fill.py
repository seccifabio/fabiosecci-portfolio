import re

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'r') as f:
    content = f.read()

old_tick_chunk = """                ctx.fillStyle = grad;

                const crSq = config.cursorRadius * config.cursorRadius;
                const rad = config.dotRadius / 2;

                ctx.beginPath();

                for (let i = 0; i < len; i++) {"""

new_tick_chunk = """                ctx.fillStyle = grad;

                const crSq = config.cursorRadius * config.cursorRadius;
                const rad = config.dotRadius / 2;

                for (let i = 0; i < len; i++) {"""

content = content.replace(old_tick_chunk, new_tick_chunk)

old_draw = """                    if (config.sparkle) {
                        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
                        if ((hash % 100) < 3) {
                            const size = rad * 3.6;
                            ctx.rect(drawX - size/2, drawY - size/2, size, size);
                        } else {
                            ctx.rect(drawX - rad, drawY - rad, rad*2, rad*2);
                        }
                    } else {
                        ctx.rect(drawX - rad, drawY - rad, rad*2, rad*2);
                    }
                }

                ctx.fill();"""

new_draw = """                    if (config.sparkle) {
                        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
                        if ((hash % 100) < 3) {
                            const size = rad * 3.6;
                            ctx.fillRect(drawX - size/2, drawY - size/2, size, size);
                        } else {
                            ctx.fillRect(drawX - rad, drawY - rad, rad*2, rad*2);
                        }
                    } else {
                        ctx.fillRect(drawX - rad, drawY - rad, rad*2, rad*2);
                    }
                }"""

content = content.replace(old_draw, new_draw)

with open('/Users/fabiosecci/.gemini/antigravity/scratch/DesignXp/index.html', 'w') as f:
    f.write(content)
print("Fixed rect to fillRect.")
