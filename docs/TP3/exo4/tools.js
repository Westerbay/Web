function randomInteger(minval, maxval) {
    if (minval == 0) return Math.floor(Math.random() * (maxval - minval + 1) + minval - 1);
    return Math.floor(Math.random() * (maxval - minval + 1) + minval);
}
