// ここにスケッチ名を指定することができる。
let sketchName = '綺麗な絵';

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function() {
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    project.currentStyle = {
        strokeColor: null, // 線の色
        fillColor: '#A44A3F', // 塗りの色
        strokeWidth: 1 // 線の幅
    };

    let x = 200;
    let y = 200;
    let tileSize = [50, 60];
    let margin = 10;

    let left = x - tileSize[0] * 1.5 - margin;
    let centerX = x - tileSize[0] * 0.5;
    let right = x + tileSize[0] * 0.5 + margin;
    let top = y - tileSize[1] * 1.5 - margin;
    let centerY = y - tileSize[1] * 0.5;
    let bottom = y + tileSize[1] * 0.5 + margin;
    
    // 長方形 : 左上の座標, 幅と高さ
    Path.Rectangle([centerX, top], tileSize);
    Path.Rectangle([centerX, centerY], tileSize);
    Path.Rectangle([centerX, bottom], tileSize);
    Path.Rectangle([left, centerY], tileSize);
    Path.Rectangle([right, centerY], tileSize);

    let star = Path.Star([left + tileSize[0] * 0.5, top + tileSize[1] * 0.5], 5, 10, 25);
    Path.Star([right + tileSize[0] * 0.5, top + tileSize[1] * 0.5], 5, 10, 25);
    Path.Star([left + tileSize[0] * 0.5, bottom + tileSize[1] * 0.5], 5, 10, 25);
    Path.Star([right + tileSize[0] * 0.5, bottom + tileSize[1] * 0.5], 5, 10, 25);

    star.fillColor = '#37ad24';
    star.rotate(45);

    // 画面を描く。
    view.draw();
});