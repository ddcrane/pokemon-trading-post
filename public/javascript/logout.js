async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
}

const logoutEl = document.querySelector('#logout');
if (logoutEl) {
    document.querySelector('#logout').addEventListener('click', logout);
}
  
