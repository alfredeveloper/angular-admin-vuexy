export function sweetAlert(title, text, type) {
    // success, info, warning, error
    Swal.fire({
        title,
        text,
        type,
        confirmButtonClass: 'btn btn-primary',
        buttonsStyling: false,
    });
}

  