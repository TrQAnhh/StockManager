// Button-status
const buttonsStatus = document.querySelectorAll("[button-status]");

if(buttonsStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonsStatus.forEach(button => {
        button.addEventListener("click", (e) => {
            const status = button.getAttribute("button-status");

            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
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

        if (inputsChecked.length > 0) {
            let ids= [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.getAttribute("value");
                ids.push(id);
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Please choose at least one product!")
        }
    });
}