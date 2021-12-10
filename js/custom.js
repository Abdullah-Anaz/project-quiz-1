var current = 0;
var points = 0;
var time = 14;
var count;
var interval;
var quiz = document.getElementById('container');
var dot = document.getElementsByClassName('dot')
var answer = document.querySelectorAll('.answer')
var question = document.getElementById('question')
var option_a = document.getElementById('option_a')
var option_b = document.getElementById('option_b')
var option_c = document.getElementById('option_c')
var option_d = document.getElementById('option_d')
var submit = document.getElementById('submit')
var quizArray = [
    {
        quizQuestion: "2y + 3 = 10",
        a: "3.5",
        b: "6",
        c: "15",
        d: "none of the above",
        correct: "a",
    },
    {
        quizQuestion: "10!",
        a: "39916800",
        b: "120",
        c: "3628800",
        d: "10",
        correct: "c",
    },
    {
        quizQuestion: "55 x 23",
        a: "1200",
        b: "1265",
        c: "1300",
        d: "1266",
        correct: "b",
    },
    {
        quizQuestion: "1010 to denary",
        a: "1010",
        b: "10",
        c: "8",
        d: "none of the above",
        correct: "b",
    },
    {
        quizQuestion: "25 to binary",
        a: "11001",
        b: "101010",
        c: "25",
        d: "00100101",
        correct: "a",
    },
    {
        quizQuestion: "19 to hexadecimal",
        a: "1011",
        b: "13",
        c: "ABC",
        d: "none of the above",
        correct: "b",
    },
    {
        quizQuestion: "1011",
        a: "B",
        b: "ABC",
        c: "25",
        d: "1011",
        correct: "a",
    },
    {
        quizQuestion: "5C to denary",
        a: "92",
        b: "53",
        c: "10",
        d: "none of the above",
        correct: "a",
    },
    {
        quizQuestion: "3A to binary",
        a: "1010",
        b: "111010",
        c: "1110000",
        d: "none of the above",
        correct: "b",
    },
    {
        quizQuestion: "sin(cos(tan(x))) = 0.0175 (4dp)",
        a: "0.175",
        b: "100",
        c: "190",
        d: "180",
        correct: "d",
    }
];
var shuffleArray = shuffle(quizArray);


load()

function load() {
    count = time;
    timeOut()
    deselect()
    if (current == quizArray.length - 1) {
        document.getElementById('btnText').innerText = "Submit";
    }

    var currentData = shuffleArray[current];
    question.innerText = currentData.quizQuestion
    option_a.innerText = currentData.a
    option_b.innerText = currentData.b
    option_c.innerText = currentData.c
    option_d.innerText = currentData.d
}

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
    return array;
}

function timeOut() {
    interval = setInterval(function () {
        document.getElementById('count').innerHTML = count;
        count--
        if (count < 3) {
            document.getElementById('count').style.color = "red";
        } else if (count > 3) {
            document.getElementById('count').style.color = "black";
        }
        if (count == -1) {
            clearInterval(interval);
            var ans = select()
            if (ans) {
                if (ans === quizArray[current].correct) {
                    points++
                    dot[current].style.backgroundColor = "gold";
                } else {
                    dot[current].style.backgroundColor = "red";
                }
            } else {
                dot[current].style.backgroundColor = "red";
            }
            current++
            if (current < quizArray.length) {
                load()
            } else {
                var score = (points / quizArray.length) * 100
                quiz.innerHTML = `
                <h2>Your score: ${score}%</h2>
                <button onclick="location.reload()">Reload</button>
                `
            }
        }
    }, 1000);
}

function select() {
    var ans
    answer.forEach(option => {
        if (option.checked) {
            ans = option.id
        }
    })
    return ans
}

function deselect() {
    answer.forEach(option => option.checked = false)
}

submit.addEventListener('click', () => {
    clearInterval(interval);
    var ans = select()
    if (ans) {
        if (ans === quizArray[current].correct) {
            dot[current].style.backgroundColor = "gold";
            points++
        } else {
            dot[current].style.backgroundColor = "red";
        }
        current++
        if (current < quizArray.length) {
            load()
        } else {
            var score = (points / quizArray.length) * 100
            quiz.innerHTML = `
           <h2>Your score: ${score}%</h2>
           <button onclick="location.reload()">Reload</button>
           `
        }
    }
})
