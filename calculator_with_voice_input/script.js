function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    return document.getElementById("history-value").innerText=num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if(num == "") {
        document.getElementById("output-value").innerText=num;
    } else {
        return document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if(num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

let operator = document.getElementsByClassName("operator");
for(let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if(this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if(this.id == "backspace") {
            let output = reverseNumberFormat(getOutput()).toString();
            if(output) {
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
        }
        else {
            let output = getOutput();
            let history = getHistory();
            if(output == "" && history != "") {
                if(isNaN(history[history.length-1])) {
                    history = history.substr(0, history.length-1);
                }
            }
            if(output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if(this.id == "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}

let number = document.getElementsByClassName("number");
for(let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if(output != NaN) {
            output = output + this.id;
            printOutput(output);
        }
    })
}

let microphone = document.getElementById("microphone");
microphone.onclick = function() {
    microphone.classList.add("record");
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    operations = {
        "plus" : "+",
        "minus" : "-",
        "multiply" : "*",
        "multiplied" : "*",
        "divide" : "/",
        "devided" : "/",
        "reminder" : "%",
        "ikhwan Fahmi" : "Ikhwan Fahmi"
    }

    recognition.onresult = function (event) {
        let input = event.results[0][0].transcript;
        for(property in operations) {
            input = input.replace(property, operations[property]);
        }
        document.getElementById("output-value").innerText = input;
        console.log(input);
        setTimeout(function() {
            evaluate(input);
        }, 2800);
        microphone.classList.remove("record");
    }
}

function evaluate(input) {
    try {
        let result = eval(input);
        document.getElementById("output-value").innerText = result;
    }
    catch(e) {
        console.log(e);
        document.getElementById("output-value").innerText = "";
    }
}