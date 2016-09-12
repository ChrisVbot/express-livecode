
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
  $('.overlay').fadeIn();
  $('.contributorForm').animate({top: "150px"}, 500);
  var docId = $(this).data("live-code");
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

 $('.closeContributorForm').on("click", function(){
    $('.overlay').fadeOut();
    $('.contributorForm').animate({top: "-1000px"}, 500);
  });

function populateContributors(userArray){
  var contributors = $('.contributors');
  contributors.empty();
  userArray.forEach(function(user){
  contributors.append("<li>" + user.username + " " + "</li>");
  });
};

