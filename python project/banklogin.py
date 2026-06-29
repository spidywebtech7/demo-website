balance = 5000

username = input("Enter username: ")
userpass = input("Enter password: ")

if username == "admin" and userpass == "123":
    print("Login successful")

    choice = input('''
1. Check Balance
2. Withdraw
3. Deposit
Enter your choice: 
''')

    if choice == "1":
        print("Your balance is:", balance)

    elif choice == "2":
        amount = int(input("Enter withdraw amount: "))
        if amount <= balance:
            balance = balance - amount
            print("Withdraw successful")
            print("Remaining balance:", balance)
        else:
            print("Insufficient balance")

    elif choice == "3":
        amount = int(input("Enter deposit amount: "))
        balance = balance + amount
        print("Deposit successful")
        print("Updated balance:", balance)

    else:
        print("Invalid choice")

else:
    print("Wrong username or password")