// file: app.js
function navigateTo(page) {
    switch (page) {
        case 'games':
            window.location.href = 'index.html';
            break;
        case 'wallet':
            window.location.href = 'wallet.html';
            break;
        case 'user':
            window.location.href = 'user.html';
            break;
    }
}