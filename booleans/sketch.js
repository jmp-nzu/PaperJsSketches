// ここにスケッチ名を指定することができる。
let sketchName = 'パスの合成';

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function(){
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    project.currentStyle = {
        strokeColor: '#000000', // 線の色
        fillColor: '#FFFFFF', // 塗りの色
        strokeWidth: 1 // 線の幅
    };

    // 長方形を追加する。
    let rect = Path.Rectangle([50, 50], [200, 100]);
    let circle = Path.Circle([250, 75], 50);

    // この下の位置だけを非コメント化すると、合成モードの比較ができる。
    let newPath = rect.unite(circle);
    // let newPath = rect.intersect(circle);
    // let newPath = rect.subtract(circle);
    // let newPath = rect.exclude(circle);
    // let newPath = rect.divide(circle);
    

    // 元の図形をシーンから削除する。
    rect.remove();
    circle.remove();


    // 画面を描く。
    view.draw();
});