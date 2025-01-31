$(document).ready(function () {
    const typingStr = 'This demo showcases the functionality provided by the Streaming plugin. In particular, it provides three different streaming approaches, namely: An on-demand stream originated by a file (a song, in this case): different users accessing this stream would receive a personal view of the stream itself.';
    const typingWordArr = typingStr.split(' ');
    
    let startTime = null;
    let correctCharCount = 0; // 맞은 글자 수
    const totalCharCount = 100; // 전체 글자 수를 100으로 고정
    
    const accDisplay = document.getElementById('accDisplay');
    const typingSpeedDisplay = document.getElementById('typingSpeed');

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

    
    // 타이머를 사용해 1초마다 실시간 타이핑 속도를 계산
    function calculateCPM() {
        const currentTime = new Date();
        if (!startTime) {
            return; // 입력이 없으면 CPM 계산하지 않음
        }
        const timeElapsed = (currentTime - startTime) / 1000 / 60; // 분 단위로 경과 시간 계산
        const cpm = Math.floor(correctCharCount / timeElapsed); // 맞은 글자 수로 CPM 계산
        typingSpeedDisplay.textContent = isFinite(cpm) ? cpm : 0; // cpm이 유효한 경우에만 표시
    }

    // 1초마다 CPM 및 정확도 계산
    setInterval(calculateCPM, 100);

    // 사용자가 입력할 때마다 문자를 배경과 비교하고, 정확도 계산
    $("#typingBox-area").on('input', function () {
        const typedText = $(this).val();
        const letterElements = document.querySelectorAll('#typingText-area .letter-class');
        correctCharCount = 0; // 맞은 글자 수 초기화

        // 입력된 글자마다 처리
        typedText.split('').forEach((letter, index) => {
            if (letterElements[index]) {
                if (letterElements[index].textContent === letter) {
                    letterElements[index].style.opacity = '0';
                    correctCharCount++; // 맞은 글자 수 증가
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
        
        
        // 정확도 계산 (맞은 글자 수 / 전체 글자 수) * 100
        const accuracy = (correctCharCount / totalCharCount) * 100;
        accDisplay.textContent = accuracy.toFixed(2) + '%'; // 소수점 2자리까지 표시

        // 시작 시간 기록
        if (!startTime) {
            startTime = new Date();
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