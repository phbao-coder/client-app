import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    timer: 2000,
    showConfirmButton: false,
});

export const configToast = {
    icon: 'success',
    padding: '1rem 0.5rem',
    position: 'top-end',
};

export const ToastFailed = Swal.mixin({
    customClass: {
        cancelButton: 'btn-danger',
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

// notification order
export const ToastOrder = Swal.mixin({});
