function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = now.toLocaleDateString('zh-CN', options);
    document.getElementById('date-time').textContent = dateTimeString;
}

updateTime(); // 初始化时间
setInterval(updateTime, 1000); // 每秒更新一次时间
