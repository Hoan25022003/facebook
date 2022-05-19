let url = window.location.href;

if (url.includes("about")) {
  $(".profile-info-link").removeClass("active");
  $(".profile-info-link").eq(1).addClass("active");
} else if (url.includes("change-password")) {
  $(".profile-info-link").removeClass("active");
  $(".profile-info-link").eq(3).addClass("active");
}

if (url.includes("user")) {
  $(".header-nav-icon").removeClass("active");
}

// * Change image
function importData() {
  document.getElementById("upload-avatar").click();
}

var fileToRead = document.getElementById("upload-avatar");

fileToRead.addEventListener(
  "change",
  function () {
    var files = fileToRead.files;
    if (files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        $(".modal-body-avatar img").attr("src", fr.result);
      };
      fr.readAsDataURL(files[0]);
    }
  },
  false
);

async function changeAvatar() {
  try {
    const form = $("form")[0];
    const formData = new FormData(form);
    await $.ajax({
      url: "/user/profile/avatar",
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
    });
    window.location.reload();
  } catch (error) {
    alert(error.responseJSON.message);
  }
}

function importData2() {
  document.getElementById("upload-cover").click();
}

var fileToRead2 = document.getElementById("upload-cover");

fileToRead2.addEventListener(
  "change",
  function () {
    var files2 = fileToRead2.files;
    if (files2.length) {
      var fr2 = new FileReader();
      fr2.onload = function () {
        $(".modal-body-cover img").attr("src", fr2.result);
      };
      fr2.readAsDataURL(files2[0]);
    }
  },
  false
);

async function changeCover() {
  try {
    const form = $("form")[1];
    const formData = new FormData(form);
    await $.ajax({
      url: "/user/profile/cover",
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
    });
    window.location.reload();
  } catch (error) {
    alert(error.responseJSON.message);
  }
}

// * Change Information
let formIntro = $(".detail-intro-info input");
for (let i = 0; i < formIntro.length; i++) {
  formIntro[i].addEventListener("keydown", (e) => {
    if (e.key) {
      $(".detail-intro-submit-change").addClass("show-btn");
    }
  });
}

async function changeInfo() {
  try {
    const address = $("#address").val();
    const position = $("#position").val();
    const education = $("#education").val();
    const working = $("#working").val();
    await $.ajax({
      type: "POST",
      url: "/user/intro",
      data: {
        address,
        position,
        education,
        working,
      },
    });
    window.location.href = "/user/" + url.split("/")[4];
  } catch (error) {
    alert(error.responseJSON.message);
  }
}

$("#cancel").on("click", () => {
  $(".btn-close-2").trigger("click");
});

async function removeAll() {
  try {
    await $.ajax({
      type: "DELETE",
      url: "/user/delete",
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

// * Change Password
for (let i = 0; i < $(".detail-password-group").length; i++) {
  $(".detail-password-group input")
    .eq(i)
    .on("keyup", () => {
      const currentPassword = $("#current-password").val();
      const newPassword = $("#new-password").val();
      const confirmPassword = $("#confirm-password").val();
      if (
        currentPassword.length > 0 &&
        newPassword.length > 0 &&
        confirmPassword.length > 0 &&
        newPassword === confirmPassword
      ) {
        $(".detail-password-submit").addClass("show-btn");
      } else {
        $(".detail-password-submit").removeClass("show-btn");
      }
    });
}

async function changePassword() {
  const currentPassword = $("#current-password").val();
  const newPassword = $("#new-password").val();
  const confirmPassword = $("#confirm-password").val();
  try {
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword
    ) {
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;
      if (
        newPassword.match(numbers) &&
        newPassword.length > 0 &&
        (newPassword.match(upperCaseLetters) ||
          newPassword.match(lowerCaseLetters))
      ) {
        await $.ajax({
          type: "PUT",
          url: "/user/change-password",
          data: {
            currentPassword,
            newPassword,
            confirmPassword,
          },
        });
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      } else {
        alert("Mật khẩu mới quá yếu !");
      }
    } else {
      $(".detail-password-submit").off("click");
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
}

document.onkeydown = (e) => {
  if (e.code === "Enter") {
    changePassword();
  }
};
