import os
import urllib.request
import re
import time

icons = [
    "telephone", "house-door", "chevron-left", "chevron-right", "info-circle", 
    "calendar-event", "shield-check", "people", "rocket-takeoff", "bullseye", 
    "eye", "award", "heart", "clock-history", "handshake", "linkedin", 
    "twitter", "envelope", "instagram", "geo-alt", "clock", "chevron-up", 
    "map", "send", "person-badge", "clipboard2-check", "chat-dots", 
    "lightning", "cash", "person-plus", "calculator", "tools", "person-check", 
    "wrench-adjustable-circle", "wrench", "house-heart", "patch-check", 
    "gear-wide-connected", "facebook", "check-circle", "quote", "calendar3", 
    "search", "x", "filter", "pencil-square", "list-ol", "patch-question", 
    "envelope-at", "question-circle", "briefcase", "diagram-3", "safe", 
    "check-all", "arrow-repeat", "calendar", "person", "chat-quote", 
    "hand-thumbs-up", "google", "subway", "bus-front", "car-front", "check-circle-fill",
    "box-seam", "briefcase-fill", "building-check", "shield-shaded", "tools", "gear"
]

brand_color = "#1a3e6c"
output_dir = "icons"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

urls = [
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/icons/{icon}.svg",
    "https://raw.githubusercontent.com/twbs/icons/main/icons/{icon}.svg"
]

for icon in set(icons):
    success = False
    for url_template in urls:
        if success: break
        url = url_template.format(icon=icon)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    svg_content = response.read().decode('utf-8')
                    # Replace fill="currentColor" or add fill if missing
                    if 'fill="currentColor"' in svg_content:
                        svg_content = svg_content.replace('fill="currentColor"', f'fill="{brand_color}"')
                    elif 'fill="' in svg_content:
                        svg_content = re.sub(r'fill="[^"]+"', f'fill="{brand_color}"', svg_content)
                    else:
                        svg_content = svg_content.replace('<svg ', f'<svg fill="{brand_color}" ')
                    
                    with open(os.path.join(output_dir, f"{icon}.svg"), "w") as f:
                        f.write(svg_content)
                    print(f"Downloaded and colored: {icon}")
                    success = True
        except Exception as e:
            print(f"Failed to download {icon} from {url}: {e}")
            time.sleep(1) # Small delay before retry or next URL

print("Icon processing complete.")
