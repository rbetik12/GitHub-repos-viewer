const setupCollapse = () => {
    window.addEventListener("scroll", function () {
        var headerCollapsed = document.querySelector("header");
        var header = document.getElementById("header-main");
        var main_text = document.getElementById("text-main");
        if (window.pageYOffset >= 70) {
            headerCollapsed.style.opacity = 1;
            header.style.opacity = 0;
            main_text.style.marginTop = "2%";
        } else {
            headerCollapsed.style.opacity = 0;
            header.style.opacity = 1;
            main_text.style.marginTop = 0;
        }
    });
}

export default setupCollapse;