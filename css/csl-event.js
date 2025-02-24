class ContentScriptLibraryEvent {
    constructor() {
        this.device = false;
        this.islogin = false;
        
        try {
            this.getPlatform();
            itsdcode_script_handleEvent("getUserInfo")
            .then(info => {
                if (info.login) {
                    this.islogin = true;
                }
            })
        } catch (e) {
            console.log(e);
        }

        // 푸쉬 알림 설정 확인용
        this.pushn = 0;
        this.pushChecking = false;
    }
    alert(message, title = " ") {
        itsdcode_script_handleEvent("alert", {
            message: message,
            title: title,
        })
    }
    confirm(message, callback, title = " ", confirmButton = "확인", cancelButton = "취소") {
        itsdcode_script_handleEvent("confirm", {
            message: message,
            title: title,
            confirmButton: confirmButton,
            cancelButton: cancelButton
        }).then (res => {
            if (res) callback();
        })
    }
    route(target, external = false, openApp = false) {
        itsdcode_script_handleEvent("route", {
            target: target,
            external: external,
            openApp: openApp
        })
    }
    joinlottery(eventId, choiceNum = 1, trueCallback = false, falseCallback = false) {
        itsdcode_script_handleEvent("joinlottery", {eventId: eventId, choiceNum: choiceNum})
            .then (({success, message}) => {
                if (trueCallback && success) {
                    trueCallback();
                } else if (falseCallback && !success) {
                    falseCallback();
                } else {
                    this.alert(message);
                }
            })
    }
    coupon(couponId) {
        itsdcode_script_handleEvent("downloadCoupon", {couponId: couponId})
            .then(({success, message}) => {
                if (!success) {
                    this.alert(message);
                } else {
                    this.alert(message || "쿠폰함을 확인해 보세요.");
                }
            })
    }
    signUp() {
        itsdcode_script_handleEvent("route", {
            target: "/signup"
        })
    }
    getPlatform() {
        itsdcode_script_handleEvent("getPlatform")
            .then((res) => {
                if (res.platform == "pc" || res.platform == "mobile") {
                    this.device = res.platform;
                } else {
                    this.device = "app";
                }
            })
    }
    push() {
        if (this.device == "pc" || this.device == "mobile") {
            this.alert("알림 설정은 디코드앱에서 이용 가능합니다.");
        } else {
            itsdcode_script_handleEvent("confirm", {
                message: "알림 설정 화면으로 이동할까요?",
                title: " ",
                confirmButton: "이동하기",
                cancelButton: "뒤로가기"
            }).then (res => {
                if (res) {
                    itsdcode_script_handleEvent("openAppPush");
                };
            })
        }
    }
    push2(url) {
        if (this.device == "pc" || this.device == "mobile") {
            this.alert("알림 설정은 디코드앱에서 이용 가능합니다.");
        } else if (this.islogin == false) {
            itsdcode_script_handleEvent("loginAfterMovePage", {target: url})
            .then(res => {
                this.islogin = res.isLogin
            })
        } else {
            itsdcode_script_handleEvent("getAppPush")
                .then(res => {
                    if (res.success) {
                        itsdcode_script_handleEvent("alert", {message: "알림 신청이 완료되었습니다."})
                        itsdcode_script_handleEvent("setUserInfo", {allowedPush: true})
                    } else {
                        itsdcode_script_handleEvent("openAppPush")
                        .then(() => {
                            if (!this.pushChecking) {
                                this.pushn = 0;
                                let repeatCheck = (n) => {
                                    itsdcode_script_handleEvent("getAppPush")
                                    .then(res2 => {
                                        if (res2.success) {
                                            itsdcode_script_handleEvent("alert", {message: "알림 신청이 완료되었습니다."})
                                            itsdcode_script_handleEvent("setUserInfo", {allowedPush: true})
                                        } else {
                                            if (this.pushn < 10) {
                                                this.pushn++;
                                                this.pushChecking = true;
                                                setTimeout(repeatCheck, 2000);
                                            } else if (this.pushn >= 10) {
                                                this.pushChecking = false;
                                            }
                                        }
                                    })
                                }
                                this.pushn++;
                                setTimeout(repeatCheck, 2000);
                            }
                        })
                    }
                })
        }
    }
    scrollTo(where = 0) {
        try {
            return document.getElementsByClassName("csl-fixedCategoryinner")[0] ? window.scrollTo(0, document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-scrollTo")[where].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight) : window.scrollTo(0, document.getElementsByClassName("iframeWrap")[0].offsetTop + document.getElementsByClassName("csl-scrollTo")[where].offsetTop - document.getElementsByTagName("header")[0].offsetHeight);
        } catch(e) {
            console.log(e);
        }
    }
    scrollToTitle(where = 0) {
        try {
            return document.getElementsByClassName("csl-fixedCategoryinner")[0] ? window.scrollTo(0, document.getElementsByClassName("iframeWrap")[where].offsetTop - document.getElementsByTagName("header")[0].offsetHeight - document.getElementsByClassName("csl-fixedCategoryinner")[0].offsetHeight) : window.scrollTo(0, document.getElementsByClassName("iframeWrap")[where].offsetTop - document.getElementsByTagName("header")[0].offsetHeight) + 1;
        } catch(e) {
            console.log(e);
        }
    }
    fb() {
        this.scrollTo(0);
        try {
            document.getElementsByClassName("csl-fixedCategoryHeader")[0].style.display = "none";
        } catch (e) {
            console.log(e);
        }
    }
}

let cslEvent = document.getElementById("root") == undefined ? undefined : new ContentScriptLibraryEvent();