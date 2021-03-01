(()=>{
    let today = new Date();
    document.querySelector(".current-year").innerHTML = '~' + today.getFullYear() + '.';

    document.querySelector(".about-tab").onclick = () => {
        document.querySelector(".about-tab").classList.add("active-tab");
        document.querySelector(".history-tab").classList.remove("active-tab");
        document.querySelector(".rules-tab").classList.remove("active-tab");
        document.querySelector(".about").style.display = "block";
        document.querySelector(".history").style.display = "none";
        document.querySelector(".rules").style.display = "none";
    };

    document.querySelector(".history-tab").onclick = () => {
        document.querySelector(".about-tab").classList.remove("active-tab");
        document.querySelector(".history-tab").classList.add("active-tab");
        document.querySelector(".rules-tab").classList.remove("active-tab");
        document.querySelector(".about").style.display = "none";
        document.querySelector(".history").style.display = "block";
        document.querySelector(".rules").style.display = "none";
    };

    document.querySelector(".rules-tab").onclick = () => {
        document.querySelector(".about-tab").classList.remove("active-tab");
        document.querySelector(".history-tab").classList.remove("active-tab");
        document.querySelector(".rules-tab").classList.add("active-tab");
        document.querySelector(".about").style.display = "none";
        document.querySelector(".history").style.display = "none";
        document.querySelector(".rules").style.display = "block";
    };
})();