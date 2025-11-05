digits = [
    " _ | _|", "     |  |", " _  __ ", " _  _| _|",
    "   |_|  |", " _ |_  _|", " _ |_ |_|", " _   |  |",
    " _ |_||_|", " _ |_| _|"
]

operators = [
    "         ", "         ", "    _  _ ", "         ",
    " _ |_|  |", " _ |_   |"
]

patterns = {
    " _ | _|": '0', "     |  |": '1', " _  __ ": '2',
    " _  _| _|": '3', "   |_|  |": '4', " _ |_  _|": '5',
    " _ |_ |_|": '6', " _   |  |": '7', " _ |_||_|": '8',
    " _ |_| _|": '9', "         ": '=', "    _  _ ": '+',
    "         ": '-', " _ |_   |": '*', " _ |_|  |": '%'
}

def evaluate(expression):
    lhs = 0
    num = 0
    op = '+'
    for char in expression:
        if char.isdigit():
            num = num * 10 + int(char)
        else:
            if op == '+':
                lhs += num
            elif op == '-':
                lhs -= num
            elif op == '*':
                lhs *= num
            elif op == '%':
                lhs %= num
            num = 0
            op = char
    lhs += num
    return lhs

def main():
    n = int(input())
    display = [input().strip() for _ in range(3)]

    characters = []
    for i in range(n):
        ch = ""
        for j in range(3):
            ch += display[j][i * 3:(i + 1) * 3]
        characters.append(ch)

    equation = [patterns[ch] for ch in characters]

    rhs = int(equation.pop())  # Right-hand side value
    equation.pop()  # Remove the '=' symbol
    result = evaluate(equation)

    for i in range(n):
        original = characters[i]
        for d in digits:
            if d == original:
                continue
            characters[i] = d
            temp = [patterns[ch] for ch in characters]
            if evaluate(temp) == rhs:
                print(i + 1)
                return
        characters[i] = original

if __name__ == "__main__":
    main()