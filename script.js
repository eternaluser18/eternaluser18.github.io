function func() {
    var ok = window.getComputedStyle(document.getElementById("omg"), null).display;
    if(document.getElementById("omg").classList.contains('active')) {
    document.getElementById("omg").classList.remove('active');
    }
    else {
    document.getElementById("omg").classList.add('active');
    }
    
}