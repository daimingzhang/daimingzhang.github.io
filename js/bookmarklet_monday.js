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
x = 0;
$(document).ready(function(){
    $(window).resize(function(){
        $("p").fonsize(x += 1);
    });
});
        $(document).mousemove(function(){

        var p=document.getElementsByTagName('p');
        for(i=0;i<p.length;i++){
            if(p[i].style.fontSize){
                var s=parseInt(p[i].style.fontSize.replace("px",""));
            } else {
                var s=40;}s+=1;p[i].style.fontSize=s+"px"}

            });
        $(document).mousemove(function(){

        var p=document.getElementsByTagName('h1');
        for(i=0;i<p.length;i++){
            if(p[i].style.fontSize){
                var s=parseInt(p[i].style.fontSize.replace("px",""));
            } else {
                var s=40;}s+=1;p[i].style.fontSize=s+"px"}

            });




 $(document).ready(function(){
    $("p").hover(function(){
        $(this).css("background-color", "blue");
        }, function(){
        $(this).css("background-color", "red");

    });
});    

    $(document).ready(function(){
    $("h1").hover(function(){
        $(this).css("background-color", "blue");
        }, function(){
        $(this).css("background-color", "red");

    });
}); 

     $(document).ready(function(){
    $("content").click(function(){
        var div = $("content");  
        div.animate({height: 300}, "200");
        div.animate({width: 300}, "800");
        div.queue(function () {
            div.css("background-color", "black");  
            div.dequeue();
        });
        div.animate({height: 100}, "900");
        div.animate({width: 100}, "1100");
    });
});
    $(document).ready(function(){
    $("#div").click(function(){
        var div = $("#div");  
        div.animate({height: 300}, "2000");
        div.animate({width: 300}, "800");
        div.queue(function () {
            div.css("background-color", "yellow");  
            div.dequeue();
        });
        div.animate({height: 100}, "900");
        div.animate({width: 100}, "1100");
    });
});
      

  $(document).ready(function(){
    $("p").click(function(){
        var div = $("p");  
        div.animate({height: 300}, "200");
        div.animate({width: 300}, "800");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 100}, "900");
        div.animate({width: 100}, "1100");
    });
});
    $(document).ready(function(){
    $("p").click(function(){
        var div = $("p");  
        div.animate({height: 300}, "100");
        div.animate({width: 300}, "800");
        div.queue(function () {
            div.css("background-color", "blue");  
            div.dequeue();
        });
        div.animate({height: 100}, "1100");
        div.animate({width: 100}, "100");
    });
});

 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 300}, "300");
        div.animate({width: 300}, "1100");
        div.queue(function () {
            div.css("background-color", "blue");  
            div.dequeue();
        });
        div.animate({height: 100}, "4000");
        div.animate({width: 100}, "2000");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 300}, "300");
        div.animate({width: 100}, "1100");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 300}, "100");
        div.animate({width: 100}, "800");
    });
});
 $(document).ready(function(){
    $("p").click(function(){
        $("p").after("<p style='backgroundcolor:red;'>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</p>");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        $("h1").after("<h1 style='backgroundcolor:blue;'>WheeeoooooweeeeoooooWeeeeoooooWeeeeooooo.</h1>");
        $("p").css({
            "transform":'rotate(45deg)',
        })
        $("h1").css({
            "transform":'rotate(45deg)',
        })
    });
});

/*$(document).ready(function(){
    $("p").click(function(){
        $("h1").fadeToggle();
        $("h1").fadeToggle("1100");
        $("h1").fadeToggle(1000);
    });
});
$(document).ready(function(){
    $("h1").click(function(){
        $("p").fadeToggle();
        $("p").fadeToggle("1100");
        $("p").fadein(3000);
    });
});



*//////////








		
 $(document).ready(function(){
    $("input").keydown(function(){
        $("input").css("background-color", "blue");
    });
    $("input").keyup(function(){
        $("input").css("background-color", "red");
    });
});




        //YOUR CODE GOES HERE!
    })();

}

})();
