
commentBtnEl1 = document.getElementById("comment-button1");
commentTextEl1 = document.getElementById("comment-text1");
postCommentBtn1 = document.getElementById("post-comment-button1");

commentBtnEl2 = document.getElementById("comment-button2");
commentTextEl2 = document.getElementById("comment-text2");
postCommentBtn2 = document.getElementById("post-comment-button2");

commentBtnEl3 = document.getElementById("comment-button3");
commentTextEl3 = document.getElementById("comment-text3");
postCommentBtn3 = document.getElementById("post-comment-button3");



var showEl = function(element) {
    element.classList.remove('hidden');
};

var hideEl = function(element) {
    element.classList.add('hidden');
};

commentBtnEl1.addEventListener('click', function() {
    showEl(commentTextEl1);
    showEl(postCommentBtn1);
    hideEl(commentBtnEl1);    
});

postCommentBtn1.addEventListener('click', function() {
    hideEl(commentTextEl1);
    hideEl(postCommentBtn1);
    showEl(commentBtnEl1);
});

commentBtnEl2.addEventListener('click', function() {
    showEl(commentTextEl2);
    showEl(postCommentBtn2);
    hideEl(commentBtnEl2);    
});

postCommentBtn2.addEventListener('click', function() {
    hideEl(commentTextEl2);
    hideEl(postCommentBtn2);
    showEl(commentBtnEl2);
});

commentBtnEl3.addEventListener('click', function() {
    showEl(commentTextEl3);
    showEl(postCommentBtn3);
    hideEl(commentBtnEl3);    
});

postCommentBtn3.addEventListener('click', function() {
    hideEl(commentTextEl3);
    hideEl(postCommentBtn3);
    showEl(commentBtnEl3);
});