
$(".viewDoc").on("click", function(){
  var documentId = $(this).data("liveCode");
  var documentUrl = "/livecode/" + documentId;
  window.open(documentUrl);
});

$(".documentTitle").on("keypress", function(e){
  var thisDoc = $(this);
  var docId = thisDoc.parent().parent().data("live-code");
  var newTitle = thisDoc.html();
  if(e.keyCode === 13){
    e.preventDefault();
    thisDoc.next().focus();
    $.ajax({
      method: 'POST',
      url: '/profile/rename/',
      data: {
        docId: docId,
        newTitle: newTitle
      },
      success: function(data){
        console.log('Successfully posted');
        thisDoc.blur().next().focus();
        return false;
      }
    })
  }else{
    console.log("Nothing registered");
  }
});

$(".document").on("click", function(){
  $(".document").not(this).removeClass('highlight');
  $(this).toggleClass('highlight');
  $(this).next().toggleClass('show');
  var docId = $(this).data("live-code");
  console.log(docId);
  $.ajax({
    url: '/profile/contributors/',
    method: 'get',
    data: {documentId: docId},
    success: function(data){
      populateContributors(data.Users)
    },
    error: function(){console.log('Could not grab contributors')}
  })
});

function populateContributors(userArray){
  var expandDocument = $('.expand-document')
  expandDocument.empty();
  expandDocument.append("Contributors: ");
  userArray.forEach(function(user){
    expandDocument.append(user.username + " ");
  });
};

