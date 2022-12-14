(() => {
	let yOffset = 0; //widow.scrollY 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 높이값의 핪
	let currentScene = 0; //현재 활성화된(눈 앞에 보고있는 씬)
	let enterNewScene = false; //새로운 scene이 시작되는순간 true
	const sceneInfo = [
		{
			// 0
			type: "sticky",
			heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-0"),
				messageA: document.querySelector("#scroll-section-0 .main-message.a"),
				messageB: document.querySelector("#scroll-section-0 .main-message.b"),
				messageC: document.querySelector("#scroll-section-0 .main-message.c"),
				messageD: document.querySelector("#scroll-section-0 .main-message.d"),
			},
			values: {
				messageA_opacity: [0, 1],
			},
		},
		{
			// 1
			type: "normal",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-1"),
			},
		},
		{
			// 2
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-2"),
			},
		},
		{
			// 3
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-3"),
			},
		},
	];

	function setLayout() {
		//각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[
				i
			].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		yOffset = window.scrollY;
		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute("id", `show-scene-${currentScene}`);
	}

	function calcValues(values, currentYoffset) {
		let rv;

		let scrollRatio = currentYoffset / sceneInfo[currentScene].scrollHeight; //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기

		console.log(scrollRatio);
		rv = scrollRatio * (values[1] - values[0]) + values[0];
		return rv;
	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentOffset = yOffset - prevScrollHeight;

		switch (currentScene) {
			case 0:
				let messageA_opacity_in = calcValues(
					values.messageA_opacity,
					currentOffset
				);
				objs.messageA.style.opacity = messageA_opacity_in;
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			enterNewScene = true;
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}
		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			currentScene++;
			document.body.setAttribute("id", `show-scene-${currentScene}`);
		}
		if (yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene == 0) return; //브라우저 바운스 효과로 인해 마이너스가 되는것을 방지(모바일)
			currentScene--;
			document.body.setAttribute("id", `show-scene-${currentScene}`);
		}
		if (enterNewScene) return;
		playAnimation();
	}

	window.addEventListener("scroll", () => {
		yOffset = window.scrollY;
		scrollLoop();
	});

	window.addEventListener("resize", setLayout);
	window.addEventListener("load", setLayout);
})();
