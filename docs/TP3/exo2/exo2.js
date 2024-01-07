var compt = 0;

function incr() {
    var elem = document.getElementById('cpt');
    elem.innerHTML = compt;
    compt += 1;
}

function clc(a) {
    clearInterval(a);
    document.getElementById('cpt').innerHTML = "Temps dépassé";
}