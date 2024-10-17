$(document).ready(function () {
    const typingStr = 'This demo showcases the functionality provided by the Streaming plugin. In particular, it provides three different streaming approaches, namely: An on-demand stream originated by a file (a song, in this case): different users accessing this stream would receive a personal view of the stream itself.';
    const typingWordArr = typingStr.split(' ');

    // 배경 텍스트를 스팬에 넣어서 출력
    typingWordArr.forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-class';
        const letterArr = word.split('');
        letterArr.push(' '); // 단어 간 간격

        letterArr.forEach((letter) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'letter-class';
            wordSpan.appendChild(letterSpan);
        });

        document.getElementById("typingText-area").appendChild(wordSpan);
    });

    const typingBox = document.getElementById("typingBox-area");

    // 단어가 입력 창의 너비를 초과할 때 줄을 넘기는 함수
    function checkOverflow(inputElement) {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.fontSize = getComputedStyle(inputElement).fontSize;
        tempSpan.style.fontFamily = getComputedStyle(inputElement).fontFamily;
        tempSpan.textContent = inputElement.value;
        document.body.appendChild(tempSpan);

        const inputRect = inputElement.getBoundingClientRect();
        const spanRect = tempSpan.getBoundingClientRect();

        // 단어의 길이가 입력창 너비를 넘어갈 때
        const isOverflowing = spanRect.width > inputRect.width;

        document.body.removeChild(tempSpan);
        return isOverflowing;
    }
    
    // 사용자가 입력할 때마다 문자를 배경과 비교하고, 단어가 길면 줄바꿈
    $("#typingBox-area").on('input', function () {
        const typedText = $(this).val();
        const words = typedText.split(' '); // 입력된 단어 배열
        const currentWordIndex = words.length - 1; // 현재 입력 중인 단어 인덱스
        const currentWord = words[currentWordIndex]; // 현재 입력 중인 단어

        // 단어가 입력창의 너비를 넘으면 줄바꿈
//        if (checkOverflow(this)) {
//            $(this).val(typedText.replace(new RegExp(currentWord + '$'), '\n' + currentWord));
//        }

        const letterElements = document.querySelectorAll('#typingText-area .letter-class');
        
        // 입력된 글자마다 처리
        typedText.split('').forEach((letter, index) => {
            if (letterElements[index]) {
                if (letterElements[index].textContent === letter) {
                    letterElements[index].style.opacity = '0';
                } else {
                    letterElements[index].style.opacity = '0';
                    letterElements[index].style.color = 'red'; // 틀린 경우 빨간색으로 표시
                }
            }
        });

        // 사용자가 텍스트를 지웠을 때
        if (typedText.length < letterElements.length) {
            letterElements.forEach((letterElement, index) => {
                if (index >= typedText.length) {
                    letterElement.style.opacity = '1'; // 지워진 이후 글자는 다시 나타남
                    letterElement.style.color = 'lightgray'; // 원래 색상으로 되돌림
                }
            });
        }
        
        // 배경과 입력된 텍스트가 일치하는지 확인
        const originalText = typingStr.substr(0, typedText.length);
        if (typedText !== originalText) {
            $(this).css('color', 'red');
        } else {
            $(this).css('color', 'black');
        }
    });
});