// 헤더와 푸터를 로드하는 함수
function includeHTML() {
    // 헤더 로드
    fetch('https://raw.githubusercontent.com/wonnyru7/portfolio_2025/refs/heads/main/css/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    // 푸터 로드
    fetch('https://raw.githubusercontent.com/wonnyru7/portfolio_2025/refs/heads/main/css/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', includeHTML);

