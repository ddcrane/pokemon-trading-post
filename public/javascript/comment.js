// As a note, this is a good process for static elements. 
// Since we have an undetermined amount of posts, we have 
// to pivot to using wildcard values

// Assuming we have jQuery loaded
async function commentFormHandler(e) {
    e.preventDefault();
    const id = this.id;
    const postId = id.split('-')[2];

    const comment = $(`#comment-text-${postId}`).val().trim();

    console.log(comment, postId);
}


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
$(document).on('click', "button[id^='submit-comment-']",  async function(e) {
    e.preventDefault();
    const id = this.id;
    const postId = id.split('-')[2];

    const comment = document.querySelector('textarea[name="comment"]').value.trim();

    // Post Form Data
    const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: comment,
            post_id: id.charAt(15),
            user: user.username
        })
    });

    if (response.ok) {
        // Hide Comment Form
        $(`#comment-form-${postId}`).hide();

        // Show Comment Button
        $(`#add-comment-${postId}`).show();
    } else {
        // Throw Errors
    }
});