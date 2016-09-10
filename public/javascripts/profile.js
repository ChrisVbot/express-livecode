
$(".viewDoc").on("click", function(){
  var documentId = $(this).data("liveCode");
  var documentUrl = "/livecode/" + documentId;
  window.open(documentUrl);
});

$(".documentTitle").on("keypress", function(e){
  var docId = $(this).parent().parent().data("live-code");
  var newTitle = $(this).val();
  console.log(docId);
  console.log(newTitle);
  // // check 
  if(e.keyCode === 13){

  //   $.ajax({
  //     method: 'POST',
  //     url: '/rename',
  //     data: {
  //       docId: docId,

  //     }
  //   })
    console.log("saving");
  }else{
    console.log("nothing registerd");
  }

})

$(".document").on("click", function(){
  $(".document").not(this).removeClass('highlight');
  $(this).toggleClass('highlight');
  $(this).next().toggleClass('show');
  var docId = $(this).data("live-code");
  console.log(docId);
  $.ajax({
    url: '/profile/test/',
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
// $('input.userSearch').on('keyup',function(e){
//   var value = $(this).val() + '%';
//   $.ajax({
//     url: '/api/profiles',
//     method: 'get',
//     data: {username: value},
//     success: function(data){
//       populateSearchForm(data)
//     },
//     error: function(){console.log("404 error")}
//   });
// });
// function populateSearchForm(userArray){
//   $('.foundUsers').empty();
//   userArray.forEach(function(object){
//     $('<li>')
//       .addClass("userButton")
//       .attr("data-user-id", object.id)
//       .text(object.username)
//       .appendTo($('.foundUsers'));
//   });
// }