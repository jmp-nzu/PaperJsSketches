// ここにスケッチ名を指定することができる。
let sketchName = '綺麗な絵';

function pickRandom(array) {
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

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

    let randomRange = 5;

    let colors = [
        '#1F363D',
        '#40798C',
        '#70A9A1',
        '#9EC1A3',
        '#CFE0C3'
    ];

    let sizes = [
        5,
        10,
        15
    ];

    for (let y = 0; y < view.viewSize.height; y += 20) {
        for (let x = 0; x < view.viewSize.width; x += 20) {
            let rand_x = Math.random() * randomRange - randomRange * 0.5;
            let rand_y = Math.random() * randomRange - randomRange * 0.5;

            let circle = Path.Circle([x + rand_x, y + rand_y], pickRandom(sizes));

            circle.fillColor = pickRandom(colors);
        }
    }

    // 画面を描く。
    view.draw();
});