const setPostToClosed = (id) => {
    fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: false})
    })
        .then(response => response.json())
        .then(data => {
            // if rows changed, reload page
            if (data[0] >= 1) {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

$(document).on('click', 'button#close-post', function(e) {
    e.preventDefault();

    const postID = $(this).closest('.post-wrapper').attr('id');
    const id = postID.split('-')[1];

    setPostToClosed(id);
})