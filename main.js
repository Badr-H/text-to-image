import "./style.css";

const from = document.getElementById("form");

from.addEventListener("submit", async (e) => {
  showSpinner();
  e.preventDefault();

  const formData = new FormData(from);
  const prompt = formData.get("prompt");
  const clr = formData.get("clr").replace("#", "");
  const size = formData.get("size");

  try {
    const response = await fetch(
      `http://localhost:8080/dream?prompt=${encodeURIComponent(
        prompt
      )}&clr=${encodeURIComponent(clr)}&size=${size}`
    );

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    /* the jsonResponse is an object with a "image" property and its structure is like 
    : Object { image: {…} }
    image: Object { status: "OK", message: null, direct_link: "https://i.imgbun.com/1vx82RrmkMJPPP.png"
    so to accsess the image itself we need to use jsonResponse.image.direct_link
    */

    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${jsonResponse.image.direct_link}"  />`;
  } catch (error) {
    alert("An error occurred");
    console.log(error);
    console.log("An error occurred", error);

    // Handle the error appropriately, e.g., display an error message to the user
  }
  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML = 'Generating... <span class="spinner">     ⌛</span>';
}

function hideSpinner() {
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Generate";
}
