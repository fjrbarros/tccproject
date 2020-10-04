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
    return new Promise(resolve => {
        const arrayDataFormat = [];
        data.atividades.forEach(itemActivitie => {
            itemActivitie.atividades.forEach(item => {
                arrayDataFormat.push({
                    ano: itemActivitie.ano,
                    percentual: item.percentualConclusao,
                    percetualChart: item.percentualConclusao === 0 ? 1 : item.percentualConclusao,
                    descricao: item.descricao,
                    estagio: item.estagio,
                    estagioStr: item.estagio === 'TO_DO' ? 'TO DO' : item.estagio === 'DOING' ? 'Doing' : 'Done',
                    dataInicio: item.dataInicio,
                    dataTermino: item.dataTermino,
                    dataPrevistaInicio: item.dataPrevistaInicio,
                    dataPrevistaTermino: item.dataPrevistaTermino
                });
            })
        });
        resolve(arrayDataFormat);
    });
}