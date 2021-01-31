export default function createMsg(parent, time, id, msg) {
    const elem = document.createElement('div'); //рисуем сообщение логе
    elem.setAttribute('class', 'worklog-msg');
    elem.innerHTML = `
    <p>${time}<p>
    <p>Server: ${id}<p>
    <p>INFO: ${msg}<p>`;
    parent.append(elem);
    parent.scrollBy(0, 9999999);
}