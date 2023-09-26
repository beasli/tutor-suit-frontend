class Toast {

    static init() {
        let toastBox = document.createElement('div');

        toastBox.innerHTML = `<div class="position-fixed bottom-0 start-50 translate-middle-x p-3" style="z-index: 11">
        <div class="toast align-items-center text-white  border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
            <div class="toast-body">
                
            </div>
            <button type="button" class="btn-close btn-close-toast btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>  
        </div>`;

        document.body.appendChild(toastBox);
    }

    static error(message) {

        $('.toast').removeClass('bg-success'); 
        $('.toast').addClass('bg-danger'); 
        document.querySelector('.toast-body').innerHTML = message;
        $('.toast').toast('show');
    }

    static success(message) {
        $('.toast').removeClass('bg-danger'); 
        $('.toast').addClass('bg-success'); 
        document.querySelector('.toast-body').innerHTML = message;
        $('.toast').toast('show');
    }

    

}


