// header
const header = document.querySelector("header"),
    gear = document.querySelector(".setting img"),
    dialog = document.querySelector("dialog"),
    settingClose = document.querySelector(".setting-close"),
    btnUploadImg = document.querySelectorAll(".btn-upload-img");

let myBody = document.body;
let toggleRight = document.createElement("div");
toggleRight.className = "toggle-right shadow";
toggleRight.innerHTML = `
<img class="img-ani" src="images/ellipsis-svgrepo-com.svg"></img>
<div class="menu-container">
    <div class="delete-all-tasks">
        <img src="images/delete-all-icon.svg"></img>
    </div>
    <div class="btn-up">
        <img src="images/up.svg"></img>
    </div>
</div>
`;
myBody.appendChild(toggleRight);

window.addEventListener("scroll", () => {
    if (window.scrollY >= 200) {
        header.classList.add("header-act");
        toggleRight.classList.add("toggle-right-act");
        toggleRight.onclick = () => {
            toggleRight.classList.add("toggle-right-menu");
        };
    } else if (window.scrollY <= 100) {
        header.classList.remove("header-act");
        toggleRight.classList.remove("toggle-right-act");
        toggleRight.classList.remove("toggle-right-menu");
        const close = () => {
            toggleRight.classList.remove("toggle-right-menu");
        };

        myBody.onclick = (e) => {
            let a = toggleRight.contains(e.target);
            if (!a) {
                close();
            };
        };
    };
});

