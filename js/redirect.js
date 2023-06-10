var itemHtml = `
<div class="col">
  <div class="product-item">
	<figure>
	  <div class="link-item" item-id="###GOODS_ID###">
		<img src="../goods/###GOODS_ID###/major/1.jpg"  class="tab-image">
	  </div>
	</figure>
	<h3>###GOODS_NAME###</h3>
	<span class="qty">1 Unit</span><span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>
	<span class="price">$18.00</span>
	<div class="d-flex align-items-center justify-content-between">
	  <div class="input-group product-qty">
		  <span class="input-group-btn">
			  <button type="button" class="quantity-left-minus btn btn-danger btn-number"  data-type="minus" data-field="">
				<svg width="16" height="16"><use xlink:href="#minus"></use></svg>
			  </button>
		  </span>
		  <input type="text" id="quantity" name="quantity" class="form-control input-number" value="10" min="1" max="100">
		  <span class="input-group-btn">
			  <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field="">
				  <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
			  </button>
		  </span>
	  </div>
	  <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></a>
	</div>
  </div>
</div>
`

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

function displayGoods(goods) {
    for (var i = 0; i < goods.length; i++) {
        var goods_id = goods[i].goods_id
        var goods_name = goods[i].goods_name
        var item = itemHtml.replaceAll("###GOODS_ID###", goods_id).replaceAll("###GOODS_NAME###", goods_name)
        var list = $("#trending-pro-list")
        list.prepend(item)
    }
}

$(document).ready(function () {
    readTextFile("/goods/goods.json");

    $(".link-item").on("click", function () {
        var item = $(this)
        var item_id = item.attr('item-id')
        var major_num = item.attr('item-major')
        var desc_num = item.attr('item-desc')
        localStorage.setItem("item_id", item_id);
        localStorage.setItem("major_num", major_num);
        localStorage.setItem("desc_num", desc_num);
        window.location = "single-product.html"
    });
});
