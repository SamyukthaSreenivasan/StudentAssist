document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            
            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            
            // Redirect to the dashboard
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    });
});
