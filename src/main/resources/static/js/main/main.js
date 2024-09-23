$(document).ready(function () {
    const typingStr = 'This is the first paragraph of text. This is the first paragraph of text.';
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

    // 사용자가 입력할 때마다 문자를 배경과 비교
    $("#typingBox-area").on('input', function(e) {
        const typedText = $(this).val();
        const letterElements = document.querySelectorAll('#typingText-area .letter-class');
        
        // 입력된 글자가 배경 문장보다 길어지지 않도록 체크
        typedText.split('').forEach((letter, index) => {
            if (letterElements[index]) {
                if (letterElements[index].textContent === letter) {
                    letterElements[index].style.opacity = '0'; // 올바르게 입력된 문자는 숨김
                } else {
                    letterElements[index].style.opacity = '1'; // 틀리면 다시 보임
                    letterElements[index].style.color = 'red'; // 틀린 경우 빨간색으로 표시
                }
            }
        });

        // 배경과 현재 입력된 텍스트가 정확히 일치하는지 여부를 판단
        const originalText = typingStr.substr(0, typedText.length);
        if (typedText !== originalText) {
            $(this).css('color', 'red');
        } else {
            $(this).css('color', 'black');
        }
    });
});
