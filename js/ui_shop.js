HTMLElement.prototype.closestByClass = function (className) {
    var target = this;
    while (!target.parentElement.classList.contains(className)) {
        target = target.parentElement;
        if (target.parentElement === null) {
            throw new Error('Not found.');
        }
    }
    return target.parentNode;
};

function rightMenuSettion2(el) {
    includeLayout();
    rightClickMenu($(".right-click-layer"));
    var rightClickLayer = el.querySelector('.right-click-layer');
    rightClickLayer.setAttribute('style', 'display:block;top:' + posTop + ';left:' + posLeft);
    document.querySelector('body').addEventListener('click', function () {
        rightClickLayer.style.display = 'none';
    });
}

var SPECIAL_SHOP = document.querySelectorAll('.special_shop');

for (var i = 0; i < SPECIAL_SHOP.length; i++) {
    SPECIAL_SHOP[i].addEventListener('mousedown', function (e) {
        e.stopPropagation();
        rightMenuSpecialShop(this);
    });
}

function rightMenuSpecialShop(el) {
    event.stopPropagation();
    if (event.button == 2 || event.which == 3) {
        var removeRightMenu = document.querySelector('.right-click-layer');
        if (removeRightMenu !== null) {
            removeRightMenu.parentNode.removeChild(removeRightMenu);
        }
        var div = document.createElement('div');
        div.classList.add('right-click-layer');
        div.setAttribute('data-include', '/include/right_menu.html .right_menu18');
        el.prepend(div);
        rightMenuSettion2(el);
    }
}

function loadPopSpecialShop(el) {
    var $SpecialShopEl = el.closestByClass('special_shop');
    $(".pop_area").load("/include/popup.html #shop_special_item", function () {
        document.querySelector('.mask').style.display = 'block';
        specialShopSetting($SpecialShopEl);
    });
}

function specialShopSetting(SpecialShopTarget) {
    var shop_special_item = document.querySelector('#shop_special_item');
    var special_item_confirm = shop_special_item.querySelector('.btn_apply');
    special_item_confirm.addEventListener("click", specialShopSty);
    function specialShopSty() {
        var isChecked = document.getElementById('dp_type1').checked;
        if (isChecked) {
            SpecialShopTarget.classList.remove('sty2');
        } else {
            SpecialShopTarget.classList.add('sty2');
        }
        shop_special_item.parentNode.removeChild(shop_special_item);
        document.querySelector('.mask').style.display = 'none';
    }
}