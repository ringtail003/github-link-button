'use strict';

var $element = $('<button class="btn btn-default btn-sm">copy</button>');
$('.gh-header-title').prepend($element);

$element.on('click', () => {
  let generator = new LinkGenerator();
  let clipboard = new Clipboard();
  clipboard.copy(generator.generate());
});

class LinkGenerator{
  generate(){
    return this.format(
        this.readNumber(),
        window.location.href,
        this.readTitle()
    );
  }
  format(number,url,title){
    return `[${number.replace("#","")}](${url}) ${title}`;
  }
  readTitle(){
    return $('.js-issue-title').text();
  }
  readNumber(){
    return $('.gh-header-number').text();
  }
}

class Clipboard{
  addHiddenElement(text,container){
    let $element = $(`<textarea>${text}</textarea>`);
    $element.css('display','hidden');
    $(container || 'body').append($element);

    return $element; 
  }
  removeElement($element){
    $element.remove();
  }
  copy(text){
    let $element = this.addHiddenElement(text);
    $element.select();
    document.execCommand("copy");
    this.removeElement($element);
  }
}

