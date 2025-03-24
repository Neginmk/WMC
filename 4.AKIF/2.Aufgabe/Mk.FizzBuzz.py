for num in range(1, 301):
    output = ""

   
    if num % 12 == 0:
        output += "BoomCrackZapPop"
   
    elif num % 8 == 0:
        output += "BoomZap"

    elif num % 6 == 0:
        output += "Crack"
  
    elif num % 4 == 0:
        output += "Boom"

   
    print(output if output else num)
