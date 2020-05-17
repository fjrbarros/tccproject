export function isAuthenticated() {
    return localStorage.getItem('authenticad') === 'true';
}