class ContentScriptLibrary {
    constructor(contentNum) {
        this.body = document.getElementsByClassName("csl")[0];
        this.contentNum = contentNum;
        this.url = `https://dcodecf-dcodeimages1.letsdcode.com/${contentNum}/`;
        this.device = innerWidth > 1080 ? "pc" : "mob";

        // 스크롤 효과를 위한 선언
        this.scrollEl = [];
        this.scrollTrigPos = window.innerHeight / 10 * 7;
        this.scrollY = 0;
        this.offsetTop = 0;
        this.offsetY = 0;
        this.headerHeight = 0;
        this.bindScroll = this.scroll.bind(this);
        this.bindResize = this.resize.bind(this);

        // 스크롤 효과 중 main-visual-parallax-on-select를 위한 선언
        this.mvposElem = document.getElementsByClassName("main-visual-parallax-on-select")[0] ? document.getElementsByClassName("main-visual-parallax-on-select")[0] : false;
        this.mvposBg = document.getElementsByClassName("main-visual-parallax-on-select-bg")[0] ? document.getElementsByClassName("main-visual-parallax-on-select-bg")[0] : false;

        // 스크롤 효과 중 main-visual-parallax-on-select2를 위한 선언
        this.mvposElem2 = document.getElementsByClassName("main-visual-parallax-on-select2")[0] ? document.getElementsByClassName("main-visual-parallax-on-select2")[0] : false;
        this.mvposBg2 = document.getElementsByClassName("main-visual-parallax-on-select-bg2")[0] ? document.getElementsByClassName("main-visual-parallax-on-select-bg2")[0] : false;

        // pc, mobile을 구분지은 이미지를 위한 선언
        this.imgs = [];

        // parallax를 위한 선언
        this.innerHeight = window.innerHeight;
        this.parallax = document.getElementsByClassName("csl-parallax");
        this.parallaxBg = document.getElementsByClassName("csl-parallax-bg");

        // Fixed Nav Bar 만들기 위한 선언
        this.fbIsOn = false;
        this.fixedBar2on = false;
        this.fixedBar_route_on = false;
        this.fbElement = "iframeWrap";
        this.fbStartPos = 0;
        this.fbPos = [];

        this.onStart();
        this.swiper();
        this.swipers = [];
    }
    onStart() {
        this.body.classList.add(`device-${this.device}`);
        this.body.style.display = "block";
        this.body.style.paddingTop = 0;
        this.getSize();

        // 스크롤 효과를 위한 선언
        try {
            for (let i = 0; i < document.getElementsByClassName("csl-scroll").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll")[i])}
            for (let i = 0; i < document.getElementsByClassName("csl-scroll-swiper").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll-swiper")[i])}
            for (let i = 0; i < document.getElementsByClassName("csl-scroll-left").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll-left")[i])}
            for (let i = 0; i < document.getElementsByClassName("csl-scroll-right").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll-right")[i])}
            for (let i = 0; i < document.getElementsByClassName("csl-scroll-up").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll-up")[i])}
            for (let i = 0; i < document.getElementsByClassName("csl-scroll-down").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll-down")[i])}
            for (let i = 0; i < document.getElementsByClassName("csl-scroll-custom").length; i++) {this.scrollEl.push(document.getElementsByClassName("csl-scroll-custom")[i])}
        } catch(err) {
            setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("csl-scroll").length; i++) {document.getElementsByClassName("csl-scroll")[i].classList.add("csl-scroll-on");}
                for (let i = 0; i < document.getElementsByClassName("csl-scroll-swiper").length; i++) {document.getElementsByClassName("csl-scroll-swiper")[i].classList.add("csl-scroll-on");}
                for (let i = 0; i < document.getElementsByClassName("csl-scroll-left").length; i++) {document.getElementsByClassName("csl-scroll-left")[i].classList.add("csl-scroll-on");}
                for (let i = 0; i < document.getElementsByClassName("csl-scroll-right").length; i++) {document.getElementsByClassName("csl-scroll-right")[i].classList.add("csl-scroll-on");}
                for (let i = 0; i < document.getElementsByClassName("csl-scroll-up").length; i++) {document.getElementsByClassName("csl-scroll-up")[i].classList.add("csl-scroll-on");}
                for (let i = 0; i < document.getElementsByClassName("csl-scroll-down").length; i++) {document.getElementsByClassName("csl-scroll-down")[i].classList.add("csl-scroll-on");}
                for (let i = 0; i < document.getElementsByClassName("csl-scroll-custom").length; i++) {document.getElementsByClassName("csl-scroll-custom")[i].classList.add("csl-scroll-on");}
            })
        };
        window.addEventListener("resize", this.bindResize);
        window.addEventListener("scroll", this.bindScroll);

        // 드롭다운 유의사항을 위한 문
        try {
            for (let i = 0; i < document.getElementsByClassName("csl-dropdown").length; i++) {
                document.getElementsByClassName("csl-dropdown-button")[i].addEventListener("click", (e) => {
                    e.currentTarget.parentElement.classList.toggle("csl-dropdown-on");
                    this.bindResize();
                })
            }
        } catch(err) {console.log(err)};

        // pc, mobile을 구분지은 이미지를 위한 선언
        for (let i = 0; i < document.getElementsByTagName("img").length; i++) {
            if (document.getElementsByTagName("img")[i].attributes[0].localName == "data-name") {
                this.imgs[i] = {el: document.getElementsByTagName("img")[i], name: document.getElementsByTagName("img")[i].attributes[0].value}
                this.imgs[i].el.src = `${this.url}${this.imgs[i].name.replace("device", this.device)}`;
            } else if (document.getElementsByTagName("img")[i].attributes[1] && document.getElementsByTagName("img")[i].attributes[1].localName == "data-name") {
                this.imgs[i] = {el: document.getElementsByTagName("img")[i], name: document.getElementsByTagName("img")[i].attributes[1].value}
                this.imgs[i].el.src = `${this.url}${this.imgs[i].name.replace("device", this.device)}`;
            } else if (document.getElementsByTagName("img")[i].attributes[2] && document.getElementsByTagName("img")[i].attributes[2].localName == "data-name") {
                this.imgs[i] = {el: document.getElementsByTagName("img")[i], name: document.getElementsByTagName("img")[i].attributes[2].value}
                this.imgs[i].el.src = `${this.url}${this.imgs[i].name.replace("device", this.device)}`;
            } else if (document.getElementsByTagName("img")[i].attributes[3] && document.getElementsByTagName("img")[i].attributes[3].localName == "data-name") {
                this.imgs[i] = {el: document.getElementsByTagName("img")[i], name: document.getElementsByTagName("img")[i].attributes[3].value}
                this.imgs[i].el.src = `${this.url}${this.imgs[i].name.replace("device", this.device)}`;
            } else if (document.getElementsByTagName("img")[i].attributes[4] && document.getElementsByTagName("img")[i].attributes[4].localName == "data-name") {
                this.imgs[i] = {el: document.getElementsByTagName("img")[i], name: document.getElementsByTagName("img")[i].attributes[4].value}
                this.imgs[i].el.src = `${this.url}${this.imgs[i].name.replace("device", this.device)}`;
            }
        }
    }
    scroll() {
        this.scrollY = Math.abs(document.documentElement.getBoundingClientRect().top);
        this.offsetTop = !Math.abs(this.body.offsetTop) ? this.scrollY : this.headerHeight + this.scrollY - Math.abs(this.body.offsetTop);


        if (this.scrollEl[0]) {
            this.scrollEl.forEach((value, index, arr) => {
                if (value.getBoundingClientRect().top < this.headerHeight + this.scrollTrigPos && !value.classList.contains("csl-scroll-on")) {
                    value.classList.add("csl-scroll-on");
                    arr.splice(index, 1);
                }
            })
        }

        if (this.mvposElem) {
            if (-this.mvposElem.getBoundingClientRect().top < 100) {
                this.mvposBg.style.transform = `translateY(0)`;
            } else if (-this.mvposElem.getBoundingClientRect().top < this.mvposElem.getBoundingClientRect().height) {
                this.mvposBg.style.transform = `translateY(${(this.headerHeight -this.mvposElem.getBoundingClientRect().top - 100) / 4}px)`;
            }
        }

        if (this.mvposElem2) {
            if (-this.mvposElem2.getBoundingClientRect().top < 30) {
                this.mvposBg2.style.transform = `translateY(0)`;
            } else if (-this.mvposElem2.getBoundingClientRect().top < this.mvposElem2.getBoundingClientRect().height) {
                this.mvposBg2.style.transform = `translateY(${(this.headerHeight -this.mvposElem2.getBoundingClientRect().top - 30) / 2.5}px)`;
            }
        }

        for (let i = 0; i < this.parallax.length; i++) {
            if (this.parallax[i].offsetTop > this.offsetTop + this.innerHeight) {
                this.parallaxBg[i].style.transform = "translateY(0)";
            } else if (this.parallax[i].offsetTop <= this.offsetTop + this.innerHeight && this.parallax[i].offsetTop + (this.parallax[i].offsetHeight / 10) > this.offsetTop) {
                this.parallaxBg[i].style.transform = `translateY(${(this.offsetTop + this.innerHeight - this.parallax[i].offsetTop) / (this.innerHeight + (this.parallax[i].offsetHeight / 10)) * ((this.parallaxBg[i].offsetHeight - this.parallax[i].offsetHeight) / this.parallaxBg[i].offsetHeight) * 100}%)`;
            } else if (this.parallax[i].offsetTop + (this.parallax[i].offsetHeight / 10) < this.offsetTop) {
                this.parallaxBg[i].style.transform = `translateY(${((this.parallaxBg[i].offsetHeight - this.parallax[i].offsetHeight) / this.parallaxBg[i].offsetHeight)*100}%)`;
            }
        }

        if (this.fbIsOn) {
            if (this.device =="pc") {
                this.fbStartPos = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop - this.headerHeight;
            } else {
                this.fbStartPos = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop;
            }
            
            if (this.scrollY < this.fbStartPos) {this.fbElem.style.display = "none"} else {this.fbElem.style.display = "block"};

            for (let i = 0; i < this.fbPos.length; i++) {
                try {
                    if (this.fbElement == "iframeWrap") {
                        this.fbPos[i] = document.getElementsByClassName("iframeWrap")[i+1].offsetTop - document.getElementsByClassName("iframeWrap")[0].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight - document.getElementsByClassName("banner_swiper_wrap")[0].offsetHeight;
                    } else if (this.fbElement != "iframeWrap") {
                        this.fbPos[i] = document.getElementsByClassName(this.fbElement)[i+1].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight - document.getElementsByClassName("banner_swiper_wrap")[0].offsetHeight;
                    }
                } catch (e) {
                    if (this.fbElement == "iframeWrap") {
                        this.fbPos[i] = document.getElementsByClassName("iframeWrap")[i+1].offsetTop - document.getElementsByClassName("iframeWrap")[0].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight;
                    } else if (this.fbElement != "iframeWrap") {
                        this.fbPos[i] = document.getElementsByClassName(this.fbElement)[i+1].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight;
                    }
                }
            }
            if (this.fixedBar2on) {
                if (this.offsetTop < this.fbPos[0]) {
                    if (!document.getElementsByClassName("csl-fc-cell")[0].classList.contains("csl-fc-active")) {
                        for (let j = 0; j < document.getElementsByClassName("csl-fc-cell").length; j++) {
                            document.getElementsByClassName("csl-fc-cell")[j].classList.remove("csl-fc-active");
                            if (j == document.getElementsByClassName("csl-fc-cell").length - 1) {
                                document.getElementsByClassName("csl-fc-cell")[1].classList.add("csl-fc-active")
                            }
                        }
                    }
                    if (document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollLeft > 0) {
                        document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollTo(0, 0);
                    }
                } else if (this.offsetTop >= this.fbPos[0] && this.offsetTop < this.fbPos[this.fbPos.length - 1]) {
                    for (let i = 0; i < this.fbPos.length - 1; i++) {
                        if (this.offsetTop >= this.fbPos[i] && this.offsetTop < this.fbPos[i+1] && !document.getElementsByClassName("csl-fc-cell")[i+2].classList.contains("csl-fc-active")) {
                            for (let j = 0; j < document.getElementsByClassName("csl-fc-cell").length; j++) {
                                document.getElementsByClassName("csl-fc-cell")[j].classList.remove("csl-fc-active");
                                if (j == document.getElementsByClassName("csl-fc-cell").length - 1) {
                                    document.getElementsByClassName("csl-fc-cell")[i+2].classList.add("csl-fc-active");
                                }
                            }
                            let wrapScrollTo = 0;
                            for (let k = 0; k <= i; k++) {
                                wrapScrollTo += document.getElementsByClassName("csl-fc-cell-fixed")[k].clientWidth;
                                if (k == i && this.device != "pc") {document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollTo(wrapScrollTo - 30, 0);};
                            }
                        }
                    }
                } else if (this.offsetTop >=  this.fbPos[this.fbPos.length - 1] && !document.getElementsByClassName("csl-fc-cell")[document.getElementsByClassName("csl-fc-cell").length - 1].classList.contains("csl-fc-active")) {
                    for (let j = 0; j < document.getElementsByClassName("csl-fc-cell").length; j++) {
                        document.getElementsByClassName("csl-fc-cell")[j].classList.remove("csl-fc-active");
                        if (j == document.getElementsByClassName("csl-fc-cell").length - 1) {
                            document.getElementsByClassName("csl-fc-cell")[j].classList.add("csl-fc-active")
                        }
                        let wrapScrollTo = 0;
                        for (let k = 0; k <= this.fbPos.length - 1; k++) {
                            wrapScrollTo += document.getElementsByClassName("csl-fc-cell-fixed")[k].clientWidth;
                            if (k == this.fbPos.length - 1) {document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollTo(wrapScrollTo - 30, 0);};
                        }
                    }
                }
            } else {
                if (this.offsetTop < this.fbPos[0]) {
                    if (!document.getElementsByClassName("csl-fc-cell")[0].classList.contains("csl-fc-active")) {
                        for (let j = 0; j < document.getElementsByClassName("csl-fc-cell").length; j++) {
                            document.getElementsByClassName("csl-fc-cell")[j].classList.remove("csl-fc-active");
                            if (j == document.getElementsByClassName("csl-fc-cell").length - 1) {
                                document.getElementsByClassName("csl-fc-cell")[0].classList.add("csl-fc-active")
                            }
                        }
                    }
                    if (document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollLeft > 0) {
                        document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollTo(0, 0);
                    }
                } else if (this.offsetTop >= this.fbPos[0] && this.offsetTop < this.fbPos[this.fbPos.length - 1]) {
                    for (let i = 0; i < this.fbPos.length - 1; i++) {
                        if (this.offsetTop >= this.fbPos[i] && this.offsetTop < this.fbPos[i+1] && !document.getElementsByClassName("csl-fc-cell")[i+1].classList.contains("csl-fc-active")) {
                            for (let j = 0; j < document.getElementsByClassName("csl-fc-cell").length; j++) {
                                document.getElementsByClassName("csl-fc-cell")[j].classList.remove("csl-fc-active");
                                if (j == document.getElementsByClassName("csl-fc-cell").length - 1) {
                                    document.getElementsByClassName("csl-fc-cell")[i + 1].classList.add("csl-fc-active");
                                }
                            }
                            let wrapScrollTo = 0;
                            for (let k = 0; k <= i; k++) {
                                wrapScrollTo += document.getElementsByClassName("csl-fc-cell-fixed")[k].clientWidth;
                                if (k == i && this.device != "pc") {document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollTo(wrapScrollTo - 30, 0);};
                            }
                        }
                    }
                } else if (this.offsetTop >=  this.fbPos[this.fbPos.length - 1] && !document.getElementsByClassName("csl-fc-cell")[document.getElementsByClassName("csl-fc-cell").length - 1].classList.contains("csl-fc-active")) {
                    for (let j = 0; j < document.getElementsByClassName("csl-fc-cell").length; j++) {
                        document.getElementsByClassName("csl-fc-cell")[j].classList.remove("csl-fc-active");
                        if (j == document.getElementsByClassName("csl-fc-cell").length - 1) {
                            document.getElementsByClassName("csl-fc-cell")[j].classList.add("csl-fc-active")
                        }
                        let wrapScrollTo = 0;
                        for (let k = 0; k <= this.fbPos.length - 1; k++) {
                            wrapScrollTo += document.getElementsByClassName("csl-fc-cell-fixed")[k].clientWidth;
                            if (k == this.fbPos.length - 1) {document.getElementsByClassName("csl-fc-wrap-fixed")[0].scrollTo(wrapScrollTo - 30, 0);};
                        }
                    }
                }
            }
        }

        if (this.fixedBar_route_on) {
            if (this.device =="pc") {
                this.fbStartPos = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop - this.headerHeight;
            } else {
                this.fbStartPos = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop;
            }
            
            if (this.scrollY < this.fbStartPos) {this.fbElem.style.display = "none"} else {this.fbElem.style.display = "block"};
        }
    }
    resize() {
        this.getSize();
    }
    getSize() {
        this.scrollY = Math.abs(document.documentElement.getBoundingClientRect().top);
        this.scrollTrigPos = window.innerHeight / 10 * 7;

        if (document.getElementById("_FSBcontainer")) {
            this.headerHeight = parseFloat(window.getComputedStyle(document.getElementById("_FSBcontainer")).paddingTop);
        }

        this.innerHeight = window.innerHeight - this.headerHeight;
        this.scroll();
    }
    onEnd() {
        window.removeEventListener("resize", this.bindResize);
        window.removeEventListener("scroll", this.bindScroll);
        try {
            if (document.getElementsByClassName("csl-fixedCategoryHeader")[0]) {
                document.getElementsByClassName("csl-fixedCategoryHeader")[0].remove();
                this.fbElem.remove();
            }
        } catch (e) {
            console.log(e);
        }
    }
    swiper() {
        this.swiperSlide = new Swiper(".swiperSlide", {
            loop: true,
            allowTouchMove: true,
            speed: 1100,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'slide',
        })
        this.swiperFade = new Swiper(".swiperFade", {
            loop: true,
            allowTouchMove: true,
            speed: 1100,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'fade',
        })
        this.swiperSlideAuto = new Swiper(".swiperSlideAuto", {
            loop: true,
            allowTouchMove: true,
            speed: 1100,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'slide',
            autoplay: {
                delay: 2200,
                disableOnInteraction: true,
            }
        })
        this.swiperFadeAuto = new Swiper(".swiperFadeAuto", {
            loop: true,
            allowTouchMove: true,
            speed: 1100,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'fade',
            autoplay: {
                delay: 2200,
                disableOnInteraction: true,
            }
        })
        this.swiperFast = new Swiper(".swiperFast", {
            loop: true,
            allowTouchMove: false,
            speed: 100,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: "fade",
            autoplay: {
                delay: 500,
                disableOnInteraction: true,
            }
        })
        this.swiperWave = new Swiper(".swiperWave", {
            loop: true,
            allowTouchMove: false,
            speed: 1400,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'slide',
            autoplay: {
                delay: 1100,
                disableOnInteraction: true,
            },
        })
    }
    swiper2(num, slidesPerView = 1) {
        let cslSwiper2 = new Swiper (`.swiper${num}`, {
            loop: true,
            allowTouchMove: true,
            speed: 1000,
            slidesPerView: slidesPerView,
            spaceBetween: 0,
            effect: 'slide',
            autoplay: {
                delay: 2000,
                disableOnInteraction: true,
            },
            pagination: {
                el: `.swiper-pagination${num}`,
                type: 'fraction',
                clickable: false
            },
            navigation: {
                nextEl: `.swiper-button-next${num}`,
                prevEl: `.swiper-button-prev${num}`,
            }
        })
        this.swipers.push(cslSwiper2)
    }
    swiperPager(num, slidesPerView = 1) {
        let cslSwiperPager = new Swiper (`.swiper-pager${num}`, {
            loop: true,
            allowTouchMove: true,
            speed: 1000,
            slidesPerView: slidesPerView,
            spaceBetween: 0,
            effect: 'slide',
            autoplay: {
                delay: 2000,
                disableOnInteraction: true,
            },
            pagination: {
                el: `.swiper-pager-bullet${num}`,
                type: 'bullets',
                clickable: true
            }
        })
        this.swipers.push(cslSwiperPager)
    }
    async fixedBar(element = "iframeWrap", color = ["black", "white"]){
        this.fbElement = element;
        if (this.device == "pc") {
            this.fbTrigger = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName(element)[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop - this.headerHeight;
        } else {
            this.fbTrigger = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName(element)[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop;
        }
        
        this.fbTitle = [];
        
        document.getElementsByClassName("csl-fixedCategoryinner")[0].style.color = color[1];
        document.getElementsByClassName("csl-fixedCategoryinner")[0].style.background = color[0];

        for (let i = 0; i < arguments.length - 2; i++) {
            this.fbTitle.push(arguments[i+2]);
        }

        for (let i = 0; i < arguments.length - 3; i++) {
            if (this.fbElement == "iframeWrap") {
                this.fbPos[i] = document.getElementsByClassName("iframeWrap")[i+1].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight;
            } else if (this.fbElement != "iframeWrap") {
                this.fbPos[i] = document.getElementsByClassName(this.fbElement)[i+1].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight;
            }
        }

        this.fbHeader = document.getElementById("header") || document.getElementsByClassName("headerWrap")[0];
        this.fbElem = document.createElement("div");
        this.fbElem2 = document.createElement("div");
        this.fbElem3 = document.createElement("div");
        this.fbElem.classList.add("csl-fixedCategory");
        this.fbElem.classList.add("csl-fixedCategoryHeader");
        this.fbElem2.classList.add("csl-fc-wrap");
        this.fbElem2.classList.add("csl-fc-wrap-fixed");
        this.fbElem3.classList.add("csl-fc-list");
        this.fbElem3.innerHTML = `<style>.csl-fixedCategoryHeader::before{background-color:${color[0]}!important;}</style><p class="csl-fc-cell" onclick="cslEvent.fb()">${this.fbTitle[0]}</p>`;
        for (let i = 0; i < this.fbTitle.length-1; i++) {
            if (element == "iframeWrap") {
                this.fbElem3.innerHTML += `<p class="csl-fc-cell csl-fc-cell-fixed" onclick="cslEvent.scrollToTitle(${i+1})">${this.fbTitle[i+1]}</p>`
            } else if (element != "iframeWrap") {
                this.fbElem3.innerHTML += `<p class="csl-fc-cell csl-fc-cell-fixed" onclick="cslEvent.scrollTo(${i+1})">${this.fbTitle[i+1]}</p>`
            }
        }

        this.fbElem2.appendChild(this.fbElem3);
        this.fbElem.appendChild(this.fbElem2);
        this.fbHeader.appendChild(this.fbElem);

        this.fbElem.style.background = color[0];
        this.fbElem.style.color = color[1];
        this.fbIsOn = true;

        if (document.getElementsByClassName("csl-fixedCategoryHeader").length > 1) {
            for (let i=0; i < document.getElementsByClassName("csl-fixedCategoryHeader").length - 1; i++) {
                document.getElementsByClassName("csl-fixedCategoryHeader")[0].remove()
            }
        }
    }
    async fixedBar2(element = "iframeWrap", color = ["black", "white"]){
        this.fixedBar2on = true;
        this.fbElement = element;
        if (this.device == "pc") {
            this.fbTrigger = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName(element)[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop - this.headerHeight;
        } else {
            this.fbTrigger = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName(element)[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop;
        }
        
        this.fbTitle = [];
        
        document.getElementsByClassName("csl-fixedCategoryinner")[0].style.color = color[1];
        document.getElementsByClassName("csl-fixedCategoryinner")[0].style.background = color[0];

        for (let i = 0; i < arguments.length - 2; i++) {
            this.fbTitle.push(arguments[i+2]);
        }

        for (let i = 0; i < arguments.length - 4; i++) {
            if (this.fbElement == "iframeWrap") {
                this.fbPos[i] = document.getElementsByClassName("iframeWrap")[i].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight;
            } else if (this.fbElement != "iframeWrap") {
                this.fbPos[i] = document.getElementsByClassName(this.fbElement)[i].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight;
            }
        }

        this.fbHeader = document.getElementById("header") || document.getElementsByClassName("headerWrap")[0];
        this.fbElem = document.createElement("div");
        this.fbElem2 = document.createElement("div");
        this.fbElem3 = document.createElement("div");
        this.fbElem.classList.add("csl-fixedCategory");
        this.fbElem.classList.add("csl-fixedCategoryHeader");
        this.fbElem2.classList.add("csl-fc-wrap");
        this.fbElem2.classList.add("csl-fc-wrap-fixed");
        this.fbElem3.classList.add("csl-fc-list");
        this.fbElem3.innerHTML = `<style>.csl-fixedCategoryHeader::before{background-color:${color[0]}!important;}</style><p class="csl-fc-cell" onclick="cslEvent.fb()"><a href="https://www.itsdcode.com${this.fbTitle[0][1]}" target="_self" style="color:${color[1]}">${this.fbTitle[0][0]}</a></p><p class="csl-fc-cell" onclick="cslEvent.fb()">${this.fbTitle[1]}</p>`;
        for (let i = 0; i < this.fbTitle.length-2; i++) {
            if (element == "iframeWrap") {
                this.fbElem3.innerHTML += `<p class="csl-fc-cell csl-fc-cell-fixed" onclick="cslEvent.scrollToTitle(${i+1})">${this.fbTitle[i+2]}</p>`
            } else if (element != "iframeWrap") {
                this.fbElem3.innerHTML += `<p class="csl-fc-cell csl-fc-cell-fixed" onclick="cslEvent.scrollTo(${i+1})">${this.fbTitle[i+2]}</p>`
            }
        }

        this.fbElem2.appendChild(this.fbElem3);
        this.fbElem.appendChild(this.fbElem2);
        this.fbHeader.appendChild(this.fbElem);

        this.fbElem.style.background = color[0];
        this.fbElem.style.color = color[1];
        this.fbIsOn = true;

        if (document.getElementsByClassName("csl-fixedCategoryHeader").length > 1) {
            for (let i=0; i < document.getElementsByClassName("csl-fixedCategoryHeader").length - 1; i++) {
                document.getElementsByClassName("csl-fixedCategoryHeader")[0].remove()
            }
        }
    }
    async fixedBar_route(color, ActiveNum, ...content){
        if (this.device == "pc") {
            this.fbTrigger = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop- this.headerHeight;
        } else {
            this.fbTrigger = document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetTop;
        }
        
        document.getElementsByClassName("csl-fixedCategoryinner")[0].style.color = color[1];
        document.getElementsByClassName("csl-fixedCategoryinner")[0].style.background = color[0];

        this.fbHeader = document.getElementById("header") || document.getElementsByClassName("headerWrap")[0];
        this.fbElem = document.createElement("div");
        this.fbElem2 = document.createElement("div");
        this.fbElem3 = document.createElement("div");
        this.fbElem.classList.add("csl-fixedCategory");
        this.fbElem.classList.add("csl-fixedCategoryHeader");
        this.fbElem2.classList.add("csl-fc-wrap");
        this.fbElem2.classList.add("csl-fc-wrap-fixed");
        this.fbElem3.classList.add("csl-fc-list");
        this.fbElem3.innerHTML = `<style>.csl-fixedCategoryHeader::before{background-color:${color[0]}!important;}</style>`;
        for (let i = 0; i < content.length; i++) {
            this.fbElem3.innerHTML += `<p class="csl-fc-cell csl-fc-cell-fixed" onclick="itsdcode_script_handleEvent('route', {target: '${content[i][1]}', external: false, openApp: false})"  style="color:${color[1]}">${content[i][0]}</p>`
        }

        this.fbElem2.appendChild(this.fbElem3);
        this.fbElem.appendChild(this.fbElem2);
        this.fbHeader.appendChild(this.fbElem);

        this.fbElem.style.background = color[0];
        this.fbElem.style.color = color[1];
        this.fixedBar_route_on = true;

        document.getElementsByClassName("csl-fc-cell-fixed")[ActiveNum].classList.add("csl-fc-active");
        document.getElementsByClassName("csl-fb-cell-inner")[ActiveNum].classList.add("csl-fc-active");
        

        if (document.getElementsByClassName("csl-fixedCategoryHeader").length > 1) {
            for (let i=0; i < document.getElementsByClassName("csl-fixedCategoryHeader").length - 1; i++) {
                document.getElementsByClassName("csl-fixedCategoryHeader")[0].remove()
            }
        }

        if (ActiveNum > 0 && this.device != "pc") {
            try {
                let scrollX = 0;
            let cell = document.getElementsByClassName("csl-fb-cell-inner");
            for(let i = 0; i < ActiveNum; i++) {
                scrollX += cell[i].offsetWidth;
            }
            let wrap = document.getElementsByClassName("csl-fc-wrap")[1];
            wrap.scrollTo(scrollX, 0);
            } catch(e) {
                console.log(e)
            }
        }
    }
}