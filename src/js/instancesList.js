export default function instancesList(parent, list, widget) {
    list.forEach(element => {
        widget(parent, element.id, element.status)
    });
}