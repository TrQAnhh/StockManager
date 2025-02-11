// Button-status
// Button-status
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonsStatus.forEach(button => {
        button.addEventListener("click", (e) => {
            const deleted = button.getAttribute("deleted") === "true";
            const status = button.getAttribute("button-status");

            if (deleted) {
                url.searchParams.delete("status");
                url.searchParams.set("deleted", "true");
            } else {
                if (status) {
                    url.searchParams.set("status", status);
                } else {
                    url.searchParams.delete("status");
                }
                url.searchParams.delete("deleted");
            }

            url.searchParams.set("page", "1");

            window.location.href = url.toString();
        });
    });
}

// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(e.target.elements.keyword.value);

        const keyword = e.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url;
    })
}

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length > 0) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", (e) => {
            const currentPage = button.getAttribute("button-pagination");

            if(currentPage) {
                url.searchParams.set("page", currentPage);
            } else {
                url.searchParams.delete("page");
            }

            window.location.href = url;
        })
    })
}

// Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    // Check-all
    inputCheckAll.addEventListener("click", (e) => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach(input => {
        input.addEventListener("click", (e) => {
            const countCheckedBoxes = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            // console.log(checkedBoxes.length);
            // console.log(inputsId.length);
            if (countCheckedBoxes == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    })
}

// Form change multi
const formChangeMulti = document.querySelector("#form-change-multi");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent reloading pages after submitting a form

        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        // Delete - all checked products
        const typeChange = e.target.elements.type.value;
        if(typeChange == 'delete-all') {
            const isConfirm = confirm("Are you sure you want to delete all checked products?");
            if(!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids= [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.getAttribute("value");
                if(typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Please choose at least one product!")
        }
    });
}

// Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    // Declare timer variable in the correct scope
    let timer = setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    // Hide the alert immediately when the close button is clicked
    closeAlert.addEventListener("click", () => {
        clearTimeout(timer); // Cancel the auto-hide timer
        showAlert.classList.add("alert-hidden"); // Add the hidden class
    });
}

// Preview uploading-image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const closeButton = document.querySelector("[close-preview-image]");


    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            uploadImagePreview.style.display = "block";
            closeButton.style.display = "inline-block";
        }
    });

    closeButton.addEventListener("click", (e) => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
        uploadImagePreview.style.display = "none";
        closeButton.style.display = "none";
    });
}


