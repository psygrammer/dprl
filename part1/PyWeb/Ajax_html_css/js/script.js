/**
 * Created by Chad on 15. 9. 21..
 */
function loadData() {

    var $body = $('body');
    var $greeting = $('#greeting');
    var $wikiElem = $('#wikipedia-links');


    // Load streetview, then display the image to background
    var placeStr = $('#place').val();

    $greeting.text(placeStr + '를 검색하셨네요. ㅎㅎ');

    var placeUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + placeStr ;
        $body.append('<img class="bgimg" src="' + placeUrl + '">');





    // Wikipedia AJAX request
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='
        + placeStr + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("Failed to get Wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl, //데이터를 요청할 url
        dataType: "jsonp", //데이터 타입

        // Callback for jsonp
        success: function(response) { //데이터가 성공적으로 요청되었을때 실행.
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">'   //리스트 붙임
                    + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;

};

$('#form-container').submit(loadData);

// loadData();
