// ここにスケッチ名を指定することができる。
let sketchName = 'Pattern_01';

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function(){
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    let backgroundColor = new Color('#c9e1fc');
    let lineColor1 = new Color('#445E93');
    let lineColor2 = new Color('#7EB2DD');

    let spacingX = view.viewSize.width / 20;
    let spacingY = view.viewSize.height / 20;
    let thinSpacing = 3;
    let offsetX = spacingX * 0.7;
    let offsetY = spacingY * 0.7;

    // 背景を描く
    let background = Path.Rectangle([0, 0], view.viewSize);
    background.fillColor = backgroundColor;

    // 細い線を描く
    let x = offsetX - spacingX * 0.5 - thinSpacing * 0.5;
    let y = offsetY - spacingY * 0.5 - thinSpacing * 0.5;
    project.currentStyle = {
        strokeColor: lineColor2, // 線の色
        fillColor: null, // 塗りの色
        strokeWidth: 1 // 線の幅
    };

    while(x < view.viewSize.width) {
        Path.Line([x, 0], [x, view.viewSize.height]);
        Path.Line([x + thinSpacing, 0], [x + thinSpacing, view.viewSize.height]);
        x += spacingX;
    }

    while(y < view.viewSize.height) {
        Path.Line([0, y], [view.viewSize.width, y]);
        Path.Line([0, y + thinSpacing], [view.viewSize.width, y + thinSpacing]);
        y += spacingY;
    }

    // 太い線を描く
    x = offsetX;
    y = offsetY;

    project.currentStyle = {
        strokeColor: lineColor1, // 線の色
        fillColor: null, // 塗りの色
        strokeWidth: 5 // 線の幅
    };
    
    while(x < view.viewSize.width) {
        Path.Line([x, 0], [x, view.viewSize.height]);
        x += spacingX;
    }

    while(y < view.viewSize.height) {
        Path.Line([0, y], [view.viewSize.width, y]);
        y += spacingY;
    }

    // 画面を描く。
    view.draw();
});