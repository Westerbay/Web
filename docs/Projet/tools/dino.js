function main() {

    var canvas = document.getElementsByTagName('canvas');
    canvas[0].style.animationPlayState = 'paused';
    canvas[1].style.animationPlayState = 'paused';
    var vitesse = 100;
    var animate = false;

    var option = document.getElementById('option');
    var speed_button = document.getElementById("speed");
    var loop_button = document.getElementById("loop");

    var speed_base = speed_button.value;

    var sprites = {
        "red": new CanvasSprite(
            "images/red.png",
            0, 0,
            96, 96,
            24, 1,
            canvas[0]
        ),
        "yellow": new CanvasSprite(
            "images/yellow.png",
            -96 * 23, 0,
            96, 96,
            24, 1,
            canvas[1]
        )
    };

    for (var c in sprites) {
        sprites[c].addAnimation("pause", [0, 1, 2, 3].flatMap(item => [item, item]));
        sprites[c].addAnimation("walk", [4, 5, 6, 7, 8, 9].flatMap(item => [item, item]));
        sprites[c].addAnimation("kick", [10, 11, 12, 13].flatMap(item => [item, item]));
        sprites[c].addAnimation("hurt", [14, 15, 16].flatMap(item => [item, item]));
        sprites[c].addAnimation("run", [17, 18, 19, 20, 21, 22, 23]);
        sprites[c].selectAnimation(["walk", "walk", "run", "run", "hurt",
            "kick", "kick", "kick", "pause", "pause", "pause",
            "run", "run", "run", "run", "run", "run", "walk"], true);
    }

    //Retournement horizontal
    for (var c in sprites["yellow"].animations) {
        for (var i = 0; i < sprites["yellow"].animations[c].length; i++) {
            sprites["yellow"].animations[c][i] = 23 - sprites["yellow"].animations[c][i];
        }
    }

    var button = document.getElementById("stop_clic");
    button.addEventListener(
        "click",
        function () {
            for (var c in sprites) {
                var loop = loop_button.checked;
                var speed_val = speed.max - speed.value;
                vitesse = 100 * speed_val / speed_base;
                if (vitesse < 10) {
                    vitesse = 10;
                }
                if (vitesse > 990) {
                    vitesse = 990;
                }
                var t = vitesse * 12.8 / 100;
                canvas[0].style.animationDuration = t + 's';
                canvas[1].style.animationDuration = t + 's';
                sprites[c].loop = loop;
                if (loop) {
                    canvas[0].style.animationIterationCount = 'infinite';
                    canvas[1].style.animationIterationCount = 'infinite';
                }
                else {
                    canvas[0].style.animationIterationCount = 1;
                    canvas[1].style.animationIterationCount = 1;
                }
                sprites[c].simpleAnim(vitesse);
            }
            animation();
            option.style.top = '-50px';
            button.style.top = '50px';
        },
    );

    function animation() {
        animate = !animate;
        if (animate) {
            canvas[0].style.animationPlayState = 'running';
            canvas[1].style.animationPlayState = 'running';
        }
        else {
            canvas[0].style.animationPlayState = 'paused';
            canvas[1].style.animationPlayState = 'paused';
        }
    }

}
