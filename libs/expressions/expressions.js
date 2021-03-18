function isBracket(c) {
    return c == '(' || c == ')';
}

function isOperation(c) {
    return c == '+' || c == '-' || c == '*' || c == '/';
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function getOperationPrioritet(c) {
    if (c == '*' || c == '/') {
        return 2;
    }
    if (c == '+' || c == '-') {
        return 1;
    }

    return -1;
}

function getNumberEndIndex(str, startIndex) {
    let endIndex = Math.min(str.length, 1 + startIndex);
    while (endIndex < str.length && isDigit(str.charAt(endIndex))) {
        endIndex += 1;
    }

    return endIndex;
}

function action(valueStack, operationChar) {
    if (valueStack.length == 0) {
        return false;
    }
    let right = valueStack.pop();
    if (valueStack.length == 0) {
        return false;
    }
    let left = valueStack.pop();

    if (operationChar == '+') {
        valueStack.push(left + right);
        return true;
    } else if (operationChar == '-') {
        valueStack.push(left - right);
        return true;
    } else if (operationChar == '*') {
        valueStack.push(left * right);
        return true;
    } else if (operationChar == '/') {
        valueStack.push(left / right);
        return true;
    }

    return false;
}

function calculate(str) {
    let valueStack = [];
    let operationStack = [];
    for (let i = 0; i < str.length; ++i) {
        let char = str.charAt(i);
        if (char == ' ') {
            continue;
        } else if (isBracket(char)) {
            if (char == '(') {
                operationStack.push('(');
            } else {
                if (operationStack.length != 0) {
                    let operationChar = operationStack.pop();
                    while (operationChar != '(') {
                        if (!action(valueStack, operationChar)) {
                            return undefined;
                        }

                        if (operationStack.length == 0) {
                            return undefined;
                        }

                        operationChar = operationStack.pop();
                    }
                } else {
                    return undefined;
                }
            }
        } else if (isOperation(char)) {
            if (operationStack.length != 0) {
                while (getOperationPrioritet(operationStack[operationStack.length - 1]) > getOperationPrioritet(char)) {
                    let operationChar = operationStack.pop();

                    if (!action(valueStack, operationChar)) {
                        return undefined;
                    }

                    if (operationStack.length == 0) {
                        break;
                    }
                }
            }

            operationStack.push(char);
        } else if (isDigit(char)) {
            let endIndex = getNumberEndIndex(str, i);
            let number;
            try {
                number = Number(str.slice(i, endIndex));
            } catch (err) {
                return undefined;
            }
            valueStack.push(number);

            i = endIndex - 1;
        } else {
            return undefined;
        }
    }

    while (operationStack.length != 0) {
        let operationChar = operationStack.pop();

        if (!action(valueStack, operationChar)) {
            return undefined;
        }
    }

    if (valueStack.length != 1) {
        return undefined;
    }

    return valueStack[0];
}

module.exports = calculate;