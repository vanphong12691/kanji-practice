const remote = require('electron').remote;
const {ipcRenderer}  = require('electron');
document.getElementById('exit').addEventListener('click', () => {
    var window = remote.getCurrentWindow();
    window.close();
});

const storage = require('electron-json-storage');

var data = {
    5: {
        1: {
                label: "1-100"
            }
        },
    4: {
        1: {
                label: "1-100"
            },
        2: {
                label: "101-200"
            }
        },
        3: {
            1: {
                label: "1-100"
            },
            2: {
                label: "101-200"
            },
            3: {
                label: "201-300"
            },
            4: {
                label: "301 ~"
            }
        },
        2: {
            1: {
                label: "1-100"
            },
            2: {
                label: "101-200"
            },
            3: {
                label: "201-300"
            },
            4: {
                label: "301 ~"
            }
        },
        1: {
            1: {
                label: "1-100"
            },
            2: {
                label: "101-200"
            },
            3: {
                label: "201-300"
            },
            4: {
                label: "301-400"
            },
            5: {
                label: "401-500"
            },
            6: {
                label: "501-600"
            },
            7: {
                label: "601-700"
            },
            8: {
                label: "701-800"
            },
            9: {
                label: "801-900"
            },
            10: {
                label: "901-1000"
            },
            11: {
                label: "1001-1100"
            },
            12: {
                label: "1101-1200"
            },
            13: {
                label: "1200 ~"
            }
        }
    };

createDropdown();
document.getElementById('jlptSelect').addEventListener('change', function (e) {
    let jlpt = this.options[this.selectedIndex].value;
    var options = data[jlpt];
    let html = '<option>Select</option>';
    for (let i in options){
        if(i == 1){
            html+= '<option value="'+i+'" selected>'+options[i].label+'</option>'
        }else{
            html+= '<option value="'+i+'">'+options[i].label+'</option>'
        }
    }
    document.getElementById('pageSelect').innerHTML = html;
    createDropdown();
    storage.set('setting', { jlpt: jlpt, page: 1 }, function(error) {
        if (error) throw error;
        ipcRenderer.send('change-setting')
    });


});

document.getElementById('pageSelect').addEventListener('change', function (e) {
    let page = this.options[this.selectedIndex].value;
    let element =document.getElementById('jlptSelect');
    let jlpt = element.options[element.selectedIndex].value;
    storage.set('setting', { jlpt: jlpt, page: page }, function(error) {
        if (error) throw error;
        ipcRenderer.send('change-setting')
    });
});

storage.get('setting', function(error, dt) {
    let jlpt = 5;
    let page = 1;
    if(dt){
        jlpt = dt.jlpt;
        page = dt.page;
    }

    let html = '<option>Select</option>';
    for (let i = 5; i >0; i--){
        if(i== jlpt){
            html+= '<option value="'+i+'" selected>N'+i+'</option>'
        }else{
            html+= '<option value="'+i+'">N'+i+'</option>'
        }
    }
    document.getElementById('jlptSelect').innerHTML = html;


    var options = data[jlpt];
     html = '<option>Select</option>';
    for (let i in options){
        if(i == page){
            html+= '<option value="'+i+'" selected>'+options[i].label+'</option>'
        }else{
            html+= '<option value="'+i+'">'+options[i].label+'</option>'
        }

    }
    document.getElementById('pageSelect').innerHTML = html;
    createDropdown();
});

function createDropdown() {
    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */

    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        if(x[i].getElementsByClassName("select-selected").length){

            x[i].getElementsByClassName("select-selected")[0].remove();
            x[i].getElementsByClassName("select-items")[0].remove();
        }
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    s.options[i].removeAttribute('selected');
                }
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        s.options[i].setAttribute('selected', 'selected');
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        s.dispatchEvent(new Event('change'))
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            if(this.nextSibling)
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);