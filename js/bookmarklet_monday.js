console.log('Loaded font changing bookmarklet!!!');


javascript:(function(){


var v ="2.2.4"; // version of jquery we want to use

if (window.jQuery== undefined || window.jQuery.fn.jquery < v){

    var done = false;
    var script = document.createElement("script");
    script.src="http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js"; // load version of jQuery we specify
    script.onload = script.onreadystatechange = function(){

        if (!done && (!this.readyState || this.readyState=="loaded" || this.readyState =="complete")){

        done = true;
        initMyBookmarklet(); //If jquery is loaded now run my script

        }
    };
document.getElementsByTagName("head")[0].appendChild(script);


}else{
    initMyBookmarklet();
}

function initMyBookmarklet(){
    (window.myBookmarklet = function (){

        //YOUR CODE GOES HERE!
        $(document).mouseup(function(){

        var p=document.getElementsByTagName('p');
        for(i=0;i<p.length;i++){
            if(p[i].style.fontSize){
                var s=parseInt(p[i].style.fontSize.replace("px",""));
            } else {
                var s=12;}s+=2;p[i].style.fontSize=s+"px"}

            });
        $(document).mousedown(function(){

        var p=document.getElementsByTagName('h1');
        for(i=0;i<p.length;i++){
            if(p[i].style.fontSize){
                var s=parseInt(p[i].style.fontSize.replace("px",""));
            } else {
                var s=12;}s+=2;p[i].style.fontSize=s+"px"}

            });


        $(document).ready(function(){
    $("p").hover(function(){
        $(this).css("background-color", "blue");
        }, function(){
        $(this).css("background-color", "red");
    	}, function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "black");

    });
});

    $(document).ready(function(){
    $("h1").hover(function(){
        $(this).css("background-color", "blue");
        }, function(){
        $(this).css("background-color", "red");
    	}, function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "black");

    });
});        

  $(document).ready(function(){
    $("p").click(function(){
        var div = $("p");  
        div.animate({height: 3000}, "500");
        div.animate({width: 3000}, "500");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 1000}, "500");
        div.animate({width: 1000}, "500");
    });
});

 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 3000}, "500");
        div.animate({width: 3000}, "500");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 1000}, "500");
        div.animate({width: 1000}, "500");
    });
});
 $(document).ready(function(){
    $("p").click(function(){
        $("p").after("<h3>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</h3>");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        $("h1").after("<h3>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</h3>");
    });
});
 $(document).ready(function(){
    $("p").click(function(){
        $("p").text("<h3>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</h3>");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        $("h1").text("<h3>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</h3>");
    });
});
 $(document).click(function(){
    $("*").text("<h3>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</h3>");
});
        //YOUR CODE GOES HERE!
    })();

}

})();
