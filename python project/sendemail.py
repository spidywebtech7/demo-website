import smtplib

server = smtplib.SMTP("smtp.gmail.com", 587)
server.ehlo()
server.starttls()

server.login("siddharthraval799@gmail.com", "Siddh@rth2178")

subject = "Test Python Mail"
body = "I love Python"

message = f"Subject: {subject}\n\n{body}"

receiver = [
    "2402112035@shreyarthuni.ac.in",
    "2402112038@shreyarthuni.ac.in"
]

server.sendmail("siddharthraval799@gmail.com", receiver, message)

print("Mail Sent Successfully")

server.quit()