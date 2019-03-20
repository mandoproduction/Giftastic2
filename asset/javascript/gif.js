//Global Variables
$(document).ready(function () {
    var topics = ["dog", "baseball", "football", "comedy", "Nicky Minage", "Beyonce"];
    var stillimgUrl = '';
    var animateimgUrl = '';
    var gifConditions = '';
    var stillUrl = '';
    var animateUrl = '';

    //Fuctions
    var createBtn = function () {
        $("#btn-section").empty();
        for (i = 0; i < topics.length; i++) {
            var newBtn = $("<button>");
            newBtn.attr('data-name', topics[i]);
            newBtn.attr('class', 'gif');
            newBtn.text(topics[i]);
            $("#btn-section").append(newBtn);
        }
    }
    $('#submit-btn').on('click', function (event) {
        submit();
    });

    $(".search").keydown(function (event) {
        if (event.keyCode == 13) {

            submit();
            $('.search').val("");
            return false
        }
    });

    var submit = function () {
        event.preventDefault();
        var inputVal = $('#userInput').val();
        topics.push(inputVal);
        createBtn();
    }
    var displayGif = function () {
        //Gets the value of the button that is clicked
        var btnVal = $(this).data('name');
        //Api URL and key
        var apiKey = 'N6YoxTFDusv0uN7frsf4Cfq78zOSHAcf';
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function (response) {
            $('.gifSection').empty();
            let newH1 = $('<h1>');
            newH1.html(btnVal);
            newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 10; i++) {
                stillimgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateimgUrl = response['data'][i]['images']['fixed_height']['url'];
                //rating
                var rating = response['data'][i]['rating'];

                var newDiv = $('<div>');
                var newP = $('<p>');
                var newImg = $('<img>');

                newImg.attr('data-still', stillimgUrl);
                newImg.attr('data-animate', animateimgUrl);
                newImg.attr('src', stillimgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv);
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv);
            }
        });
    }
    var gifAnimate = function () {
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'still') {
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');
        } else if (gifCondition === 'animate') {
            //Change src to still
            $(this).attr('src', stillUrl);
            //Switch the data-type to still
            $(this).data('type', 'still');
 
        }
    }
    /*Main
      ==============================================================*/
    createBtn();
    // submit();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});















