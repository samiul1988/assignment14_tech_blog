const commentFormSubmitHandler = async (e) => {
  e.preventDefault(); // prevents default submit button behaviour

  const comment_text = $('textarea#newCommentContent').val().trim();
  const path_segments = window.location.toString().split('/'); 
  const post_id = path_segments[path_segments.length - 1];

  // if there is any comment, then perform post operation
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

$("#new-comment-form").submit(commentFormSubmitHandler);
