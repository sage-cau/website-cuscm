(()=>{
    let popup = document.querySelector(".popup");
    let close_btn = document.querySelector(".close-btn");
    let popup_content = document.querySelector(".popup-content");
    let popup_img = popup_content.querySelector(".popup-img");
    let link_btn_container = popup_content.querySelector(".link-btn-container");
    let links = popup_content.querySelectorAll("a");
    
    

    window.addEventListener('load', () => {
        close_btn.style.bottom = `${popup_content.offsetHeight + 5}px`;
    });

    
    window.addEventListener('resize', () => {
        close_btn.style.bottom = `${popup_content.offsetHeight + 5}px`;
    });

    close_btn.onclick = () => {
        popup.style.display = "none";
    }

    let today = new Date();
    let start_day = new Date('2021-05-21T00:00:00');
    let end_day = new Date('2021-05-22T23:59:59');
    alert(start_day)
    if(+today >= +start_day && +today <= +end_day) {
        links[0].href = "https://us02web.zoom.us/j/7990705699?pwd=TVZpTVRJUTBNdklEczMrUXMzeUZlUT09";
        links[1].href = "https://www.youtube.com/channel/UCW5f_GaYz2-VFkSBOFfL6Sg/videos";

        popup_img.src = "images/2021_05MT.jpg";
        popup_img.style.paddingBottom = `${link_btn_container.offsetHeight - 2}px`
        link_btn_container.style.opacity = 1;

    }
    else if(today < start_day) {
        popup_img.src = "images/2021_05MT_square.jpg";
    }
    else {
        popup.style.display = "none";
    }
})();