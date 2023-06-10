var major = $('#major-swiper')
var desc = $('.desc-content')

var item_id = localStorage.getItem("item_id");


$(document).ready(function () {
    readTextFile("/goods/" + item_id + "/detail.json");


});

function displayGoods(goods_detail) {
    var major_num = goods_detail["item-major"]
    var desc_num = goods_detail["item-desc"]
    for (var i = 1; i <= major_num; i++) {
        var item = '<div class="swiper-slide"><div class="row banner-content p-5"><img src="../goods/' + item_id + '/major/' + i + '.jpg" alt="single-product" class="img-fluid"></div></div>'
        major.append(item)
    }
    for (var i = 1; i <= desc_num; i++) {
        var item = '<div class="d-flex flex-wrap justify-content-center"><img src="../goods/' + item_id + '/desc/' + i + '.jpg" alt="single-product" class="img-fluid"></div>'
        desc.append(item)
    }
}

function readTextFile(fileName) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var goods = JSON.parse(allText)
                displayGoods(goods)
            }
        }
    }
    rawFile.send(null);
}