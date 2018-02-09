var speed_factor=0.8;
var color = "#6688ff";
function underline(element) {
    var id = element.id;
    var line = element.getElementsByTagName('line');
    line[0].style.strokeDasharray = 200;
    line[0].style.strokeDashoffset= 200;
    line[0].style.stroke = "#00bfff";
    line[0].style.opacity = 1;
    //line[0].animate([{strokeDashoffset: 200}, {strokeDashoffset: 0}], 1000, mina.linear, function(){ console.log(line[0].style.strokeDashoffset); line[0].style.strokeDashoffset = 0;});
    $(line[0]).animate({strokeDashoffset: 0}, 300, "linear", function(){ });
}

function reset(element) {
    var id = element.id;
    var line = element.getElementsByTagName('line');
    $(line[0]).stop();
    line[0].style.strokeDashoffset = 200;
}

function whiteOutName(text) {
    var name_svg = Snap(text);
    name_svg.attr({viewBox: "0 -36 4500 496"});
    var letters = name_svg.selectAll('g');
    for (var i = 0; i < letters.length; i++)
    {
        var letter = letters[i];
        if (!letter.selectAll)
        {
            continue;
        }
        var components = letter.selectAll("path, line, circle");
        for ( var j = 0; j < components.length; j++ )
        {
            var path = components[j];
            path.attr({stroke: "#ffffff", strokeWidth: 20});
        }
    }
}

// Returns the nth child within the group svg and its length
function getNthPath(svg, n){
    var path = svg.select('path:nth-child(' + n + ')');
    var length = 0;
    var endVal = 0;
    if (path != null)
    {
        length = path.getTotalLength();
    }
    else
    {
        path = svg.select('line:nth-child(' + n + ')');
        if (path == null) 
        {
            path = svg.select('circle:nth-child(' + n + ')');
            length = path.getTotalLength();
        }
        else
        {
            length = Math.sqrt(Math.pow(path.node.x2.baseVal.value - path.node.x1.baseVal.value, 2) + Math.pow(path.node.y2.baseVal.value - path.node.y1.baseVal.value, 2));
        }
    }
    return {path: path, length: length};
}

function animateLetter(letter, letterName, completion) {
    var letterSettings = animationSettings[String.fromCharCode(letterName)];       // access settings for letter
    count = 1;
    var pathNum = letterSettings.order ? count : letterSettings.components.length + 1 - count;         // Get the next path in either forward or reverse order
    var component = letterSettings.components[pathNum - 1];
    var path_struct = getNthPath(letter, pathNum);
    path_struct.path.attr({"stroke-dasharray": path_struct.length, stroke:component.color, "stroke-dashoffset":path_struct.length});
    path_struct.path.animate({"stroke-dashoffset": (component.direction ? path_struct.length*2 : 0) }, path_struct.length*speed_factor, component.easing, function() { 
        count++;
        if (count <= letterSettings.components.length)
        {
            setTimeout( function() { 
                var pathNum = letterSettings.order ? count : letterSettings.components.length + 1 - count;         // Get the next path in either forward or reverse order
                var component = letterSettings.components[pathNum - 1];
                var path_struct = getNthPath(letter, pathNum);
                path_struct.path.attr({"stroke-dasharray": path_struct.length, stroke:component.color, "stroke-dashoffset":path_struct.length});
                path_struct.path.animate({"stroke-dashoffset": (component.direction ? path_struct.length*2 : 0) }, path_struct.length*speed_factor, component.easing, function() { 
                    count++;
                    if (count <= letterSettings.components.length)
                    {
                        setTimeout( function() {
                            var pathNum = letterSettings.order ? count : letterSettings.components.length + 1 - count;         // Get the next path in either forward or reverse order
                            var component = letterSettings.components[pathNum - 1];
                            var path_struct = getNthPath(letter, pathNum);
                            path_struct.path.attr({"stroke-dasharray": path_struct.length, stroke:component.color, "stroke-dashoffset":path_struct.length});
                            path_struct.path.animate({"stroke-dashoffset": path_struct.length*2}, path_struct.length*speed_factor, mina.easeinout, completion)
                        }, component.timeout * speed_factor);
                    }
                    else
                    {
                        completion();
                    }
                });
            }, component.timeout * speed_factor);
        }
        else
        {
            completion();
        } 
    });
}

function animateNthLetter(n, letters, onCompletion) {
        if (n >= letters.length)
        {
            if (onCompletion)
            { 
                onCompletion();   
            }
            return;
        }
        var letter = letters[letters.length - 1 - n];
        
        // Get the letter that the svg group represents
        var letterValue = 0;
        for (var j = 0; j < letter.node.classList.length; j++)
        {
            var cName = letter.node.classList[j];
            if (cName.length == 1)
            {
                var ch = cName.charCodeAt(0);
                if ( (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122))
                {
                    letterValue = ch;
                }
            }
        }
        var completion = function() {
            animateNthLetter(n+1, letters, onCompletion);
        };

        animateLetter(letter, letterValue, completion);        
}

function animateName(text)
{
    var name_svg = Snap(text);
    var letters = name_svg.selectAll('g');
    whiteOutName(text);
    animateNthLetter(0, letters);
    setInterval( function()
    {
        $("#name-div").stop(true,true);
        whiteOutName(text);
        animateNthLetter(0, letters);
    }, 60000);
}
