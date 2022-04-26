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

    for (let i = 0; i < 200; i++) {
        let x = Math.random() * view.viewSize.width;
        let y = Math.random() * view.viewSize.height;

        Path.Circle([x, y], 5);
    }

    // 画面を描く。
    view.draw();
});