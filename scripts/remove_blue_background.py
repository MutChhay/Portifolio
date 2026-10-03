from PIL import Image

source = r"C:\Users\USER\Documents\project\portfolio\src\assets\hero.png"
out = r"C:\Users\USER\Documents\project\portfolio\src\assets\hero-cutout.png"

img = Image.open(source).convert("RGBA")
width, height = img.size
pixels = img.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        is_blue_background = (
            b > 180 and r < 170 and g < 170 and (b - max(r, g) > 20)
        )
        if is_blue_background:
            pixels[x, y] = (255, 255, 255, 0)

img.save(out)
print(f"Saved transparent cutout to: {out}")
