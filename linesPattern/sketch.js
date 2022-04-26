// ここにスケッチ名を指定することができる。
let sketchName = '綺麗な絵';

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function() {
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    project.currentStyle = {
        strokeColor: '#A44A3F', // 線の色
        fillColor: null, // 塗りの色
        strokeWidth: 1 // 線の幅
    };

    for (let y = 0; y < view.viewSize.height; y += 20) {
        Path.Line([0, y], [view.viewSize.width, y]);
    }

    for (let x = 0; x < view.viewSize.width; x += 20) {
        Path.Line([x, 0], [x, view.viewSize.height]);
    }

    // 画面を描く。
    view.draw();
});