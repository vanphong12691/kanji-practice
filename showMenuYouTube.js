var hideMenu;
const customTitlebar = require('custom-electron-titlebar');
var titlebar;

document.body.onclick = function(e){
    if(titlebar){
        titlebar.dispose();
        titlebar = null;
    }
};

document.getElementsByClassName('mobile-topbar-header-content')[1].onmouseover = function (e) {
    clearTimeout(hideMenu);
    if(typeof titlebar === 'undefined' || titlebar === null){
        titlebar = new customTitlebar.Titlebar({
            backgroundColor: customTitlebar.Color.fromHex('#444')
        });
        titlebar.updateMenuPosition('left');
        titlebar.menubar.dispose();
        e.stopPropagation();

        hideMenuF();

        document.getElementsByClassName('titlebar')[0].removeEventListener('onmouseover', removeHideMenu);
        document.getElementsByClassName('titlebar')[0].onmouseover = removeHideMenu;

        document.getElementsByClassName('titlebar')[0].removeEventListener('onmouseleave', hideMenuF);
        document.getElementsByClassName('titlebar')[0].onmouseleave = hideMenuF;
    }
};

function removeHideMenu(){
    clearTimeout(hideMenu);
}

function  hideMenuF() {
    hideMenu = setTimeout(function () {
        if(titlebar){
            titlebar.dispose();
            titlebar = null;
        }
    }, 1000);
}
