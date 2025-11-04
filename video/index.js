document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    const urlParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_campaign", "utm_content", "utm_term"].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            const hiddenInput = document.querySelector(`input[name="${param}"]`);
            if (hiddenInput) hiddenInput.value = value;
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById("submit-btn-1");

        // lock current size so height doesn't jump
        const rect = submitBtn.getBoundingClientRect();
        submitBtn.style.width  = rect.width + "px";
        submitBtn.style.height = rect.height + "px";
        submitBtn.style.display = "inline-flex";
        submitBtn.style.alignItems = "center";
        submitBtn.style.justifyContent = "center";

        const originalContent = submitBtn.innerHTML;

        // show loader
        submitBtn.innerHTML = `
      <div class="wrapper">
        <div class="circle"></div><div class="circle"></div><div class="circle"></div>
        <div class="shadow"></div><div class="shadow"></div><div class="shadow"></div>
      </div>`;
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbwooOKc3doryrUIOql-gJW1CvsTtXr4fRzkZSGXD1XKthPDvtpLMkfSF7g79oJU0LjV/exec", {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then(data => {
                if (data.result === "success") {
                    setTimeout(() => { window.location.href = "https://t.me/yenmapleofficial_bot/"; }, 100);
                } else {
                    // restore on failure
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.width = submitBtn.style.height = "";
                    submitBtn.style.display = submitBtn.style.alignItems = submitBtn.style.justifyContent = "";
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("Something went wrong. Please try again later.");
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.style.width = submitBtn.style.height = "";
                submitBtn.style.display = submitBtn.style.alignItems = submitBtn.style.justifyContent = "";
            });
    });
});

