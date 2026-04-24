import Swal from 'sweetalert2';

export const showToast = {
  success: (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  },

  error: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  },

  info: (message) => {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  },

  warning: (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  },

  confirm: async (title, text) => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: 'Cancel'
    });
    return result.isConfirmed;
  }
};
