const date = (setDate) => {
    const date = new Date(setDate);
    const enter = date.toLocaleDateString("ru").slice(0, 2)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const today = new Date().toLocaleDateString("ru").slice(0, 2)
    const day = (() => {
    if ((today - enter) === 0) {
    return 'Сегодня';
    } else if((today - enter) === 1 ) {
    return "Вчера";
    } else return date.toLocaleDateString("ru", {timeZone: 'Europe/Moscow'});
    })();
    return `${day}, ${hours}:${minutes} i-GMT+3`;
    };