document.querySelector(".btn-up").onclick = function () {
    scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

document.querySelector(".delete-all-tasks").onclick = function () {
    window.localStorage.removeItem("data-array");
    window.location.reload(arrayOfTasks);
    ![...containerAddTasks.children].forEach(deletAllTasks => {
        deletAllTasks.remove();
    });
};

// button setting 
function gearSetting() {
    dialog.showModal();
    gear.style.animation = "forwards";
    myBody.style.overflow = "hidden";
};

gear.addEventListener("click", gearSetting);

function closeSetting() {
    dialog.setAttribute("closing", "");
    dialog.addEventListener("animationend", () => {
        dialog.removeAttribute("closing");
        dialog.close();
    }, { once: true });

    gear.style.cssText = "animation: setting 5s linear infinite;";
    myBody.style.overflowY = "scroll";
};

settingClose.addEventListener("click", closeSetting);

btnUploadImg.forEach((btnAnimationClick) => {
    function buttonAnimation(elem, eve) {
        let posX = eve.offsetX;
        let posY = eve.offsetY;

        elem.style.setProperty("--X", posX + "px");
        elem.style.setProperty("--Y", posY + "px");
    };

    btnAnimationClick.addEventListener("click", (e) => {
        buttonAnimation(btnAnimationClick, e);

        btnAnimationClick.classList.add("act-animation-btn");
        btnAnimationClick.addEventListener("animationend", () => {
            btnAnimationClick.classList.remove("act-animation-btn");
        });
    });
});

// uploade image profile
const inputFile = document.querySelector("[type='file']"),
    inputName = document.querySelector("[type='text']"),
    changeProfile = document.querySelector(".change-img img"),
    mainImgProfile = document.querySelector(".img-profile img"),
    btnDeleteProfile = document.querySelector(".btn-delet-img"),
    nameUser = document.querySelector(".name-user");

function uploadImg() {
    let myFile = inputFile.files[0]
    const reader = new FileReader();

    reader.onload = () => {
        changeProfile.setAttribute("src", reader.result);
        mainImgProfile.setAttribute("src", reader.result);

        window.localStorage.setItem("data-img-profile", changeProfile.src);
        window.localStorage.setItem("data-main-img-profile", mainImgProfile.src);
    };
    reader.readAsDataURL(myFile);
};

if (localStorage.getItem("data-img-profile")) {
    changeProfile.src = localStorage["data-img-profile"];
    mainImgProfile.src = localStorage["data-main-img-profile"];
};

inputFile.addEventListener("change", uploadImg);

// delet upload profile image
function deletImageProfileBtn() {
    window.localStorage.clear();
    changeProfile.setAttribute("src", "images/user.svg");
    mainImgProfile.setAttribute("src", "images/user.svg");
}

btnDeleteProfile.addEventListener("click", deletImageProfileBtn);

// setting change name user
const inputChangeName = document.querySelector(".input-change-name"),
    inputText = document.querySelector("input[type='text']"),
    btnSaveUser = document.querySelector(".btn-change-user-name"),
    nameCheck = document.querySelector(".input-change-name img");

// input text border line animation
function borderLineAnimation() {
    inputChangeName.classList.add("active-border-line");
    window.localStorage.setItem("data-input-line", inputChangeName.className);
};

if (localStorage.getItem("data-input-line")) {
    inputChangeName.className = localStorage["data-input-line"];
};

inputChangeName.addEventListener("click", borderLineAnimation);

// button submit change user name
let errorRequired = document.createElement("span");
let nameSet = document.createElement("span");
let errorMust = document.createElement("span");

function buttonSubmitUserName() {
    if (inputText.value == "") {
        errorRequired.className = "error-user-name";
        inputChangeName.appendChild(errorRequired);

        errorRequired.textContent = "name required";
        errorRequired.classList.add("error-act");

        setTimeout(() => {
            errorRequired.classList.remove("error-act");
        }, 3000);

    } else if (inputText.value.length <= 5) {
        errorMust.className = "error-must";
        inputChangeName.appendChild(errorMust);

        errorMust.textContent = "must be at least 5 characters";
        errorMust.classList.add("error-must-act");

        setTimeout(() => {
            errorMust.classList.remove("error-must-act");
        }, 3000);

        nameCheck.setAttribute("src", "images/user-pen.svg");

    } else if (inputText.value != "") {
        nameUser.textContent = inputText.value.split(" ", 1);
        nameCheck.setAttribute("src", "images/circle-check.svg");

        window.localStorage.setItem("data-check-user-name", nameCheck.src);
        window.localStorage.setItem("data-user-name", nameUser.textContent);

        nameSet.className = "name-set";
        inputChangeName.appendChild(nameSet);

        nameSet.textContent = "your name is set";
        nameSet.classList.add("name-set-act");

        setTimeout(() => {
            nameSet.classList.remove("name-set-act");
        }, 3000);

        errorMust.classList.remove("error-must-act");
        window.localStorage.setItem("input-data-name", inputText.value);
    }
    errorMaxLength.remove();
};

if (localStorage.getItem("input-data-name") && localStorage.getItem("data-check-user-name")) {
    inputText.value = window.localStorage["input-data-name"];
    nameCheck.src = window.localStorage["data-check-user-name"];
}

if (localStorage.getItem("data-user-name")) {
    nameUser.textContent = localStorage["data-user-name"];
};

btnSaveUser.addEventListener("click", buttonSubmitUserName);

// error max length input name
let errorMaxLength = document.createElement("span");
function inputErrorMaxLength(inputValue) {
    inputValue = inputText.value.length;
    errorMaxLength.className = "error-max-length";
    inputChangeName.appendChild(errorMaxLength);
    if (inputValue >= 15) {
        errorMaxLength.textContent = "max length 15";
        errorMust.classList.remove("error-must-act");
    } else if (inputValue < 15) {
        errorMaxLength.remove();
        errorRequired.remove();
    };

    if (inputText.value == "") {
        nameCheck.setAttribute("src", "images/user-pen.svg");
        nameUser.textContent = nameUser.dataset.name;
        window.localStorage.removeItem("input-data-name");
        window.localStorage.removeItem("data-input-line");
        window.localStorage.removeItem("data-user-name");
    };
};

inputText.addEventListener("input", inputErrorMaxLength);

window.addEventListener("keydown", (e) => {
    if (dialog.hasAttribute("open")) {
        if (e.key.includes("Enter")) {
            return buttonSubmitUserName();
        };
    } else if (e.key.includes("Enter")) {
        addErrorToInputTask();
        if (business.hasAttribute("data-checked")) {
            return todoListInput();
        };
    };
});

const business = document.querySelector(".business input");