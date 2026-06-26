import sys
import os

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("rembg or Pillow not installed properly.")
    sys.exit(1)

input_path = "mascot.png"
output_path = "snoopy-blue/public/mascot.png"

# We just wait for the folder to exist
if not os.path.exists("snoopy-blue/public"):
    os.makedirs("snoopy-blue/public", exist_ok=True)

try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print("Successfully removed background and saved to", output_path)
except Exception as e:
    print("Error processing image:", e)
    sys.exit(1)
