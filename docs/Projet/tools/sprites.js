// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL, posX, posY, ctx) {
    var image = new Image();
    image.src = imgURL;
    image.alt = "CanvasImage";
    image.canvas = ctx;
    image.ctx = ctx.getContext("2d");

    image.addEventListener("load",
        function () { drawCanvasImage(image, posX, posY) },
        false);
    return image;
}
// -----------------------------------------------------------------------------------
// Dessine l'image sur le canvas
// imge: graphics source
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
function drawCanvasImage(image, posX, posY) {
    image.ctx.drawImage(image, posX, posY);
}
// ===================================================================================
// Constructeur for an animation object
// image: graphics source
// (x, y): position to draw the animation
// width, height: size of each tile
// nbXTiles : nombre de tiles horizontalement
// nbYTiles : nombre de tiles verticallement
// loop : animation en boucle (true) ou non (false)
function CanvasSprite(spriteImgURL, x, y, widthTile, heightTile, nbXTiles, nbYTiles, ctx) {
    this.image = canvasImage(spriteImgURL, x, y, ctx);
    this.widthTile = widthTile;
    this.heightTile = heightTile;
    this.nbXTiles = nbXTiles;
    this.nbYTiles = nbYTiles;

    ctx.width = widthTile;
    ctx.height = heightTile;
    this.ctx = ctx;

    this.animations = {};
    this.currentTile = 0;
    this.currentIndex = 0;
    this.animation = "";
    this.loop = false;
    this.timeID = -1;
}
// -----------------------------------------------------------------------------------
// Ajout d'une animation spécifique
// nameAnim : nom de l'animation
// tiles : tableau d'indices de tile
CanvasSprite.prototype.addAnimation = function (nameAnim, tiles) {
    this.animations[nameAnim] = tiles;
}
// -----------------------------------------------------------------------------------
// Sélectionne une animation spécifique nameAnim
CanvasSprite.prototype.selectAnimation = function (Anim, loop) {
    this.animation = Anim;
    this.currentTile = 0;
    this.loop = loop;
}

// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function () {
    var animation = this.animations[this.animation[this.currentIndex]];
    var havenext = true;
    this.currentTile = this.currentTile + 1;

    if (this.currentTile == animation.length - 1) {
        havenext = false;
    }

    var tileIndex = animation[this.currentTile];
    drawCanvasImage(
        this.image,
        -this.tileX(tileIndex) * this.widthTile,
        -this.tileY(tileIndex) * this.heightTile
    );
    // L'implémentation permet toujours une tile suivante
    return havenext;
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function (tileIndex) {
    return tileIndex % this.nbXTiles;
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function (tileIndex) {
    return Math.floor(tileIndex / this.nbXTiles);
}
// -----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.drawTile = function (tileIndex) {
    this.image.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    if (!this.nextTile()) {
        this.currentTile = 0;
        this.currentIndex += 1;
        if (this.currentIndex >= this.animation.length) {
            this.currentIndex = 0;
            if (!this.loop) {
                this.stopAnim();
            }
        }
    }
};
// ----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.simpleAnim = function (tps) {
    if (this.timeID == -1) {
        var t = this;
        this.timeID = setInterval(function () { t.drawTile(); }, tps);
    } else {
        this.stopAnim();
    }
}

// ----------------------------------------------------------------------------------
CanvasSprite.prototype.stopAnim = function () {
    clearInterval(this.timeID);
    this.timeID = -1;
}
// ----------------------------------------------------------------------------------