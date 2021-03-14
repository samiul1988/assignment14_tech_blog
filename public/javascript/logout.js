// Performs logout
const logoutHandler = async () => {
    console.log("in logout");
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

$("#logoutBtn").click(logoutHandler);
