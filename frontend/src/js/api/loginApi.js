document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://api-sandbox-f3ei.onrender.com/auth/login', {  // 'https://api-adivinanza.onrender.com/auth/login'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        alert("Inicio de sesión exitoso.");
        window.location.href = '/Prototipo_navegacional_Web/inicio/inicio.html';
    } else {
        alert(data.message);
    }
});