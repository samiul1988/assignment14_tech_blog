const handleNewPostSubmitBtn = async (e) => {
    e.preventDefault(); // prevents default submit button behaviour

    // Obtain user inputs
    const post_title = $("#newPostTitle").val().trim();
    const post_content = $("#newPostContent").val().trim();

    // Perform 'post' operation 
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Handle response from 'post' operation
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// Toggles create post""form visibility and button text
const handleNewPostBtn = () => {
    const btnVal = $("#newPostBtn").val();

    if (btnVal === "+ New Post") {
        $("#newPostBtn").prop("value", "Cancel");
        $("#newPostForm")
            .removeClass("display_block display_none")
            .addClass("display_block");
    } else {
        $("#newPostBtn").prop("value", "+ New Post");
        $("#newPostForm")
            .removeClass("display_block display_none")
            .addClass("display_none");
    }
};

$("#newPostBtn").click(handleNewPostBtn);
$("#newPostForm").submit(handleNewPostSubmitBtn);

