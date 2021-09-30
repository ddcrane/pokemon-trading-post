// As a note, this is a good process for static elements. 
// Since we have an undetermined amount of posts, we have 
// to pivot to using wildcard values
// commentBtnEl1 = document.getElementById("comment-button1");
// commentTextEl1 = document.getElementById("comment-text1");
// postCommentBtn1 = document.getElementById("post-comment-button1");

// commentBtnEl2 = document.getElementById("comment-button2");
// commentTextEl2 = document.getElementById("comment-text2");
// postCommentBtn2 = document.getElementById("post-comment-button2");

// commentBtnEl3 = document.getElementById("comment-button3");
// commentTextEl3 = document.getElementById("comment-text3");
// postCommentBtn3 = document.getElementById("post-comment-button3");

// var showEl = function(element) {
//     element.classList.remove('hidden');
// };

// var hideEl = function(element) {
//     element.classList.add('hidden');
// };

// commentBtnEl1.addEventListener('click', function() {
//     showEl(commentTextEl1);
//     showEl(postCommentBtn1);
//     hideEl(commentBtnEl1);    
// });

// postCommentBtn1.addEventListener('click', function() {
//     hideEl(commentTextEl1);
//     hideEl(postCommentBtn1);
//     showEl(commentBtnEl1);
// });

// commentBtnEl2.addEventListener('click', function() {
//     showEl(commentTextEl2);
//     showEl(postCommentBtn2);
//     hideEl(commentBtnEl2);    
// });

// postCommentBtn2.addEventListener('click', function() {
//     hideEl(commentTextEl2);
//     hideEl(postCommentBtn2);
//     showEl(commentBtnEl2);
// });

// commentBtnEl3.addEventListener('click', function() {
//     showEl(commentTextEl3);
//     showEl(postCommentBtn3);
//     hideEl(commentBtnEl3);    
// });

// postCommentBtn3.addEventListener('click', function() {
//     hideEl(commentTextEl3);
//     hideEl(postCommentBtn3);
//     showEl(commentBtnEl3);
// });

// Assuming we have jQuery loaded

// Add Comment
$(document).on('click', "button[id^='add-comment-']", function(e) {
    e.preventDefault();
    console.log(this);
    const id = this.id;
    const postId = id.split('-')[2];
    console.log("success")
    // Hide Comment Button
    $(`#add-comment-${postId}`).hide();
    // Show Comment Form
    $(`comment-form-${postId}`).removeClass('hidden');
    $(`#comment-form-${postId}`).show();
    
});

// Cancel Add Comment
$(document).on('click', "button[id^='cancel-comment-']", function(e) {
    e.preventDefault();
    const id = this.id;
    const postId = id.split('-')[2];

    // Hide Comment Form
    $(`#comment-form-${postId}`).hide();
    
    // Show Comment Button
    $(`#add-comment-${postId}`).show();
});

// Submit Comment
$(document).on('click', "button[id^='submit-comment-']", function(e) {
    e.preventDefault();
    const id = this.id;
    const postId = id.split('-')[2];

    const comment = $(`#comment-text-${postId}`).val().trim();

    // Post Form Data
    // const response = await fetch('/api/comments', {
    //     method: 'POST',
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({text: comment})
    // });

    //if (response.ok) {
        // Hide Comment Form
        $(`#comment-form-${postId}`).hide();

        // Show Comment Button
        $(`#add-comment-${postId}`).show();
    //} else {
        // Throw Error
    //}
});