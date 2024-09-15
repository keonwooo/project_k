/**
 * main.js 
 */

$(document).ready(function () {
    const typingStr = 'This is the first paragraph of text. This is the first paragraph of text.';
    const typingWordArr = typingStr.split(' ');
    const typingLetterArr = typingStr.split('');
    
    typingWordArr.forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-class';
        
        typingLetterArr.forEach((letter) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'letter-class';
            
            wordSpan.appendChild(letterSpan);
        });
        document.getElementById("typingText-area").appendChild(wordSpan);
        document.getElementById("typingText-area").appendChild(document.createTextNode(' '));
        
    }) 

    
//    makeTyping(typingWordArr);
    
    $("#typingBox-area").keydown(function(e) {
//        e.preventDefault();
    });
});

//function makeTyping(typingWordArr) {
//    typingWordArr.forEach((word) => {
//        const wordSpan = document.createElement('span');
//        wordSpan.textContent = word + ' ';
//        wordSpan.className = 'word-class';
//        $("#typingText-area").append(wordSpan);
//    });
//}