document.getElementById("myFileInput").addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  localStorage.setItem("image-name", e.target.files[0].name);
  localStorage.setItem("image-title", e.target.files[0].name);
  reader.onload = function (e) {
    localStorage.setItem("image", e.target.result);
    document.getElementById("imgPreview").src = e.target.result;
  };
});
const loader = document.querySelector(".loader");
let target;

document.querySelector("#convertBase64Btn").addEventListener("click", (e) => {
  loader.style.display = "block";
  document.getElementById("imgPreviewBlob").style.opacity = 0.5;

  fetch("https://picsum.photos/300/300")
    .then((response) => response.blob())
    .then((blob) => {
      let file = new File([blob], "image", { type: blob.type });
      const readerBlob = new FileReader();
      readerBlob.readAsDataURL(file);

      readerBlob.onload = function (e) {
        document.getElementById("imgPreviewBlob").style.opacity = 1;
        document.getElementById("imgPreviewBlob").src = e.target.result;
        loader.style.display = "none";

        // save the original blob as txt file
        let fileName = "image.txt";
        let fileContent = e.target.result;

        let blob = new Blob([fileContent], {
          type: "text/plain;charset=utf-8",
        });
        let a = document.getElementById("download");

        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;

        target = e.target.result;
      };
    });
});

document.querySelector("#removeImageBtn").addEventListener("click", () => {
  localStorage.clear();
  document.getElementById("imgPreview").src = "./images/upload.png";
});

document.querySelector("#downloadImageBtn").addEventListener("click", () => {
  saveBase64AsFile(target, "image");
});

// Save base64 as jpg image
function saveBase64AsFile(base64, fileName) {
  const link = document.createElement("a");
  link.href = base64;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("image")) {
    document.getElementById("imgPreview").src = localStorage.getItem("image");
  }
});
