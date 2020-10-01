export function msgFormatDay(name) {
    const msgDay = getMsgDay();
    const arrayName = name.split(' ');

    if (!arrayName.length || arrayName[0] === '') return msgDay;

    return msgDay + ', ' + arrayName[0] + '.';
}

function getMsgDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 18 && hours < 24) {
        return 'Boa noite';
    }

    if (hours >= 12 && hours < 18) {
        return 'Boa tarde';
    }

    if (hours >= 0 && hours < 12) {
        return 'Bom dia';
    }

    return '';
}

export function getFormattedScheduleData(data) {
    // return new Promise(resolve => {

    // });
}