export function validateForm(values, errorFn) {
    let msg;
    if(values.hasOwnProperty('name')) {
        if((msg = validateName(values.name))) {
            errorFn('name', msg)
        }
    }

    if(values.hasOwnProperty('email')) {
        if((msg = validateEmail(values.email))) {
            errorFn('email', msg)
        }
    }
    if(values.hasOwnProperty('phone')) {
        if((msg = validatePhone(values.phone))) {
            errorFn('phone', msg)
        }
    }
    if(values.hasOwnProperty('password')) {
        if((msg = validatePassword(values.password))) {
            errorFn('password', msg)
        }
    }
    if(values.hasOwnProperty('confPassword')) {
        if((msg = validateConfPassword(values.confPassword, values.password))) {
            errorFn('confPassword', msg)
        }
    }
    if(values.hasOwnProperty('titleProject')) {
        if((msg = validateTitleProject(values.titleProject))) {
            errorFn('titleProject', msg)
        }
    }
    if(values.hasOwnProperty('typeProject')) {
        if((msg = validateTypeProject(values.typeProject))) {
            errorFn('typeProject', msg)
        }
    }
    if(values.hasOwnProperty('dateInit')) {
        if((msg = validatetDateInit(values.dateInit))) {
            errorFn('dateInit', msg)
        }
    }
    if(values.hasOwnProperty('dateEnd')) {
        if((msg = validatetDateEnd(values.dateEnd))) {
            errorFn('dateEnd', msg)
        }
    }
}

function validateName(name) {
    if(!name) {
        return 'Nome é obrigatório!';
    } else {
        return '';
    }
}

function validateEmail(email) {
    if(!email) {
        return 'E-mail é obrigatório!';
    }

    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

    if(!regex.test(email)) {
        return 'E-mail inválido';
    }

    return '';
}

function validatePhone(phone) {
    if(!phone) {
        return 'Telefone é obrigatório!';
    }

    if(phone.length !== 15) {
        return 'Número inválido!';
    }

    return '';
}

function validatePassword(password) {
    if(!password) {
        return 'Senha é obrigatório!';
    }

    return '';
}

function validateConfPassword(confPassword, password) {
    if(!confPassword) {
        return 'Confirmação senha é obrigatório!';
    }

    if(password && password !== confPassword) {
        return 'Senhas diferentes!';
    }

    return '';
}

function validateTitleProject(titleProject) {
    if(!titleProject) return 'Titulo do projeto obrigatório.';
}

function validateTypeProject(typeProject) {
    if(!typeProject) return 'Tipo do projeto obrigatório.';
}

function validatetDateInit(dateInit) {
    if(!dateInit) return 'Data de início obrigatório.'

    if(dateInit.toString() === 'Invalid Date') return 'Data inválida.'
}

function validatetDateEnd(dateEnd) {
    if(!dateEnd) return 'Data de término obrigatório.'

    if(dateEnd.toString() === 'Invalid Date') return 'Data inválida.'
}