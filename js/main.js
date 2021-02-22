import {setLayout} from './scroll-section-0.js'

(() => {
    let yOffset = 0;

    function checkMenu() {
		if (yOffset > 44) {
			document.body.classList.add('local-nav-sticky');
		} else {
			document.body.classList.remove('local-nav-sticky');
		}
	}

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        // scrollLoop();
        checkMenu();
        setLayout();


        //   if (!rafState) {
        //       rafId = requestAnimationFrame(loop);
        //       rafState = true;
        //   }
    });

    window.addEventListener('resize', () => {
        setLayout();
    });
})();
