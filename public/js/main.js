// ==============================================================
// JQUERY
// ==============================================================
$(document).ready(function(){
  $('#publish').click(function(e){
    let imgurl = $('#imgurl').attr('src');
    let caption = [];
    for ( let i = 0; i < _('drop-zone').children.length; i ++ ) {
      caption.push(_('drop-zone').children[i].innerHTML);
    };
    let allCaption = caption.join(' ');
    let data = {
      caption: allCaption,
      img_url: imgurl
    }
    $.post('/stories', {data: data}, function(res) {
       window.location.pathname = '/';
    });
  });

  const $deleteBtn = $('.delete');
  $deleteBtn.on('click', function(event) {
    $.ajax({
      url: '/stories/' + event.target.id,
      type: 'DELETE',
      success: function(res) {
        event.target.parentElement.remove();
      }
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
  // _('app-status').innerHTML = 'dragging : ' + event.target.getAttribute('id');
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.setData( 'text', event.target.getAttribute('id') );
};

function dragEnter(event){
  // _('app-status').innerHTML = 'You are dragging : ' + event.target.getAttribute('id');
};

function dragLeave(event){
  // _('app-status').innerHTML = 'You left : ' + event.target.getAttribute('id');
};

function dragDrop(event){
  var elmId = event.dataTransfer.getData('text');
  event.target.appendChild( _(elmId) );
  // _('app-status').innerHTML = 'Dropped ' + elmId + 'into the ' + event.target.getAttribute('id');
  // _(elmId).removeAttribute('draggable');
  // _(elmId).style.cursor = 'default';
  droppedIn='true';
};

function dragEnd(event){
  if (droppedIn == false) {
    // _('app-status').innerHTML='You let the ' + event.target.getAttribute('id') + ' go';
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


