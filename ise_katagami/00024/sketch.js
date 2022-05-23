// ここにスケッチ名を指定することができる。
let sketchName = 'My Sketch';

function make_crescent(position1, position2, r1, r2, scale1, scale2) {
    let p1 = Path.Circle(position1, r1);
    let p2 = Path.Circle(position2, r2);
    p1.scale(scale1);
    p2.scale(scale2);
    p1.remove();
    p2.remove();
    return p1.subtract(p2);
}

// この関数は鈴の描き方を定義する。
function draw_suzu(x, y, radius, color) {

    // 鈴の本体を追加する。
    let suzu1 = make_crescent([x, y], [x - radius, y], radius, radius, [1, 1], [1, 0.333]);

    // 鈴の本体は破線で描く。
    suzu1.dashArray = [10,5]; // 線と空白の長さ
    suzu1.fillColor = null; // 塗りの色
    suzu1.strokeColor = color; // 線の色

    // 鈴の上部を追加する。
    let suzu2 = make_crescent([x, y + radius * 1.1], [x, y], radius * 0.5, radius * 1.3, [1, 1], [1, 1]);

    // この部分は塗りだけで線はなしにする。
    suzu2.fillColor = color;
    suzu2.strokeColor = null;

    // 鈴を構成する2つの図形をグループ化する。
    let group = new Group([suzu1, suzu2]);

    // グループをランダムな方向に回転させる。
    group.rotate(Math.random() * 360, [x, y]); // 角度と回転の中心点
    group.scale(1 - Math.random() * 0.15);
}

function draw_hana(x, y, radius, color) {

    let petal_count = 5;
    let theta = 0;
    let theta_step = 360 / petal_count;

    let group = new Group();

    for (let i = 0; i < petal_count; i++) {
        let petal = make_crescent([x + radius, y], [x + radius * 1.5, y], radius * 0.7, radius * 0.8, [1, 0.5], [1, 1]);
        petal.smooth();
        petal.rotate(theta, [x, y]);
        
        group.addChild(petal);

        theta += theta_step;
    }

    let leaf1 = make_crescent([x + radius * 1.5, y], [x + radius * 1.25, y], radius * 0.3, radius * 0.3, [1, 1], [1, 1]);
    let leaf2 = leaf1.clone();
    leaf1.rotate(45);
    leaf2.rotate(-45);
    leaf1.rotate(-10 + theta_step * 0.5, [x, y]);
    leaf2.rotate(10 + theta_step * 0.5, [x, y]);
    group.addChild(leaf1);
    group.addChild(leaf2);

    group.strokeColor = null;
    group.fillColor = color;

    // グループをランダムな方向に回転させる。
    group.rotate(Math.random() * 360, [x, y]); // 角度と回転の中心点
}

function separate(p1, p2, min_distance) {
    let dx = p2[0] - p1[0];
    let dy = p2[1] - p1[1];
    let distance = Math.hypot(dx, dy);
    if (distance < min_distance) {
        let cx = (p1[0] + p2[0]) * 0.5;
        let cy = (p1[1] + p2[1]) * 0.5;
        let theta = Math.atan2(dy, dx);
        let cos = Math.cos(theta);
        let sin = Math.sin(theta);
        let r = min_distance * 0.5;
        p1[0] = cx - cos * r;
        p1[1] = cy - sin * r;
        p2[0] = cx + cos * r;
        p2[1] = cy + sin * r;
    }
}

function separate_points(points, min_distance) {
    let iterations = 3;
    for (let k = 0; k < iterations; k++) {
        for (let i = 0; i < points.length; i++) {
            let p1 = points[i];
            for (let j = i + 1; j < points.length; j++) {
                let p2 = points[j];
                separate(p1, p2, min_distance);
            }
        }
    }
}

function repel(fixed, moving, min_distance) {
    let dx = moving[0] - fixed[0];
    let dy = moving[1] - fixed[1];
    let distance = Math.hypot(dx, dy);
    if (distance < min_distance) {
        let theta = Math.atan2(dy, dx);
        moving[0] = fixed[0] + Math.cos(theta) * min_distance;
        moving[1] = fixed[1] + Math.sin(theta) * min_distance;
    }
}

function repel_points(fixed_points, moving_points, min_distance) {
    let iterations = 3;
    for (let k = 0; k < iterations; k++) {
        for (let i = 0; i < fixed_points.length; i++) {
            let p1 = fixed_points[i];
            for (let j = 0; j < moving_points.length; j++) {
                let p2 = moving_points[j];
                repel(p1, p2, min_distance);
            }
        }
    }
}

function delete_overlaps(points, min_distance) {
    for (let i = 0; i < points.length; i++) {
        let p1 = points[i];
        for (let j = 0; j < points.length; j++) {
            let p2 = points[j];
            if (i !== j && !p1.marked && !p2.marked) {
                let dx = p1[0] - p2[0];
                let dy = p1[1] - p2[1];
                let distance = Math.hypot(dx, dy);
                if (distance < min_distance) {
                    if (Math.random() < 0.5) {
                        p1.marked = true;
                        break;
                    }
                    else {
                        p2.marked = true;
                    }
                }
            }
        }
    }
    return points.filter(x => !x.marked);
}

function random(min, max) {
    return min + Math.random() * (max - min);
}

function random_grid(radius, random_range) {
    let points = [];
    let x = 0;
    while(x < view.viewSize.width) {
        let y = 0;
        while(y < view.viewSize.height) {
            points.push([x + random(-random_range, random_range), y + random(-random_range, random_range)]);
            y += radius;
        }

        x += radius;
    }

    return points;
}

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.addEventListener('load', function(){
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(1000, 500);

    // パラメータを用意する。
    let suzu_radius = view.viewSize.width * 0.015;
    let flower_radius = view.viewSize.width * 0.007;

    let suzu_count = 50;
    let flower_count = 100;

    let foreground_color = '#ffffff';
    let background_color = '#000000';

    // デフォルトの描写スタイルを指定する。
    project.currentStyle = {
        strokeColor: foreground_color, // 線の色
        fillColor: null, // 塗りの色
        strokeWidth: 2, // 線の幅
        strokeCap: 'round',
        strokeJoin: 'round'
    };

    let make_random_position = function() {
        return [Math.random() * view.viewSize.width, Math.random() * view.viewSize.height];
    }

    let points = random_grid(suzu_radius * 4, suzu_radius * 2);
    separate_points(points, suzu_radius * 5);

    let hana_points = random_grid(flower_radius * 4, flower_radius * 2);
    repel_points(points, hana_points, suzu_radius * 2.5);
    separate_points(hana_points, flower_radius * 2);
    hana_points = delete_overlaps(hana_points, flower_radius * 2.5);
    repel_points(points, hana_points, suzu_radius * 2.5);
    separate_points(hana_points, flower_radius * 2.5);

    // 背景を描く
    let bg = Path.Rectangle([0,0], view.viewSize);
    bg.strokeColor = null;
    bg.fillColor = background_color;

    points.forEach(p => draw_suzu(p[0], p[1], suzu_radius, foreground_color));
    hana_points.forEach(p => draw_hana(p[0], p[1], flower_radius, foreground_color));

    // 画面を描く。
    view.draw();
});