function func() {
    var ok = window.getComputedStyle(document.getElementById("omg"), null).display;
    if(ok === "block") {
    document.getElementById("omg").style.display = "none"; 
    }
    if(ok === "none") {
    document.getElementById("omg").style.display = "block"; 
    }
    alert(ok)
}