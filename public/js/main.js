// ==============================================================
// JQUERY
// ==============================================================
$(document).ready(function(){
  $('#publish').click(function(e){
    let $dropZone = $('#drop-zone').text();
    let $email = $('#email').val();
    let $imgurl = $('#imgurl').val();
    console.log('from jquery : ', $dropZone);
    let $caption = [];
      for ( let i = 0; i < _('drop-zone').children.length; i ++ ) {
        $caption.push(_('drop-zone').children[i].id);
      };
      console.log($caption);
    let $data = {
      email: $email,
      caption: $caption,
      img_url: $imgurl
    }
    console.log($data);
    $.post('/stories', {data: $data}, function(res){
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
          ${caption}
        </div>
      </div>`
      $('.content').append($appendContent);
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

