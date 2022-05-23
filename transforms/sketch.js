// ここにスケッチ名を指定することができる。
let sketchName = 'My Sketch';

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function(){
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    project.currentStyle = {
        strokeColor: '#A44A3F', // 線の色
        fillColor: '#FFFFFF', // 塗りの色
        strokeWidth: 0.5 // 線の幅
    };

    let x = view.viewSize.width * 0.5;
    let y = view.viewSize.height * 0.5;

    let count = 150;
    let length = 50;
    let angle = 25; // PaperJSはラジアンではなく度です！
    let theta = 90;

    let background = Path.Rectangle([0,0],[view.viewSize.width, view.viewSize.height]);
    background.strokeColor = null;
    background.fillColor = '#f7e4e1';

    for (let i = 0; i < count; i++) {
        let p1 = Path.Rectangle([x + length, y], [15,15]);
        let p2 = Path.Rectangle([x + length, y], [15,15]);
        let rand = Math.random() * 0;
        p1.rotate(rand + 45);
        p1.rotate(theta, [x, y]);
        p2.rotate(rand);
        p2.rotate(theta, [x, y]);

        p1.strokeColor = null;
        p1.fillColor = p2.strokeColor;

        theta += angle;
        length += 2;
    }


    // 画面を描く。
    view.draw();
});