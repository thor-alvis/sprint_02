// ==============================================================
// JQUERY
// ==============================================================
$(document).ready(function(){
  $('#publish').click(function(e){
    let $dropZone = $('#drop-zone').text();
    console.log('from jquery : ', $dropZone);
    let $caption = [];
      for ( let i = 0; i < _('drop-zone').children.length; i ++ ) {
        $caption.push(_('drop-zone').children[i].id);
      };
      console.log($caption);
    let $data = {
      email: USERNAME,
      caption: $caption,
      img_url: GIF
    }
    console.log($data);
    $.post('/', {data: $data}, function(res){
      const $appendContent =
      `<div class="content">
        <article class="media">
          <figure class="media-center">
            <p class="image"> IMG
              <img src="${img_url}">
            </p>
          </figure>
        </article>
        <div class="content-text">
          <div class="words" id="word1">WORD1</div>
          <div class="words" id="word2">WORD2</div>
          <div class="words" id="word3">WORD3</div>
          <div class="words" id="word4">WORD4</div>
          <div class="words" id="word5">WORD5</div>
          <div class="words" id="word6">WORD6</div>
          <div class="words" id="word7">WORD7</div>
          <div class="words" id="word8">WORD8</div>
          <div class="words" id="word9">WORD9</div>
          <div class="words" id="word10">WORD10</div>

          <div id="drop-zone" ondragenter="dragEnter(event)" ondrop="dragDrop(event)" ondragover="return false" ondragleave="dragLeave(event)">CAPTION : </div>


        </div>

      </div>`


    })



  })
})

// ==============================================================
// DRAGULA - DRAG AND DROP
// ==============================================================

function _(id) {
  return document.getElementById(id);
}

var droppedIn = false;

function dragStart(event){
  _('app-status').innerHTML = 'dragging : ' + event.target.getAttribute('id');
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.setData( 'text', event.target.getAttribute('id') );
};

function dragEnter(event){
  _('app-status').innerHTML = 'You are dragging : ' + event.target.getAttribute('id');
};

function dragLeave(event){
  _('app-status').innerHTML = 'You left : ' + event.target.getAttribute('id');
};

function dragDrop(event){
  var elmId = event.dataTransfer.getData('text');
  event.target.appendChild( _(elmId) );
  _('app-status').innerHTML = 'Dropped ' + elmId + 'into the ' + event.target.getAttribute('id');
  // _(elmId).removeAttribute('draggable');
  // _(elmId).style.cursor = 'default';
  droppedIn='true';
};

function dragEnd(event){
  if (droppedIn == false) {
    _('app-status').innerHTML='You let the ' + event.target.getAttribute('id') + ' go';
  }

  droppedIn = false;
};

function readDropZone(){
var caption = [];
  for ( var i = 0; i < _('drop-zone').children.length; i ++ ) {
    // console.log( _('drop-zone').children[i].id + ' is in the dropzone' );
    caption.push(_('drop-zone').children[i].id);
  };
  console.log(caption);
  _('app-status').innerHTML=caption;
};

// brad's and kris main.js testing
//  var imgdata = $('#storypost').attr('src');
//  console.log('imgdata =', imgdata);
//  var data = {
//         imgdata: imgdata
//  }

// $('#submit').on('click', (evt) => {
//   console.log('clicked');
//   // console.log('imgdata = ', imgdata);
//   $.post('/stories', data, (err,response) => {
//     console.log('response=', response);


//   })
// })

//

