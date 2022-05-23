// ここにスケッチ名を指定することができる。
let sketchName = 'My Sketch';

function pickRandom(array) {
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function(){
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    project.currentStyle = {
        strokeColor: null, // 線の色
        fillColor: '#A44A3F', // 塗りの色
        strokeWidth: 0.1 // 線の幅
    };

    let x = view.viewSize.width * 0.5;
    let y = view.viewSize.height * 0.5;

    let colors = ["#d9e5d6","#00a7e1","#eddea4","#f7a072","#ff9b42"];

    let count = 200; // 繰り返しの回数
    let angle = Math.PI * 0.05; // 繰り返す度、角度の変化（ラジアン）
    let length = 1; // 最初の線の長さ（ピクセル）
    let dl = 0.2; // 繰り返す度、長さがどれほど伸びるか（ピクセル）

    let theta = Math.PI * 0.25; // 最初の角度（ラジアン）

    for (let i = 0; i < count; i++) {
        // 座標を計算
        x += Math.cos(theta) * length;
        y += Math.sin(theta) * length;

        // 絵を描く
        let c = Path.Circle([x, y], 10);
        c.fillColor = pickRandom(colors);

        // 移動の角度と長さを更新
        theta += angle;
        length += dl;
    }

    let p = new Path(points);
    p.closed = false;

    // 画面を描く。
    view.draw();
});