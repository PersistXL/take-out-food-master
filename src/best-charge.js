function extracted(selectedItems) {
  let selectedItemsArray = [];

  for (let item of selectedItems) {
    for (let elem of loadAllItems()) {
      if (item.split("x")[0].trim() === elem.id) {
        Object.assign(elem, {
          num: Number(item.split("x")[1].trim()),
          subtotal: Number(item.split("x")[1].trim()) * elem.price
        });
        selectedItemsArray.push(elem);
      }
    }
  }
  return selectedItemsArray;
}

function calculateDiscounts(selectedItemsArray) {
  totalPrice = 0;
  let discountPriceOne = 0;
  let discountPriceTwo = 0;
  // discountPriceOne = selectedItemsArray.reduce((total = 0, item) => total + Number(item.subtotal));
  selectedItemsArray.map(item => {
    totalPrice += item.subtotal;
  });
  if (totalPrice >= 30) {
    discountPriceOne = 6;
  }

  selectedItemsArray.map(item => {
    if (item.id === "ITEM0001" || item.id === "ITEM0022") {
      discountPriceTwo += (item.subtotal / 2);
    }
  });

  if (discountPriceOne > discountPriceTwo) {
    return {discountPrice: discountPriceOne, type: loadPromotions()[0].type, totalPrice: totalPrice - discountPriceOne};
  } else {
    return {discountPrice: discountPriceTwo, type: loadPromotions()[1].type, totalPrice: totalPrice - discountPriceTwo};
  }
}

function bestCharge(selectedItems) {

  //获取相关商品的信息
  let selectedItemsArray = extracted(selectedItems);
  //计算优惠
  let discountInformation = calculateDiscounts(selectedItemsArray);
  //拼接
  let _html_head = `============= 订餐明细 =============\n`;
  let _html_middle = `-----------------------------------\n`;
  let _html_footer = `===================================`;
  let _html_listPrice = ``;
  if(discountInformation.type === '指定菜品半价') {
    var _html_discount = `使用优惠:\n${discountInformation.type}(黄焖鸡，凉皮)，省${discountInformation.discountPrice}元\n`;
  }else {
    var _html_discount = `使用优惠:\n${discountInformation.type}，省${discountInformation.discountPrice}元\n`;
  }
  let _html_total = `总计：${discountInformation.totalPrice}元\n`;
  selectedItemsArray.map(item => {
    _html_listPrice += `${item.name} x ${item.num} = ${item.subtotal}元\n`;
  });
  if (totalPrice>30) {
    _html = _html_head + _html_listPrice + _html_middle + _html_discount + _html_middle + _html_total + _html_footer;
  }else {
    _html = _html_head + _html_listPrice + _html_middle + _html_total + _html_footer;
  }
  return _html;
}
