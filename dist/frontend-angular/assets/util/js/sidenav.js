export function showSidenav(id, bg) {
    console.log('IDDD', id)
    $(`#${id}`).addClass("show");
    $(`#${bg}`).addClass("show");
}

export function hideSidenav(id, bg) {
    $(`#${id}`).removeClass("show");
    $(`#${bg}`).removeClass("show");
}