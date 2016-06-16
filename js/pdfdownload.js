var canvas = document.createElement("canvas");
canvas.width = 748;
var ctx = canvas.getContext("2d");

function textToLines(words, maxWidth, maxLines) {
    var lines = [];
    var index = 0;
    var testHeight = 0;
    while (words.length > 0 && lines.length <= maxLines) {
        var line = getLineOfText(words, maxWidth);
        index += line.index + 1;
        words = words.splice(line.index + 1);
        lines.push(line.text);
    }
    return({
        index: index,
        lines: lines
    }); 
}

function getLineOfText(words, maxWidth) {
    var line = "";
    var space = "";
    for (var i = 0; i < words.length; i++) {
        var testWidth = ctx.measureText(line + " " + words[i]).width;
        if (testWidth > maxWidth) {
            return ({
                index: i - 1,
                text: line
            });
        }
        line += space + words[i];
        space = " ";
    }
    return ({
        index: words.length - 1,
        text: line
    });
}

var printCanvas = function(content, filename){
    var content = $(content);
    var promise = html2canvas(content[0], {
        onrendered: function(canvas) {},
        width: 748
});
    Promise.all( [promise] ).then(function (c) { 
        var canvas = c[0];
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; //300; //450; // 
        var pageHeight = 295; // 295 450; //590; //  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm'); //jsPDF('p','px','letter'); //jsPDF('p', 'mm');
        var position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight);

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        doc.save(filename);
        location.reload();
    });
}

var addPage = function(target, id){
    var pageHeight = 1051
    $(target).append('<div id="'+id+'" style="width:100%; height:'+ pageHeight +'px; border:0; padding:10px; margin:0.5;"> </div>');
}

var layoutPages =  function(){
    var content = $('#content');
    content.width('748px');
    content.css("padding","20px");
    content.css("font-size","14px");
    var children = $('#content').children();
    var currentPageHeight = 0;
    var pageHeight = 1000;
    var pageNum = 1;
    var page = addPage('#content', 'page'+pageNum)
    
    for( var c = 0; c < children.length; c++ )
    {
        element = children[c];
        var elementId = element.id;
        element.id = "NodeCursor";
        var node = $("#NodeCursor");
        var nodeText = node.text();
        var tagName = node[0].tagName;
        //For headline tags, if the following element exceeds the page length roll both to the next page.
        if(/H\d/i.test(tagName) ) {
            if(currentPageHeight + node.outerHeight(true) + node.next().outerHeight(true) >= pageHeight ) {
                pageNum++;
                addPage('#content','page'+pageNum);
                currentPageHeight = node.outerHeight(true);
            } else {
                currentPageHeight += node.outerHeight(true);
            }
            node.detach().appendTo('#page'+pageNum);
        }//if the element fits append it to the current page.
        else if (currentPageHeight + node.outerHeight(true) < pageHeight ) {
            currentPageHeight += node.outerHeight(true);
            node.detach().appendTo('#page'+pageNum)
        // }//if the element is a text paragraph split it in two.
        // else if( tagName === "P" && !/<[a-z][\s\S]*>/i.test(node.text()) ) {
        //     var maxLines = 2; //Math.floor((currentPageHeight + node.outerHeight(true) - pageHeight)/25);
        //     var words = node.text().split(" ");
        //     var width = 600;
        //     var lines = textToLines(words, width, maxLines);
        //     $('#page'+pageNum).append('<p>' + lines.lines.join(" ")+ '</p>');
        //     pageNum++;
        //     addPage('#content','page'+pageNum);
        //     words = node.text().split(" ");
        //     $('#page'+pageNum).append('<p id="NewNode">' + words.slice(lines.index+1, words.length-1).join(" ")+ '</p>');
        //     node.remove();
        //     node = $("#NewNode");
        //     currentPageHeight = node.outerHeight(true);
        //     node[0].id = "";
        } else {
            pageNum++;
            addPage('#content','page'+pageNum);
            node.detach().appendTo('#page'+pageNum);
            currentPageHeight = node.outerHeight(true);
        }
        element.id = elementId;
    }
    printCanvas('#content','document.pdf');
}
$('#create-pdf').click(layoutPages);