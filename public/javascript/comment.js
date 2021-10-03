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

const createComment = (postId, message) => {
    return new Promise((resolve, reject) => {
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: postId,
                text: message
            })
        })
        .then(response => response.json())
        .then(commentData => {
            resolve(commentData);
        })
        .catch(err => {
            reject(err);
        });
    });
}


// Add Comment
$(document).on('click', "button[id^='add-comment-']", function(e) {
    e.preventDefault();

    const id = this.id;
    const postId = id.split('-')[2];

    // console.log('comment clicked!', {
    //     this: this,
    //     id: id,
    //     postId: postId
    // });

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
    const message = $(this.previousElementSibling).val().trim();

    createComment(postId, message)
    .then(commentData => {
        // console.log('commentData', commentData);
        // Hide Comment Form
        $(`#comment-form-${postId}`).hide();

        // Show Comment Button
        $(`#add-comment-${postId}`).show();

        // Add Comment to Post
        const commentEl = `<p class="comment">${commentData.user.username}:  ${commentData.text}</p>`;
        $(`#comment-wrapper-${postId}`).append(commentEl);
    })
});