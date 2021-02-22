export function setLayout() {
    if (window.innerWidth < 1000) {
        const heightRatio = window.innerHeight / 1920;
        document.querySelector('#canvas-0').style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    } else {
        document.querySelector('#canvas-0').style.transform = `translate3d(-50%, -50%, 0) scale(${850/1920})`;

    }

}

(()=>{
    function playAnimation(){
        let canvas = document.querySelector('#canvas-0');
        let context = canvas.getContext('2d');
        let imgElem1 = new Image();
        imgElem1.src = '/images/front-view-1920.jpg';
                
        imgElem1.onload = function() {
            context.drawImage(imgElem1, 0, 0);
        };
        
        let objs = {
            messageA: document.querySelector('#scroll-section-0 .main-message.a')
        };
        let values = {
            messageA_opacity_in: [0, 1, { start: 0.005, end: 0.1 }],
            messageA_translateY_in: [20, 0, { start: 0.005, end: 0.12 }],

			messageA_opacity_out: [1, 0, { start: 0.17, end: 0.2 }],
			messageA_translateY_out: [0, -20, { start: 0.17, end: 0.2 }]   
        };

        let currentYOffset = window.pageYOffset;
        let scrollHeight = document.querySelector('#scroll-section-0').offsetHeight;

        if (currentYOffset / scrollHeight <= 0.15) {
            // in
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }
        
    }
    function calcValues(values, currentYOffset) {
		let rv;
		// 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
		const scrollHeight = document.querySelector('#scroll-section-0').offsetHeight;

		// const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		if (values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}

    window.addEventListener('load', () => {
        setLayout();
        playAnimation();
    });

    window.addEventListener('scroll', ()=>{
        
        // 메인 CUSCM 타이틀
        if (window.pageYOffset > 20 && window.pageYOffset < 100) {
            document.querySelector('#scroll-section-0 h1').style.opacity = (100 - window.pageYOffset) / 100;
        }
        else if (window.pageYOffset <= 20) {
            document.querySelector('#scroll-section-0 h1').style.opacity = 1;
        }
        else if (window.pageYOffset >= 100) {
            document.querySelector('#scroll-section-0 h1').style.opacity = 0;
        }

        playAnimation();
    });
})();