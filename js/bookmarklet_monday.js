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
        div.animate({height: 1000}, "1500");
        div.animate({width: 1000}, "1500");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 500}, "1500");
        div.animate({width: 500}, "1500");
    });
});
    $(document).ready(function(){
    $("p").click(function(){
        var div = $("p");  
        div.animate({height: 1000}, "1500");
        div.animate({width: 1000}, "1500");
        div.queue(function () {
            div.css("background-color", "blue");  
            div.dequeue();
        });
        div.animate({height: 500}, "1500");
        div.animate({width: 500}, "1500");
    });
});

 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 1000}, "1500");
        div.animate({width: 1000}, "1500");
        div.queue(function () {
            div.css("background-color", "blue");  
            div.dequeue();
        });
        div.animate({height: 500}, "1500");
        div.animate({width: 500}, "1500");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 1000}, "1500");
        div.animate({width: 1000}, "1500");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 500}, "1500");
        div.animate({width: 500}, "1500");
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
    });
});

$(document).ready(function(){
    $("p").click(function(){
        $("h1").fadeToggle();
        $("h1").fadeToggle("1500");
        $("h1").fadeToggle(5000);
    });
});
$(document).ready(function(){
    $("h1").click(function(){
        $("p").fadeToggle();
        $("p").fadeToggle("1500");
        $("p").fadein(3000);
    });
});








		
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
