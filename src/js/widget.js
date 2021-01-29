export default function widget(parent, id, status) {
    
    let button;
    let color;

    if (status === 'Stopped') {
        button = 'play_arrow';
        color = 'black'
    } else {
        button = 'pause';
        color = 'green';
    }

    const elem = document.createElement('div');
    elem.setAttribute('class', 'instance-widget');
    elem.setAttribute('id', id);
    elem.innerHTML = `
      <p class="instance-id">${id}</p>
      <div class="instance-status">
          <div>Status: </div>
          <div class="material-icons ${color}" data-status="color">fiber_manual_record</div>
          <div class="status">${status}</div>
      </div>
      <div class="instance-action">
          <div>Action: </div>
          <div class="material-icons" data-action="button">${button}</div>
          <div class="material-icons actions" data-clear="button">clear</div>
      </div>`;
    parent.append(elem);
}