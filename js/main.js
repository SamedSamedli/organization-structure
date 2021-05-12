$(function() {
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
    $(".add-item").click(function addCategory(){
        let parent =this.parentNode.parentNode
        let parentNode = $(parent).find(".element_children")[0]
        let  cell = document.createElement("li");
        let  input = document.createElement("input");
        let  save = document.createElement("span");
        let  cancel = document.createElement("span");
        $(save).addClass("save-button")
        $(cancel).addClass("cancel-button")
        cell.appendChild(input)
        parentNode.appendChild(cell)
        $(save).append(`<span class="lnr lnr-checkmark-circle"></span>`)
        $(cancel).append(`<span class="lnr lnr-cross"></span>`)
        $(input).click(function () {
           input.focus()
        })
        $(cancel).click(function(){
          cell.remove();
        })
        $(save).click(function(){
          let  li = document.createElement("li");
          let  child_element = document.createElement("div");
          let  element_children = document.createElement("ul")
          $(element_children).addClass("element_children")
          $(child_element).addClass("child-element")
           $(child_element).append(`<div class="child-element_text">${input.value} </div>`)
          let add_element =document.createElement("span")
          add_element.onclick = addCategory 
          $(add_element).addClass("lnr lnr-plus-circle")
          child_element.append(add_element)
          li.append(child_element)
          $(li).append(element_children)
          parentNode.append(li)
          // $("#main-element_child").append(`<li> <div class="child-element"> <div class="child-element_text">${input.value} </div> <span class="lnr lnr-plus-circle"></span> <span class="lnr lnr-pencil"></span> <span class="lnr lnr-cross"></span></li>`);
          cell.remove();
        })
        cell.appendChild(cancel)
        cell.appendChild(save)
        input.focus()
        setPositions();
    })
    function saveCell(val){
      $("#main-element_child").append(`<li> <div class="child-element"> <span>${val} </span> </div> </li>`);
    }

    function setPositions() {
        top=10;
        $('.items-wrapper').each(function () {
            $(this).css("top",top+"%");
            top+=5;
        });
    }
});

const elements = {
  categories:[
    {
      id:1,
      text:'Category',
      subcategory:[
        {
          id:1,
          text:"Subcategory"
        }
      ]
    }
  ]
}