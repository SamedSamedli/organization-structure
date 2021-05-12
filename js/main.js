$(function () {
  function dragElement(elmnt) {
    console.log(elmnt);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  dragElement(document.getElementById("items-wrapper"));
  $(".add-item").click(function addCategory() {
    let parent = this.parentNode.parentNode
    let parentNode = $(parent).find(".element_children")[0]
    let cell = document.createElement("li");
    let input = document.createElement("input");
    let save = document.createElement("span");
    let cancel = document.createElement("span");
    $(save).addClass("save-button")
    $(cancel).addClass("cancel-button")
    cell.appendChild(input)
    parentNode.appendChild(cell)
    $(save).append(`<span class="lnr lnr-checkmark-circle"></span>`)
    $(cancel).append(`<span class="lnr lnr-cross"></span>`)
    $(input).click(function () {
      input.focus()
    })
    $(cancel).click(function () {
      cell.remove();
    })

    function deleteCategory() {
      this.parentNode.parentNode.remove()
    }
    $(save).click(function () {
      if (input.value !== "" || typeof input.value === undefined) {
        let li = document.createElement("li");
        let child_element = document.createElement("div");
        let element_children = document.createElement("ul")
        $(element_children).addClass("element_children")
        $(child_element).addClass("child-element")
        $(child_element).append(`<div class="child-element_text">${input.value} </div>`)
        let add_element = document.createElement("span")
        let delete_element = document.createElement("span")
        add_element.onclick = addCategory
        delete_element.onclick = deleteCategory
        $(add_element).addClass("lnr lnr-plus-circle")
        $(delete_element).addClass("lnr lnr-trash")
        child_element.append(add_element)
        child_element.append(delete_element)
        li.append(child_element)
        $(li).append(element_children)
        parentNode.append(li)
        cell.remove();
      }

    })
    cell.appendChild(cancel)
    cell.appendChild(save)
    input.focus()
    setPositions();
  })
  function saveCell(val) {
    $("#main-element_child").append(`<li> <div class="child-element"> <span>${val} </span> </div> </li>`);
  }

  function setPositions() {
    top = 10;
    $('.items-wrapper').each(function () {
      $(this).css("top", top + "%");
      top += 5;
    });
  }
});
window.onload = function () {
  var currFFZoom = 1;
  var currIEZoom = 100;

  $('#In').on('click', function () {
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6) { //Firefox
      var step = 0.02;
      currFFZoom += step;
      $('#items-wrapper').css('MozTransform', 'scale(' + currFFZoom + ')');
    } else {
      var step = 2;
      currIEZoom += step;
      $('#items-wrapper').css('zoom', ' ' + currIEZoom + '%');
    }
  });

  $('#Out').on('click', function () {
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6) { //Firefox
      var step = 0.02;
      currFFZoom -= step;
      $('#items-wrapper').css('MozTransform', 'scale(' + currFFZoom + ')');

    } else {
      var step = 2;
      currIEZoom -= step;
      $('#items-wrapper').css('zoom', ' ' + currIEZoom + '%');
    }
  });
};

const elements = {
  categories: [
    {
      id: 1,
      text: 'Category',
      subcategory: [
        {
          id: 1,
          text: "Subcategory"
        }
      ]
    }
  ]
}