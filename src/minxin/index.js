import Swal from 'sweetalert2';

export const Toast = Swal.mixin({});

export const configToast = {
    toast: true,
    timer: 2000,
    icon: 'success',
    padding: '1rem 0.5rem',
    position: 'top-end',
    showConfirmButton: false,
};

export const ToastFailed = Swal.mixin({
    customClass: {
        cancelButton: 'btn-danger',
        confirmButton: 'btn-success',
    },
    buttonsStyling: false,
    cancelButtonText: 'Hủy',
    showCancelButton: true,
    showConfirmButton: false,
});

export const configToastFailed = {
    icon: 'error',
    title: 'Lỗi',
};
