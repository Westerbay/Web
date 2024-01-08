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

}
// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function () {

}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function (tileIndex) {

}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function (tileIndex) {

}
// -----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.drawTile = function (tileIndex) {

};
// ----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.simpleAnim = function (tps) {

}
// ----------------------------------------------------------------------------------
CanvasSprite.prototype.stopAnim = function () {

}
// ----------------------------------------------------------------------------------