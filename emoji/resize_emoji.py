# Run this whenever new emoji are added to resize them to the relavant sizes
from PIL import Image
import glob
import os

# original = 160, 160
small = 16, 16
medium = 64, 64
large = 128, 128


for image in glob.glob("160x160/*.png"):
    filename = os.path.basename(image)

    small_image = Image.open(image)
    small_image.thumbnail(small)
    small_image.save("16x16/" + filename, "PNG")

    medium_image = Image.open(image)
    medium_image.thumbnail(medium)
    medium_image.save("64x64/" + filename, "PNG")

    large_image = Image.open(image)
    large_image.thumbnail(large)
    large_image.save("128x128/" + filename, "PNG")
