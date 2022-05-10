// ここにスケッチ名を指定することができる。
let sketchName = '綺麗な絵';

function pickRandom(array) {
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

let randomRangeX = 40;
let randomRangeY = 20;

function drawCloud(x, y) {
    for (let i = 0; i < 20; i++) {
        let rand_x = Math.random() * randomRangeX - randomRangeX * 0.5;
        let rand_y = Math.random() * randomRangeY - randomRangeY * 0.5;
        let sizeX = Math.random() * 5 + 20; 
        let sizeY = Math.random() * 5 + 20;
        let oval = Path.Oval([x + rand_x, y + rand_y], [sizeX, sizeY]);
        oval.opacity = 0.5;
    }
}

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function() {
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    let bg = Path.Rectangle([0, 0], view.viewSize);
    bg.fillColor = '#5497f0';

   

    let randomRange = 5;

    let cloudColor = '#d3deed';

    project.currentStyle = {
        strokeColor: null, // 線の色
        fillColor: cloudColor // 塗りの色
    };

    for (let i = 0; i < 100; i++) {
        let x = Math.random() * view.viewSize.width;
        let y = Math.random() * view.viewSize.height;

        drawCloud(x, y);
    }

    // 画面を描く。
    view.draw();
});