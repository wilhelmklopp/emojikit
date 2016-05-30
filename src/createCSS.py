import glob
import re

filepaths = glob.glob("../emoji/160x160/*.png")

images = []
for filepath in filepaths:
    image = filepath.replace("../emoji/160x160\\", "")
    images.append(image)
# print images

# get names
emojis = []
for image in images:
    noFileName = image.replace(".png", "")

    pattern = r'([0-9a-fA-F]{4,5})$'
    new_pattern = r'(?:-)([0-9a-fA-F]{4,5})?(?:-)?([0-9a-fA-F]{4,5})?(?:-)?([0-9a-fA-F]{4,5})?(?:-)?([0-9a-fA-F]{4,5})?(?:-)?([0-9a-fA-F]{4,5})?(?:-)?([0-9a-fA-F]{4,5})$'
    results = re.findall(new_pattern, noFileName)
    fullHexValue = "-"
    print noFileName, results[0]
    for idx, result in enumerate(results[0]):
        if idx+1 < len(results[0]) and result != "":
            fullHexValue += result + "-"
        else:
            fullHexValue += result
    print noFileName, fullHexValue

    emojiName = noFileName.replace(fullHexValue, "")
    emojis.append(emojiName)

images = []
for filepath in filepaths:
    image = filepath.replace("../emoji/160x160\\", "")
    images.append(image)


# overwrite everything in file and add top part
with open("../css/emojikit.css", "w") as f:
    top_part = "img.emojikit {\n" \
        + "    background-size: 16px 16px;\n" \
        + "    background-repeat: no-repeat;\n" \
        + "    width: 16px;\n" \
        + "    height: 16px; }\n\n"

    f.write(top_part)

baseurl = "../emoji/"
for idx, emoji in enumerate(emojis):
    # print emoji
    # print images[idx]
    with open("../css/emojikit.css", "a") as f:
        classToBeAdded = "\nimg.emojikit." + emoji + "{\n" \
        + "    background-image: url(\"" + baseurl + "16x16/" + images[idx] + "\");\n" \
        + "}\n"
        f.write(classToBeAdded)
