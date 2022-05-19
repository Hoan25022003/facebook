let email = $("#email");
let password = $("#password");
let data = [email, password];

function checkEmpty(item) {
  if (item.val() === "") {
    item.css("border", "1px solid var(--error-color)");
    item[0].parentElement.querySelector(".form-message").innerText =
      "Thông tin này bắt buộc";
  } else {
    item.css("border", "1px solid #ddd");
    item[0].parentElement.querySelector(".form-message").innerText = "";
  }
}

async function formSubmit() {
  $(".form-message").text("");
  try {
    data.forEach((item) => checkEmpty(item));
    if (password.val().length > 0) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(email.val().trim())) {
        await $.ajax({
          type: "POST",
          url: "user/login",
          data: {
            email: email.val().trim(),
            password: password.val(),
          },
        });
        window.location.href = "/home";
      } else if (email.val().trim().length > 0) {
        email[0].parentElement.querySelector(".form-message").innerText =
          "Email này không hợp lệ";
        email.css("border", "1px solid var(--error-color)");
      }
    }
  } catch (error) {
    email[0].parentElement.querySelector(".form-message").innerText =
      error.responseJSON.message;
    email.css("border", "1px solid var(--error-color)");
    password.css("border", "1px solid var(--error-color)");
  }
}

document.onkeydown = (e) => {
  if (e.code === "Enter") {
    formSubmit();
  }
};
