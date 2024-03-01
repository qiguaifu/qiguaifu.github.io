// 初始化游戏
let grid = [];
let currentScore = 0;
let highestScore = localStorage.getItem('highestScore') || 0;
let savedGame = JSON.parse(localStorage.getItem('savedGame'));

if (savedGame) {
    grid = savedGame.grid;
    currentScore = savedGame.currentScore;
    highestScore = savedGame.highestScore;
} else {
    initializeGrid();
    addNumber();
    addNumber();
}

function initializeGrid() {
    for (let i = 0; i < 4; i++) {
        grid[i] = [];
        for (let j = 0; j < 4; j++) {
            grid[i][j] = 0;
        }
    }
}

function addNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({x: i, y: j});
            }
        }
    }
    if (options.length > 0) {
        let spot = options[Math.floor(Math.random() * options.length)];
        grid[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function saveGame() {
    localStorage.setItem('savedGame', JSON.stringify({
        grid: grid,
        currentScore: currentScore,
        highestScore: highestScore
    }));
}

// 页面关闭时保存游戏状态
window.addEventListener('beforeunload', function() {
    saveGame();
});

function updateGrid() {
    let container = document.getElementById('grid-container');
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
            cell.style.backgroundColor = getCellColor(grid[i][j]);
            container.appendChild(cell);
        }
    }
    document.getElementById('current-score').textContent = currentScore;
    document.getElementById('highest-score').textContent = highestScore;
}

function getCellColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#cdc1b4';
    }
}

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (grid[i][j] !== 0) {
                let k = j - 1;
                while (k >= 0 && grid[i][k] === 0) {
                    k--;
                }
                if (k !== j - 1) {
                    grid[i][k + 1] = grid[i][j];
                    grid[i][j] = 0;
                }
                if (k >= 0 && grid[i][k] === grid[i][k + 1]) {
                    grid[i][k] *= 2;
                    currentScore += grid[i][k];
                    if (currentScore > highestScore) {
                        highestScore = currentScore;
                        localStorage.setItem('highestScore', highestScore);
                    }
                    grid[i][k + 1] = 0;
                }
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (grid[i][j] !== 0) {
                let k = j + 1;
                while (k < 4 && grid[i][k] === 0) {
                    k++;
                }
                if (k !== j + 1) {
                    grid[i][k - 1] = grid[i][j];
                    grid[i][j] = 0;
                }
                if (k < 4 && grid[i][k] === grid[i][k - 1]) {
                    grid[i][k] *= 2;
                    currentScore += grid[i][k];
                    if (currentScore > highestScore) {
                        highestScore = currentScore;
                        localStorage.setItem('highestScore', highestScore);
                    }
                    grid[i][k - 1] = 0;
                }
            }
        }
    }
}

function moveUp() {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (grid[i][j] !== 0) {
                let k = i - 1;
                while (k >= 0 && grid[k][j] === 0) {
                    k--;
                }
                if (k !== i - 1) {
                    grid[k + 1][j] = grid[i][j];
                    grid[i][j] = 0;
                }
                if (k >= 0 && grid[k][j] === grid[k + 1][j]) {
                    grid[k][j] *= 2;
                    currentScore += grid[k][j];
                    if (currentScore > highestScore) {
                        highestScore = currentScore;
                        localStorage.setItem('highestScore', highestScore);
                    }
                    grid[k + 1][j] = 0;
                }
            }
        }
    }
}

function moveDown() {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (grid[i][j] !== 0) {
                let k = i + 1;
                while (k < 4 && grid[k][j] === 0) {
                    k++;
                }
                if (k !== i + 1) {
                    grid[k - 1][j] = grid[i][j];
                    grid[i][j] = 0;
                }
                if (k < 4 && grid[k][j] === grid[k - 1][j]) {
                    grid[k][j] *= 2;
                    currentScore += grid[k][j];
                    if (currentScore > highestScore) {
                        highestScore = currentScore;
                        localStorage.setItem('highestScore', highestScore);
                    }
                    grid[k - 1][j] = 0;
                }
            }
        }
    }
}

function canMoveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (grid[i][j] !== 0 && (grid[i][j - 1] === 0 || grid[i][j - 1] === grid[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (grid[i][j] !== 0 && (grid[i][j + 1] === 0 || grid[i][j + 1] === grid[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveUp() {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (grid[i][j] !== 0 && (grid[i - 1][j] === 0 || grid[i - 1][j] === grid[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveDown() {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (grid[i][j] !== 0 && (grid[i + 1][j] === 0 || grid[i + 1][j] === grid[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function checkGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

function handleSwipe(direction) {
    if (!checkGameOver()) {
        let moved = false;
        switch (direction) {
            case 'left':
                if (canMoveLeft()) {
                    moveLeft();
                    moved = true;
                }
                break;
            case 'right':
                if (canMoveRight()) {
                    moveRight();
                    moved = true;
                }
                break;
            case 'up':
                if (canMoveUp()) {
                    moveUp();
                    moved = true;
                }
                break;
            case 'down':
                if (canMoveDown()) {
                    moveDown();
                    moved = true;
                }
                break;
        }
        if (moved) {
            addNumber();
            updateGrid();
            if (checkGameOver()) {
                alert('游戏结束！您的分数：' + currentScore);
            }
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (!checkGameOver()) {
        let direction = '';
        switch (event.key) {
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
        }
        if (direction !== '') {
            handleSwipe(direction);
            event.preventDefault(); // 阻止默认滚动行为
        }
    }
});

// 触摸事件处理滑动手势
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // 阻止默认滚动行为
});

document.addEventListener('touchend', function(event) {
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    // 判断滑动的距离，如果太小则认为是点击，不进行操作
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        return;
    }

    // 判断滑动方向
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            handleSwipe('right');
        } else {
            handleSwipe('left');
        }
    } else {
        if (deltaY > 0) {
            handleSwipe('down');
        } else {
            handleSwipe('up');
        }
    }

    event.preventDefault(); // 阻止默认滚动行为
});

// 重新开始游戏按钮功能
document.getElementById('restart-btn').addEventListener('click', function() {
    currentScore = 0;
    initializeGrid();
    addNumber();
    addNumber();
    updateGrid();
});

// 初始化游戏
initializeGrid();
addNumber();
addNumber();
updateGrid();

var audio = document.getElementById("audio-control");
// 监听音频播放结束事件
audio.addEventListener("ended", function() {
    // 将音频播放进度设置为0，以重新开始播放
    this.currentTime = 0;
    // 调用play()方法开始重新播放音频
    this.play();
});