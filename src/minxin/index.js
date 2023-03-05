import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
});

export const SwalertSuccess = Swal.mixin({
    showConfirmButton: true,
    confirmButtonColor: '#6c757d',
});

export const SwalertError = Swal.mixin({
    showConfirmButton: false,
    showCancelButton: true,
});

export const configToast = {
    success: {
        icon: 'success',
        iconColor: '#6c757d',
        position: 'top-end',
        width: '15em',
    },
    error: {
        icon: 'error',
        iconColor: '#6c757d',
        position: 'top-end',
        width: '20em',
    },
};

export const configSwalert = {
    swalertSuccess: {
        icon: 'success',
        iconColor: '#6c757d',
        position: 'center',
    },
    swalertError: {
        icon: 'error',
        iconColor: '#6c757d',
        position: 'center',
    },
};

// notification order
export const ToastOrderSuccess = Swal.mixin({});
