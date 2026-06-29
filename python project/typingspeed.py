# from time import *
# import random as r

# def mistake(partest, usertest):
#     error = 0
#     for i in range(len(partest)):
#         try:
#             if partest[i] != usertest[i]:
#                 error = error + 1
#         except:
#             error = error + 1
#     return error


# def speed_time(time_s, time_e, user_input):
#     time_delay = time_e - time_s
#     time_R = round(time_delay, 2)
#     speed = len(user_input) / time_R
#     return round(speed)


# test = ["Technology is changing the world faster than ever before. From smartphones and artificial intelligence to cybersecurity and cloud computing, modern innovations are transforming how people live, work, and communicate."]

# test1 = r.choice(test)

# print("***** Typing Speed Test *****")
# print()
# print(test1)
# print()

# time_1 = time()
# user_input = input("Enter: ")
# time_2 = time()

# print("Speed:", speed_time(time_1, time_2, user_input), "char/sec")
# print("Error:", mistake(test1, user_input))


import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

ssh.connect("192.168.117.127", username="kali", password="kali")
stdin, stdout, stderr = ssh.exec_command("ls")
print(stdout.read())