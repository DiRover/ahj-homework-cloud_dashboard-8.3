export default function createMsg(parent, time, id, msg) {
    const elem = document.createElement('div');
    elem.setAttribute('class', 'worklog-msg');
    elem.innerHTML = `
    <p>${time}<p>
    <p>Server: ${id}<p>
    <p>INFO: ${msg}<p>`;
    parent.append(elem);
}