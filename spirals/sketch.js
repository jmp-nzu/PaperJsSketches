// ここにスケッチ名を指定することができる。
let sketchName = 'My Sketch';

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function(){
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    project.currentStyle = {
        strokeColor: '#A44A3F', // 線の色
        fillColor: null, // 塗りの色
        strokeWidth: 1 // 線の幅
    };

    let x = view.viewSize.width * 0.5;
    let y = view.viewSize.height * 0.5;

    let count = 1000;
    let angle = Math.PI * 0.5;
    let length = 10;
    let dl = 0.8;
    let randomRange = 0;


    let points = [];
    let theta = Math.PI * 0.25;

    for (let i = 0; i < count; i++) {
        points.push([x, y]);

        let rand_x = Math.random() * randomRange - randomRange * 0.5;
        let rand_y = Math.random() * randomRange - randomRange * 0.5;

        x += Math.cos(theta) * length + rand_x;
        y += Math.sin(theta) * length + rand_y;

        angle += Math.PI * 0.0001;
        theta += angle;
        length += dl;
    }

    let p = new Path(points);
    p.closed = false;

    // 画面を描く。
    view.draw();
});