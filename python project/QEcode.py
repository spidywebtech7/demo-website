

# img=qr.make("https://www.youtube.com/watch?v=FOGRHBp6lvM&list=PLjVLYmrlmjGfAUdLiF2bQ-0l8SwNZ1sBl")
# img.save("youtube_wscubeproject.png")

import qrcode as qr
from PIL import Image

qrr = qr.QRCode(
    version=1,
    error_correction=qr.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qrr.add_data("https://shreyarthuni.ac.in/")
qrr.make(fit=True)

img = qrr.make_image(fill_color="red", back_color="blue")
img.save("shreyarth_uni_web.png")