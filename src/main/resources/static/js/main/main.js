/**
 * main.js 
 */

$(document).ready(function () {
    const typingStr = 'This is the first paragraph of text. This is the first paragraph of text.';
    const typingWordArr = typingStr.split(' ');
    
    makeTyping(typingWordArr);
    
    $("#typingBox-area").keydown(function(e) {
//        e.preventDefault();
    });
});

function makeTyping(typingWordArr) {
    typingWordArr.forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word + ' ';
        wordSpan.className = 'word-class';
        $("#typingText-area").append(wordSpan);
    });
}