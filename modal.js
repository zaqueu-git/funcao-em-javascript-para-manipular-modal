let modal = document.querySelector(".modal");
let scriptsModal = [];

function openModal(nameModal, urlPage) {
  const modalDinamic = modal.querySelector("." + nameModal);
  const loader = modal.querySelector(".loader");

  modal.style.display = "flex";
  loader.style.display = "flex";

  fetch(urlPage)
    .then(function (response) {
      response.text().then(function (result) {
        const parser = new DOMParser();
        var pageHtml = parser.parseFromString(result, "text/html");
        const pageScripts = pageHtml.querySelectorAll("script");

        for (let i = 0; i < pageScripts.length; i++) {
          const elementScript = document.createElement("script");
          elementScript.type = "text/javascript";
          elementScript.src = pageScripts[i].getAttribute("src");
          elementScript.id = "script-" + nameModal + "-" + i;
          pageScripts[i].remove();
          scriptsModal.push(elementScript);
        }

        pageHtml = pageHtml.body.outerHTML;
        pageHtml = pageHtml.replace("<body>", "");
        pageHtml = pageHtml.replace("</body>", "");
        modalDinamic.innerHTML = pageHtml;

        for (let i = 0; i < scriptsModal.length; i++) {
          modalDinamic.appendChild(scriptsModal[i]);
        }

        loader.style.display = "none";
        modalDinamic.style.display = "flex";

        let btnCloseModal = modalDinamic.querySelector(".modal-close-icon");
        btnCloseModal.addEventListener("click", closeModal);
        btnCloseModal.nameModal = nameModal;
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}

function closeModal(event) {
  const nameModal = event.currentTarget.nameModal;

  const pageModal = document.querySelector("." + nameModal);
  pageModal.innerHTML = "";

  modal.style.display = "none";
}
