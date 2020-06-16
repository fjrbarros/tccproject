export function isAuthenticated() {
    return localStorage.getItem('authenticad') === 'true';
}

export function encryptData(data) {
    const CryptoJS = require('crypto-js');

    const cipherTextEmail = CryptoJS.AES.encrypt(data.email, 'email');
    const cipherTextPassword = CryptoJS.AES.encrypt(data.senha, 'password');

    document.cookie = `info-E = ${cipherTextEmail}`;
    document.cookie = `info-S = ${cipherTextPassword}`;
}