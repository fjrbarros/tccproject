import Api from '../api/Index';

export function isAuthenticated() {
    return localStorage.getItem('authenticad') === 'true';
}

export function removeCookie() {
    const cookies = document.cookie.split(';');

    cookies.forEach(c => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
}

export function encryptData(data) {
    const CryptoJS = require('crypto-js');

    const cipherTextEmail = CryptoJS.AES.encrypt(data.email, 'email');
    const cipherTextPassword = CryptoJS.AES.encrypt(data.senha, 'password');

    document.cookie = `info-E = ${cipherTextEmail}`;
    document.cookie = `info-P = ${cipherTextPassword}`;
}

export function decryptData() {
    const CryptoJS = require('crypto-js');

    const cookieEmail = getCookie('info-E');
    const cookiePassword = getCookie('info-P');

    const bytesEmail = CryptoJS.AES.decrypt(cookieEmail, 'email');
    const bytesPassword = CryptoJS.AES.decrypt(cookiePassword, 'password');
    const plainTextEmail = bytesEmail.toString(CryptoJS.enc.Utf8);
    const plainTextPassword = bytesPassword.toString(CryptoJS.enc.Utf8);

    if (plainTextEmail.length && plainTextPassword.length) {
        return { email: plainTextEmail, password: plainTextPassword };
    }
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function validateLoggedUser(store) {
    const dataUser = decryptData();

    if (!dataUser || !dataUser.email) {
        store.dispatch({
            type: 'UPDATE_USER',
            isLoading: false
        });
        return;
    } 

    const url = '/usuario/login';
    const data = {
        email: dataUser.email,
        senha: dataUser.password,
        tokenConfirmacao: ''
    };

    Api.post(url, data)
        .then(resp => {
            const respData = resp.data;
            encryptData(data);
            store.dispatch({
                type: 'UPDATE_USER',
                name: respData.nome || '',
                phone: respData.foneContato || '',
                email: respData.email || '',
                id: respData.id || null,
                isAuthenticated: true,
                isLoading: false
            });
        })
        .catch(error => {
            console.log(error);
            store.dispatch({
                type: 'UPDATE_USER',
                isLoading: false
            });
        })
}