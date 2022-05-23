// ここにスケッチ名を指定することができる。
let sketchName = '綺麗な絵';

let backgroundColor = '#fff2d6';
let margin = 0.15;

function pickRandom(array) {
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

function drawLine(x, y, w, h) {
    let divs = 3;
    let delta = w > h ? w / divs : h / divs;
    Path.Rectangle([x, y], [w, h]);

    let rs = delta * 0.4;

    if (w > h) {
        x += delta * 0.5;
        y += h * 0.5
    }
    else {
        x += w * 0.5;
        y += delta * 0.5;
    }

    for (let i = 0; i < divs; i++) {
        let c = Path.Circle([x, y], delta * 0.2);
        // let c = Path.Rectangle([x - rs * 0.5, y - rs * 0.5], [rs, rs]);
        c.fillColor = backgroundColor;
        c.rotate(45);
        if (w > h) {
            x += delta;
        }
        else {
            y += delta;
        }
    }
}

function drawSquare(x, y, w, h, dir) {
    let divs = 3;
    let delta = dir ? h / divs : w / divs;

    x += w * margin;
    y += h * margin;

    for (let i = 0; i < divs; i++) {
        if (dir) {
            drawLine(x + w * margin, y + h * margin, w * (1 - margin * 1), h / divs - margin * h);
            y += delta;
        }
        else {
            drawLine(x + w * margin, y + h * margin, w / divs - margin * w, h * (1 - margin * 1));
            x += delta;
        }
        
    }
}

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function() {
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(1000, 1000);

    project.currentStyle = {
        strokeColor: null, // 線の色
        fillColor: '#3b2904', // 塗りの色
        strokeWidth: 1 // 線の幅
    };

    let rows = 20;
    let cols = 20;

    let w = view.viewSize.width / cols;
    let h = view.viewSize.height / rows;

    let x = 0;
    let y = 0;

    let background = Path.Rectangle([0, 0], view.viewSize);
    background.strokeColor = null;
    background.fillColor = backgroundColor;

    for (let i = 0; i < rows; i++) {
        x = 0;
        for (let j = 0; j < cols; j++) {
            let dir = (i + j) % 2;
            drawSquare(x, y, w, h, dir);
            x += w;
        }

        y += h;
    }

    // 画面を描く。
    view.draw();
});