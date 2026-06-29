import pyttsx3
import speech_recognition as sr
import webbrowser
import datetime
import pyjokes
import time


def sptext():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        try:
            print("Recognizing...")
            data = recognizer.recognize_google(audio)
            return data.lower()

        except sr.UnknownValueError:
            print("Not understand")
            return ""


def speechtx(x):
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[1].id)
    engine.setProperty('rate', 150)
    engine.say(x)
    engine.runAndWait()


if __name__ == '__main__':

    text = sptext()   # listen first

    if "your name" in text:
        name = "My name is Peter"
        speechtx(name)
    
    elif "how old are you" in text:
        age = "i am two year old"
        speechtx(age)
    
    elif 'now time' in text:
        time = datetime.datetime.now().strftime("%I%M%p")
        speechtx(time)

    elif 'open youtube' in  text:
        webbrowser.open("https://www.youtube.com/")
        
    elif 'shreyarth' in text:
                webbrowser.open("https://shreyarthuni.ac.in/")

    elif "joke" in text:
        joke_1 = pyjokes.get_joke(language="en",category="neutral")
        speechtx(joke_1)
    else:
        speechtx("Thanks Siddharth")