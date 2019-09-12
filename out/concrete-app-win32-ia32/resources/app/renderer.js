// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const axios = require('axios');
const ejs = require('ejs');
const {ipcRenderer}  = require('electron');
const path = require('path');
let data;
const tooltip = require(path.join(__dirname,'/plugins/electron-tooltip/src/electron-tooltip'))
tooltip({position: 'bottom'})
var random;
function fetchData() {
    // you might need the next line, depending on your API provider.
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.get('https://mazii.net/api/jlptkanji/5/100/0', {/* here you can pass any parameters you want */})
        .then((response) => {
            $('.loading').remove();
            data = response.data.results;
            loadRandomData();
            if(data){
                random = Math.floor(Math.random() * (data.length - 1));
                $('.large-kanji .content').html(data[random].value.kanji);
            }
        })
        .catch((error) => {

        });
}

$('.f-content').on('click', '.img-kanji-reload', function (e) {
    draw(data[random].value.kanji);
});

$('.f-content').on('click', '.back-main-kanji', function (e) {
    $('.large-kanji .content').html(data[random].value.kanji);
    $('.large-kanji').show();
    $('.content-detail').html('').hide();
    loadRandomData();
});

document.getElementById('close').addEventListener('click', () => {
    ipcRenderer.send('close-app')
});

document.getElementById('next').addEventListener('click', () => {
    random = Math.floor(Math.random() * (data.length - 1));
    $('.large-kanji .content').html(data[random].value.kanji);
});

document.getElementById('setting').addEventListener('click', () => {
    ipcRenderer.send('open-setting')
});

document.getElementById('view').addEventListener('click', () => {
    $('.large-kanji').hide();
    $('.content-detail').show();

    ejs.renderFile(path.join(__dirname,'/index.ejs'), data[random].value, {}, function (err, str) {
        $('.content-detail').html(str);
        loadMemo(data[random].value.mobileId);
        draw(data[random].value.kanji)
    });
    clearInterval(interval);
});

function loadMemo(mobileId){
    axios.post('https://api.mazii.net/api/get-mean', {
        dict: "javi",
        type: "kanji",
        wordId: mobileId
    })
        .then(function (response) {
            let max = 0;
            if(response.data.result.length>0){
                for(let i = 1; i < response.data.result.length; i++){
                    if(response.data.result[i].like-response.data.result[i].dislike > response.data.result[max].like-response.data.result[max].dislike){
                        max = i;
                    }
                }
                if(response.data.result[max].like>response.data.result[max].dislike){
                    document.getElementsByClassName('guideline')[0].innerHTML   = response.data.result[max].mean;
                    document.getElementsByClassName('guideline')[0].setAttribute("data-tooltip", response.data.result[max].mean);
                }
            }
            tooltip({position: 'bottom'})

        })
        .catch(function (error) {
            tooltip({position: 'bottom'})
        });
}



fetchData();
let interval = null;
function loadRandomData() {

    clearInterval(interval);
    interval = setInterval(function(){
        if(data) {
            random = Math.floor(Math.random() * (data.length - 1));
            $('.large-kanji .content').html(data[random].value.kanji);
        }
    }, 30000);
}
let ek;
function draw(kanji) {
    ek = $('#draw-kanji');
    let width =  height = ek.width();
    let options = {
        uri: "kanji/",
        width: width,
        height: height,
        skipLoad: !1,
        autoplay: !0,
        viewBox: {
            x: 0,
            y: 0,
            w: 125,
            h: 125
        },
        step: .01,
        stroke: {
            animated: {
                drawing: !0,
                erasing: !0
            },
            order: {
                visible: !0,
                attr: {
                    "font-size": "8",
                    fill: "#33B5E5"
                }
            },
            attr: {
                active: "#CC0000",
                stroke: "random",
                "stroke-width": 3,
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }
        },
        grid: {
            show: !0,
            attr: {
                stroke: "#CCCCCC",
                "stroke-width": .5,
                "stroke-dasharray": "--"
            }
        }
    };
    ek.html(""), ek.data("plugin_dmak") && (ek.dmak("reset"), ek.data("plugin_dmak", null));
    ek.dmak(kanji, options);
}







