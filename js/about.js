(()=>{

    /* 연혁 첫 번째에 현재 연도 표시*/
    let today = new Date();
    document.querySelector(".current-year").innerHTML = '~' + today.getFullYear() + '.';



    /* 탭 작동 */

    let tabs = document.querySelectorAll('.tab-container [class*="tab"]');
    let sections = document.querySelectorAll("section");

    tabs.forEach( (tab, i) => {
        tab.onclick = () => {
            document.querySelector(".tab-active").classList.remove("tab-active");
            document.querySelector(".section-active").classList.remove("section-active");
            
            tab.classList.add("tab-active");
            sections[i].classList.add("section-active");

            window.scrollTo(0,0);
        };
    });



    /* 이미지 슬라이드 작동 */

    let slides = document.querySelectorAll(".slidewrap");
    let slidesInfo = []

    slides.forEach( async (slide, i) => {
        
        slidesInfo[i] = {
            'current': 0, // 현재 보여줄 번호
            'count': slide.querySelectorAll("li").length // 사진 총 개수
        };

        var pagination = slide.querySelector(".slide-pagination");
        // pagination 만들기 (사진 개수만큼 점 표시)
        for(var j = 0; j < slidesInfo[i].count; j++) {
            var dot = document.createElement("div");
            dot.classList.add("dot");
            pagination.appendChild(dot);
        }
        pagination.querySelector(".dot").classList.add("dot-active");
        

        function nthSlideShow(n) {
            // 슬라이드 이동
            slide.querySelector(".slide-list").style.left = `-${n * 100}%`;
            // 점 표시 업데이트
            slide.querySelector(".dot-active").classList.remove("dot-active");
            slide.querySelectorAll(".dot")[n].classList.add("dot-active");
        }

        slide.querySelector(".right").onclick = () => {
            slidesInfo[i].current = (slidesInfo[i].current + 1) % slidesInfo[i].count;
            nthSlideShow(slidesInfo[i].current);
        };
        slide.querySelector(".left").onclick = () => {
            slidesInfo[i].current = (slidesInfo[i].current - 1 + slidesInfo[i].count) % slidesInfo[i].count;
            nthSlideShow(slidesInfo[i].current);
        };        
    });
})();