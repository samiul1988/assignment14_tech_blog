const handleLogin = async (username, password) => {
    return fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
};

const handleSignup = async (username, password) => {
    return fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
};

const authFormSubmitHandler = async (e) => {
    e.preventDefault(); // prevents default submit button behaviour

    // Obtain necessary inputs from the form
    const username = $("#formInputUserName").val().trim();
    const password = $("#formInputPassword").val().trim();
    const action = $($("button[name='authSubmitBtn']")[0]).attr('data-action');

    // Validate inputs and perform Login or Signup 
    if (username && password) {
        let response;
        if (action === "Login") {
            response = await handleLogin(username, password);
        } else if (action === "Sign up") {
            response = await handleSignup(username, password);
        }

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
};

$("#auth-form").submit(authFormSubmitHandler);