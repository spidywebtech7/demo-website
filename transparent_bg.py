from PIL import Image

def remove_black(input_path, output_path, threshold=40):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        brightness = (item[0] * 0.299 + item[1] * 0.587 + item[2] * 0.114)
        if brightness < threshold:
            # Smooth fade to transparent for anti-aliasing
            alpha = int((brightness / threshold) * 255)
            newData.append((item[0], item[1], item[2], alpha))
        else:
            newData.append((item[0], item[1], item[2], 255))
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_black("images/logo.png", "images/logo.png")
print("Done")
