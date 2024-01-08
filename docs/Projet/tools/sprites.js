// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL, posX, posY, ctx) {
    var image = new Image();
    image.src = imgURL;
    image.alt = "CanvasImage";
    image.ctx = ctx;

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

    this.animations = {};
    this.currentAnimation = [];
    this.currentTile = 0;
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
CanvasSprite.prototype.selectAnimation = function (nameAnim, loop) {
    this.currentAnimation = this.animations[nameAnim];
    this.currentTile = 0;
    this.loop = loop;
}
// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function () {
    this.currentTile = this.currentTile + 1;
    console.log(this.loop);
    if (this.currentTile >= this.currentAnimation.length) {
        if (this.loop) this.currentTile = 0;
        else {
            this.currentTile = this.currentAnimation.length - 1;
            this.stopAnim();
            return false;
        }
    }
    var tileIndex = this.currentAnimation[this.currentTile];
    drawCanvasImage(
        this.image,
        -this.tileX(tileIndex) * this.widthTile,
        -this.tileY(tileIndex) * this.heightTile
    );
    // L'implémentation permet toujours une tile suivante
    return true;
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
    var canvas = document.getElementById("canvaimage");
    this.image.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.nextTile();
};
// ----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.simpleAnim = function (tps) {
    if (this.timeID == -1) {
        var t = this;
        if (!this.loop && this.currentTile == this.currentAnimation.length - 1) {
            this.currentTile = 0;
        }
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