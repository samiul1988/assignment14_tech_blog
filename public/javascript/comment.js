const commentFormSubmitHandler = async (e) => {
    e.preventDefault(); // prevents default submit button behaviour

    const comment_text = $('textarea#newCommentContent').val().trim();
    const path_segments = window.location.toString().split('/');
    const post_id = path_segments[path_segments.length - 1];

    // if there is any comment content, then perform post operation
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle response from 'post' operation
        if (response.ok) {
            document.location.reload(); // for a successful response, reload the page to reflect the update
        } else {
            alert(response.statusText); // otherwise show error
        }
    }
};

const removeCommentBtnHandler = async (e) => {
    e.preventDefault();

    const id = parseInt($($("button#removeCommentBtn")[0]).attr('data-id'));
    
    if (id) {
        // perform 'delete' operation
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        });

        // Handle response from 'delete' operation
        if (response.ok) {
            document.location.reload(); // for a successful response, reload the page to reflect the update
        } else {
            alert(response.statusText); // otherwise show error
        }
    }
};


$("#new-comment-form").submit(commentFormSubmitHandler);
$("#removeCommentBtn").click(removeCommentBtnHandler);
