// handles post edit request
const handleEditPostSubmitBtn = async (e) => {
    e.preventDefault(); // prevents default submit button behaviour

    // Obtain user inputs
    const post_title = $("#editPostTitle").val().trim();
    const post_content = $("#editPostContent").val().trim();
    const path_segments = window.location.toString().split('/');
    const id = path_segments[path_segments.length - 1];

    // Perform 'put' operation 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Handle response from 'put' operation
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
};

// handles post delete request
const handleDeletePostBtn = async (e) => {
    e.preventDefault();

    const path_segments = window.location.toString().split('/');
    const id = path_segments[path_segments.length - 1];

    // Perform 'delete' operation 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // Handle response from 'delete' operation
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
};

$("#editPostForm").submit(handleEditPostSubmitBtn);
$("#deletePostBtn").click(handleDeletePostBtn);