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
                
                var tags = [];
            
                toDoObjects.forEach(function(toDo){
                    toDo.tags.forEach(function(tag){
                        // make sure the tag isn't already in the tags array
                        if (tags.indexOf(tag) === -1){
                            tags.push(tag);
                        }
                    });
                });
            
                var tagObjects = tags.map(function(tag){
                    // here we find all the to-do objects that contain that tag
                    var toDosWithTag = [];
                    toDoObjects.forEach(function(toDo){
                        if(toDo.tags.indexOf(tag) !== -1){
                            toDosWithTag.push(toDo.description);
                        }
                    });
                    // we map each tag to an object that contains the name of the tag and an array
            
                    return {"name": tag, "toDos":toDosWithTag};
                });
                console.log(tagObjects);
            
                
                tagObjects.forEach(function(tag){
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");
                

                    tag.toDos.forEach(function(description){
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName)
                                      .append($content);

                });

            }
            
            else if ($element.parent().is(":nth-child(4)")){
                
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+");
                
                $button.on("click", function(){
                    if ($input.val() !== "" && $tagInput.val() !== ""){
                        var description = $input.val(),
                            tags = $tagInput.val().split(",");
                        
                        toDoObjects.push({"description":description, "tags":tags});
                        
                        toDos = toDoObjects.map(function(toDo){
                            return toDo.description;
                        });
                        
                        $input.val("");
                        $tagInput.val("");
                    }   
                });

                $content = $("<div>").append($inputLabel)
                        .append($input)
                        .append($tagLabel)
                        .append($tagInput)
                        .append($button);
              
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