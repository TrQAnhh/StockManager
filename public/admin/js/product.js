// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0){
    // Get form
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", (e) => {
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            const newStatus = currentStatus == "active" ? "inactive" : "active";

            const action = path + `/${newStatus}/${id}?_method=PATCH`;

            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}

// Delete button
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete");
    const path = formDelete.getAttribute("data-path");

    buttonDelete.forEach(button => {
       button.addEventListener("click", (e) => {
            const isConfirm = confirm("Are you sure you want to delete this product?");
            if (isConfirm) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;

                formDelete.action = action;
                formDelete.submit();
            }
       });
    });
}

// Restore button
const buttonRestore = document.querySelectorAll("[button-restore]");
if (buttonRestore.length > 0) {
    const formRestore = document.querySelector("#form-restore");
    const path = formRestore.getAttribute("data-path");

    buttonRestore.forEach(button => {
        button.addEventListener("click", (e) => {
           const id = button.getAttribute("data-id");

           const action = `${path}/${id}?_method=PATCH`;

            formRestore.action = action;
            formRestore.submit();
        });
    });
}