from tkinter import *
from tkinter import ttk
from googletrans import Translator, LANGUAGES

# translate function
def change(text="type", src="en", dest="hi"):
    trans = Translator()
    result = trans.translate(text, src=src, dest=dest)
    return result.text

# button function
def data():
    s = comb1_sor.get()
    d = comb_dest.get()

    src_lang = list(LANGUAGES.keys())[list(LANGUAGES.values()).index(s.lower())]
    dest_lang = list(LANGUAGES.keys())[list(LANGUAGES.values()).index(d.lower())]

    message = sor_txt.get(1.0, END)

    textget = change(text=message, src=src_lang, dest=dest_lang)

    dest_txt.delete(1.0, END)
    dest_txt.insert(END, textget)


root = Tk()
root.title("Translator")
root.geometry("500x600")
root.config(bg="red")

lab_txt = Label(root, text="Translator", font=("Times New Roman", 30, "bold"), bg="red")
lab_txt.place(x=100, y=20, height=50, width=300)

# Source Label
src_label = Label(root, text="Source Text", font=("Times New Roman", 15, "bold"), bg="red")
src_label.place(x=10, y=80)

# Source Textbox
sor_txt = Text(root, font=("Times New Roman", 15), wrap=WORD)
sor_txt.place(x=10, y=120, height=150, width=480)

# Language List
list_text = list(LANGUAGES.values())

# Source Language
comb1_sor = ttk.Combobox(root, values=list_text)
comb1_sor.place(x=10, y=300, height=25, width=120)
comb1_sor.set("english")

# Destination Language
comb_dest = ttk.Combobox(root, values=list_text)
comb_dest.place(x=350, y=300, height=25, width=120)
comb_dest.set("hindi")

# Translate Button
Button_change = Button(root, text="Translate", command=data)
Button_change.place(x=200, y=300, height=30, width=100)

# Destination Label
dest_label = Label(root, text="Translated Text", font=("Times New Roman", 15, "bold"), bg="red")
dest_label.place(x=10, y=350)

# Destination Textbox
dest_txt = Text(root, font=("Times New Roman", 15), wrap=WORD)
dest_txt.place(x=10, y=380, height=150, width=480)

root.mainloop()