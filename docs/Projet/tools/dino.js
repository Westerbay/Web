//OPTIONS
var animate = false;
var animation_mean = 14.5;
var vitesse = 100;
var loop = false;
var old_loop = -1;
var old_vitesse = -1;

function animation(canvas) {
    animate = !animate;
    animate ? runAnim(canvas) : pauseAnim(canvas);
}

function pauseAnim(canvas) {
    canvas[0].style.animationPlayState = 'paused';
    canvas[1].style.animationPlayState = 'paused';
}

function runAnim(canvas) {
    canvas[0].style.animationPlayState = 'running';
    canvas[1].style.animationPlayState = 'running';
}

function load_animation(sprites) {
    // Add animation
    for (var c in sprites) {
        sprites[c].addAnimation("pause", [0, 1, 2, 3].flatMap(item => [item, item]));
        sprites[c].addAnimation("walk", [4, 5, 6, 7, 8, 9].flatMap(item => [item, item]));
        sprites[c].addAnimation("kick", [10, 11, 12, 13].flatMap(item => [item, item]));
        sprites[c].addAnimation("hurt", [14, 15, 16].flatMap(item => [item, item]));
        sprites[c].addAnimation("run", [17, 18, 19, 20, 21, 22, 23]);
    }

    //Retournement horizontal du 2nd personnage
    for (var c in sprites["yellow"].animations) {
        for (var i = 0; i < sprites["yellow"].animations[c].length; i++) {
            sprites["yellow"].animations[c][i] = 23 - sprites["yellow"].animations[c][i];
        }
    }
}

function load_loop(sprites, canvas) {
    var loop_button = document.getElementById("loop");
    loop = loop_button.checked;

    //Si modification
    if (loop != old_loop) {
        for (var c in sprites) {
            sprites[c].loop = loop;
        }
        //Animation CSS canvas
        if (loop) {
            canvas[0].style.animationIterationCount = 'infinite';
            canvas[1].style.animationIterationCount = 'infinite';
        }
        else {
            canvas[0].style.animationIterationCount = 1;
            canvas[1].style.animationIterationCount = 1;
        }
        old_loop = loop;
        reload(canvas, sprites);
        return;
    }

    // Si la loupe est finie, on reload
    for (var c in sprites) {
        if (sprites[c].end) {
            reload(canvas, sprites);
            break;
        }
    }
}

function load_speed(canvas, sprites) {

    var speed_button = document.getElementById("speed");
    var speed_base = speed_button.value;
    var speed_val = speed.max - speed.value;

    vitesse = 100 * speed_val / speed_base;

    if (old_vitesse != vitesse) {
        //Min_value
        if (vitesse < 10) {
            vitesse = 10;
        }
        //Max_value
        if (vitesse > 990) {
            vitesse = 990;
        }

        // Animation time
        var t = vitesse * animation_mean / 100;
        canvas[0].style.animationDuration = t + 's';
        canvas[1].style.animationDuration = t + 's';

        reload(canvas, sprites);
        old_vitesse = vitesse;
    }

}

// Bouton Start/Stop
function start(canvas, button, sprites) {
    for (var c in sprites) {
        sprites[c].simpleAnim(vitesse);
    }
    button.style.top = '100px';
    canvas[0].classList.add('animate');
    canvas[1].classList.add('animate');
    animation(canvas);
}

function reload(canvas, sprites) {
    animate = false;
    // Rechargement du sprite depuis le début
    for (var c in sprites) {
        var s = sprites[c];
        sprites[c].stopAnim();
        s.selectAnimation(["walk", "walk", "run", "run", "hurt",
            "kick", "kick", "kick", "pause", "pause", "pause",
            "run", "run", "run", "run", "run", "run", "walk"], loop);
        s.currentIndex = 0;
        s.currentTile = 0;
        s.end = false;
    }
    canvas[0].classList.remove('animate');
    canvas[1].classList.remove('animate');
}

function main() {

    var canvas = document.getElementsByTagName('canvas');
    var button = document.getElementById("stop_clic");

    // Creation of sprite
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

    load_animation(sprites);

    // Processus parallèlle cherchant les modifications des options
    setInterval(function () { load_loop(sprites, canvas); }, vitesse);
    setInterval(function () { load_speed(canvas, sprites); }, vitesse);

    pauseAnim(canvas);

    button.addEventListener(
        "click",
        function () { start(canvas, button, sprites); }
    );

}
