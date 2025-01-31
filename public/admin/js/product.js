// Change product's status (inactive / active)
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path= formChangeStatus.getAttribute("data-path");


    buttonsChangeStatus.forEach(button => {
       button.addEventListener("click", (e) => {
          const currentStatus = button.getAttribute("data-status");
          const id = button.getAttribute("data-id");

          let newStatus = currentStatus === "active" ? "inactive" : "active";

          const action = path + `/${newStatus}/${id}?_method=PATCH`;
          formChangeStatus.action = action;

          formChangeStatus.submit();
       });
    });
}