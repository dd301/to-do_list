var main = function(toDoObjects){
"use strict";    
    var toDos = toDoObjects.map(function(toDo){
        return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function(element){
        
        //create a click handler for this element
        $(element).on("click", function(){

            var $content,
            $input,
            $button,
            i;

            var $element = $(element);
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")){
                
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            }
            else if ($element.parent().is(":nth-child(2)")){
                
                $content = $("<ul>");
                toDos.forEach(function (todo){
                    $content.append($("<li>").text(todo));
                });
            }
            else if ($element.parent().is(":nth-child(3)")){
                
                $content = $("<div>");
                $input = $("<input>");
                $button = $("<button>").text("+");
                
                $button.on("click", function(){
                    if ($input.val() !== ""){
                    toDos.push($input.val())
                    $input.val("");
                    }   
                });

                
                $content.append($input, $button);
              
            }
            
            $("main .content").append($content);
            
            return false;
        });
    });
    
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function(){
    $.getJSON("todos.json", function(toDoObjects){
        main(toDoObjects);
    });
});