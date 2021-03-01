export function setLayout() {
    let canvas = document.querySelector('#canvas-0');

    if (window.innerWidth < 1000) {
        const heightRatio = window.innerHeight / canvas.height;
        canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    } else {
        canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${850/canvas.height})`;

    }

    // canvas = document.querySelector('#image-blend-canvas');

    // if (window.innerWidth < 1000) {
    //     const heightRatio = window.innerHeight / canvas.height;
    //     canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    // } else {
    //     canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${850/1080})`;

    // }

}

(()=>{
    let objs = {
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
    };

    let values = {
        messageA_opacity_in: [0, 1, { start: 0.005, end: 0.06 }],
        messageA_translateY_in: [20, 0, { start: 0.005, end: 0.08 }],

        imgElem2_opacity_in: [0, 1, { start: 0.12, end: 0.19 }],

        messageA_opacity_out: [1, 0, { start: 0.18, end: 0.2}],
        messageA_translateY_out: [0, -20, { start: 0.18, end: 0.2}],
        

        messageB_opacity_in: [0, 1, { start: 0.22, end: 0.3 }],
        messageB_translateY_in: [20, 0, { start: 0.22, end: 0.32 }],
        
        imgElem2_opacity_out: [1, 0, { start: 0.37, end: 0.49 }],

        messageB_opacity_out: [1, 0, { start: 0.48, end: 0.52}],
        messageB_translateY_out: [0, -20, { start: 0.48, end: 0.52}],


        blendWidth: [1080, 1920, { start: 0.53, end: 0.67 }],
        canvas_scale: [ 0, 0, { start: 0.68, end: 0.78 } ],

        messageC_opacity_in: [0, 1, { start: 0.55, end: 0.62 }],
        messageC_translateY_in: [20, 0, { start: 0.55, end: 0.62 }],

        messageC_opacity_out: [1, 0, { start: 0.7, end: 0.8}],
        messageC_translateY_out: [0, -20, { start: 0.7, end: 0.8}],

        imgElem4_opacity_in: [0, 1, { start: 0.8, end: 0.88 }],

        messageD_opacity_in: [0, 1, { start: 0.8, end: 0.88 }],
        messageD_translateY_in: [20, 0, { start: 0.8, end: 0.88 }],

        // messageD_opacity_out: [1, 0, { start: 0.7, end: 0.8}],
        // messageD_translateY_out: [0, -20, { start: 0.7, end: 0.8}],

    };

    
    function playAnimation(){
        let canvas = document.querySelector('#canvas-0');
        let context = canvas.getContext('2d');
        let blendCanvas = document.querySelector('#image-blend-canvas');
        let blendContext = blendCanvas.getContext('2d');
        let imgElem1 = new Image();
        imgElem1.src = '/images/front-view-1920.jpg';
        let imgElem2 = new Image();
        imgElem2.src = '/images/chapel-worship2-1920.jpg';
        let imgElem3 = new Image();
        imgElem3.src = '/images/august-mt-1920-1080.jpg';
        let imgElem4 = new Image();
        imgElem4.src = '/images/pond-view-1920-1080.jpg';
    
        let currentYOffset = window.pageYOffset;
        let scrollHeight = document.querySelector('#scroll-section-0').offsetHeight;

        if (currentYOffset / scrollHeight <= values.messageA_opacity_in[2].end) {
            // in
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        imgElem1.onload = function() {
            imgElem2.onload = function() {
                imgElem3.onload = function() {
                    imgElem4.onload = function() {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        blendContext.clearRect(0, 0, canvas.width, canvas.height);

                        blendContext.globalAlpha = 1;
                        let blendWidth = calcValues(values.blendWidth, currentYOffset);
                        blendContext.drawImage(
                            imgElem3, 
                            (1920 - blendWidth)/2, 0, blendWidth, 1080, 
                            (1920 - blendWidth)/2, 0, blendWidth, 1080
                        );


                        if (currentYOffset / scrollHeight <= values.imgElem2_opacity_in[2].end + 0.1)
                            context.globalAlpha = 1;
                        else
                            context.globalAlpha = 0;
                        // context.globalAlpha = calcValues(values.imgElem1_opacity_out, currentYOffset);
                        context.drawImage(imgElem1, 0, 0);


                        if (currentYOffset / scrollHeight <= values.imgElem2_opacity_in[2].end + 0.1)
                            context.globalAlpha = calcValues(values.imgElem2_opacity_in, currentYOffset);
                        else
                            context.globalAlpha = calcValues(values.imgElem2_opacity_out, currentYOffset);
                        
                        context.drawImage(imgElem2, 0, 0);

                        if (currentYOffset / scrollHeight > values.imgElem4_opacity_in[2].start) {
                            // if (currentYOffset / scrollHeight <= values.imgElem4_opacity_in[2].end + 0.1)
                            //     blendContext.globalAlpha = calcValues(values.imgElem4_opacity_in, currentYOffset);
                            // else
                            //     blendContext.globalAlpha = calcValues(values.imgElem4_opacity_out, currentYOffset);
                            blendContext.globalAlpha = calcValues(values.imgElem4_opacity_in, currentYOffset);
                            
                            blendContext.drawImage(imgElem4, 0, 0);
                        }
                        else {
                            blendContext.globalAlpha = 1;
                        }
                    };
                };
            };
        };

        if (currentYOffset / scrollHeight <= values.messageB_opacity_in[2].end) {
            // in
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }
        
        if (currentYOffset / scrollHeight <= values.messageC_opacity_in[2].end) {
            // in
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (currentYOffset / scrollHeight > values.imgElem2_opacity_out[2].start - 0.01) {
            blendCanvas.classList.add('sticky');
            // objs.messageD.classList.add('sticky-elem');
            blendCanvas.style.opacity = 1;

            const widthRatio = window.innerWidth / blendCanvas.width;
            const heightRatio = window.innerHeight / blendCanvas.height;
            // let canvasScaleRatio;

            if (widthRatio <= heightRatio) {
                // 캔버스보다 브라우저 창이 홀쭉한 경우
                // canvasScaleRatio = heightRatio;
                values.canvas_scale[0] = heightRatio;
                values.canvas_scale[1] = widthRatio * 4/5;
            } else {
                // 캔버스보다 브라우저 창이 납작한 경우
            //     canvasScaleRatio = widthRatio;
                values.canvas_scale[0] = widthRatio;
                values.canvas_scale[1] = heightRatio * 1/2;
            }

            // values.canvas_scale[0] = canvasScaleRatio;
            // values.canvas_scale[1] = document.body.offsetWidth / (1.3 * blendCanvas.width);
            // values.canvas_scale[2].start = values.blendWidth[2].start;
            // values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            blendCanvas.style.transform = `translate3d(-50%, -50%, 0) scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            // blendCanvas.style.marginTop = 0;

            if (currentYOffset / scrollHeight > 0.9) {
                blendCanvas.classList.remove('sticky');
                blendCanvas.style.marginTop = `${scrollHeight * 0.45}px`;

                // objs.messageD.classList.remove('sticky-elem');
                // objs.messageD.style.marginTop = `${scrollHeight * 0.45}px`;
            }
            else {
                blendCanvas.style.marginTop = 0;
            }
        }

        if (currentYOffset / scrollHeight <= values.messageD_opacity_in[2].end) {
            // in
            // objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
            objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } 
        // else {
        //     // out
        //     objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
        //     objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        // }
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
        document.body.classList.remove('before-load');
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