function func() {
    var ok = window.getComputedStyle(document.getElementById("omg"), null).display;
    if(document.getElementById("omg").classList.contains('active')) {
    document.getElementById("omg").classList.remove('active');
    }
    else {
        document.getElementById("omg2").classList.remove('active');
        setTimeout(() => {  document.getElementById("omg").classList.add('active'); }, 200);
        
    }
    
}
function func2() {
    var ok = window.getComputedStyle(document.getElementById("omg2"), null).display;
    if(document.getElementById("omg2").classList.contains('active')) {
    document.getElementById("omg2").classList.remove('active');
    }
    else {
    document.getElementById("omg").classList.remove('active');
    setTimeout(() => {      document.getElementById("omg2").classList.add('active');
 }, 200);
    }
    
}
