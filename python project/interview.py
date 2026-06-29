# converting an integer into decimals

import decimal

integer = 12
print(decimal.Decimal(integer))
print(type(decimal.Decimal(integer)))


# converting a string into decimals

string = "1232"
print(decimal.Decimal(string))
print(type(decimal.Decimal(string)))


# reversing a string using an extended slicing  technique

string = "Hello World"
print(string[::-1])


# coutung vowels in a string

vowels = "aeiouAEIOU"
string = "Hello World"
count = 0
for char in string:
    if char in vowels:
        count += 1
print(count)


