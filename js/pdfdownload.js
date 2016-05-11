Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

var getImageFromUrl = function(url, callback) {
    var img = new Image(), data, ret = {
        data: null,
        pending: true
    };

    img.onError = function() {
        throw new Error('Cannot load image: "'+url+'"');
    };
    
    img.onload = function() {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // Grab the image as a jpeg encoded in base64, but only the data
        data = canvas.toDataURL('image/jpeg')
        data = data.slice('data:image/jpeg;base64,'.length);
        // Convert the data to binary form
        data = atob(data);
        document.body.removeChild(canvas);

        ret['data'] = data;
        ret['pending'] = false;

        //console.log("data",data);

        if (typeof callback === 'function') {
            callback(data);
        }
    };
    img.src = url;

    return ret;
};

var save_pdf = function(){
    var doc = new jsPDF('p', 'pt', 'letter');
    var specialElementHandlers = {
        '#pdfignore': function(element, renderer){
            return true;
        }
    };
    
    var addImage = function (imageData){
        doc.addImage(imageData, 'JPEG', 10, 10, 50, 50);
    }
    
    var createImage = function(doc, image){
        var img = new Image();
        img.src =  image.src;
        img.addEventListener('load', function() {
            var doc = new jsPDF();
            doc.addImage(img, 'jpeg', 10, 10, 50, 50); //image.x, image.y, image.clientHeight, image.clientWidth);
            var pathArray = window.location.pathname.split( '/' ).clean("");
            doc.save(pathArray[pathArray.length-1] + '.pdf');
        });
    }

    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    // var images = $('img, article.content *');
    // var imgData = [];
    // for(i in images) {
    //     if(images[i].src !== undefined){
    //         createImage(doc, images[i]);
    //     }
    // }
    
    
}

var fromHtml = function(){
    var doc = new jsPDF('p', 'pt', 'letter');
    var specialElementHandlers = {
        '#pdfignore': function(element, renderer){
            return true;
        }
    };
    
    var callback = function (e){
        var pathArray = window.location.pathname.split( '/' ).clean("");
        doc.save(pathArray[pathArray.length-1] + '.pdf');
    }
    
    //$("#content img").remove();
    // $("#content img").filter(function(){
    //     return this.src === undefined
    // }).remove();
    
    var div = $('#content').clone();
    div.find("img").css( "width", "500px" );
    // function(){
    //     var width = (this.width <= 150)? this.width : 150;  //.css("width");
    //     return width+"px";
    // }
    // );
    //div.find("p").css( "width", "900px");
    // div.find("p").text(function(){
    //     var text = this.innerText.replace(/[^\w\s]/gi, '||'); //
    //     //var text = encodeURIComponent(this.innerText); //.replace("’","'").replace("‘","'");  //‘ ’ //.replace("'"," ");
    //     return text;
    // });
    doc.fromHTML(div[0], 15, 15, {
        'width': 500, 
        'elementHandlers': specialElementHandlers
    }, callback ); //Government’'s
}

var fromHtml2 = function(){
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.encoding = 'WinAnsiEncoding'
    var specialElementHandlers = {
        '#pdfignore': function(element, renderer){
            return true;
        }
    };
    
    margins = {
        top: 5,
        bottom: 5,
        left: 50,
        width: 522
    }

    var callback = function (e){
        var pathArray = window.location.pathname.split( '/' ).clean("");
        doc.save(pathArray[pathArray.length-1] + '.pdf');
    }
    
    //$("#content img").remove();
    // $("#content img").filter(function(){
    //     return this.src === undefined
    // }).remove();
    
    var div = $('#content');
    
    //div.find("img").css( "width", "500px" );
    // function(){
    //     var width = (this.width <= 150)? this.width : 150;  //.css("width");
    //     return width+"px";
    // }
    // );
    //div.find("p").css( "width", "900px");
    div.find("p").html(function(){
        if(this.firstChild.nodeName === "#text" ){
        //var text = this.innerHTML.replace(/[^A-Za-z 0-9 \.,'"\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        var text = this.innerHTML.replace(/[^\x00-\x7F]/g, "");
        //var text = this.innerText.replace(/[^\w\s]/gi, ''); //
        //var text = encodeURIComponent(this.innerText); //.replace("’","'").replace("‘","'");  //‘ ’ //.replace("'"," ");
        return text;}
        return this.innerHTML;
    });
    doc.fromHTML(div[0], margins.left, margins.top, {
        'width': margins.width,
        'pagesplit': true,
        'elementHandlers': specialElementHandlers
    }, callback, margins ); //Government’'s
}


var fromHtml3 = function() {
    
    // var div = $('#content');
    
    // div.find("img").css( "width", "500px" );
    
    // div.find("p").html(function(){
    //     if(this.firstChild.nodeName === "#text" ){
    //     var text = this.innerHTML.replace(/[^\x00-\x7F]/g, "");
    //     return text;}
    //     return this.innerHTML;
    // });
    
    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    // var images = $('img, article.content *');
    // var imgData = [];
    
    // pdf.addHTML($(elementSelector).get(0), function(){
    // pdf.addPage();
    // pdf.addHTML($(differentElementSelector).get(0), function(){
    //     pdf.save("plan.pdf");
    // });
    // });
    
    var pdf = new jsPDF('p', 'pt', 'a4');
    var specialElementHandlers = {
        '#pdfignore': function(element, renderer){
            return true;
        }
    };
    
    margins = {
        top: 5,
        bottom: 5,
        left: 10,
        width: 522
    }

    var callback = function (){
        console.log('pdf generated');
        var pathArray = window.location.pathname.split( '/' ).clean("");
        pdf.save(pathArray[pathArray.length-1] + '.pdf');
    }
    
    var currentPageHeight = 0;
    $('#content').clone().children("*").each(function() {
        var element = this;
        var nextSibling = element.nextElementSibling;
        if(nextSibling === null) {
            pdf.addHTML( element, callback); 
        } else if (currentPageHeight + element.clientHeight < 900) {
            currentPageHeight =+ element.clientHeight;
            pdf.addHTML( element );
        } else {
            pdf.addPage();
            pdf.addHTML( element );
            currentPageHeight = element.clientHeight;
        }
    });
}

var fromHtml4 = function() {
    
$("#print-preview").empty();
//$("#myModal").modal("show");
//A4 dimensions are *'width x height = 595 x 842 pt'.
var promises = [];
var newPage = function( element ){
    return new Promise(function (resolve) 
    {
        var div = document.createElement("div");
        div.id = element.id+"-preview";
        $("#print-preview").append(div)
        html2canvas(element, {
        onrendered: function(canvas) {
            $("#"+div.id).append(canvas);
            $("#"+element.id).remove();
            var data = canvas.toDataURL('image/png');
            resolve(data);
        }});
    })
}

var count = 0;
var page = 0;
var temp_div = document.createElement("div");
var children = $('#content').clone().children();
for( var c = 0; c < children.length; c++ )
{
    temp_div.appendChild(children[c]);
    if( count < 5 ) {
        count++
    } else {
        count = 0;
        page++;
        var id = "page"+page;
        temp_div.style = "width: 595px; height:842px; margin:15px; padding:15px; border:black 1px solid;";
        temp_div.id = id;
        $("#print-preview-footer").append(temp_div);
        //$("#print-preview-footer").append($("#"+id).clone());
        $("#"+id).addClass("pdf-page");
        temp_div = document.createElement("div");
    }
}

var pages = $("#print-preview-footer").children();
pages.each(function(){
    promises.push(newPage(this)); //$("#"+this.id)[0])
});

//promises.push(newPage("#print-preview-footer"));

//promises.push(newPage("#disqus_thread"));

//promises.push(newPage("#content"));

//promises.push(newPage($("#print-preview-footer").find("#page2")[0]));

var doc = new jsPDF();
Promise.all( promises ).then(function (ru_text) { 
    for( var p = 0; p < ru_text.length; p++ ) {
        doc.addImage(ru_text[p], 'JPEG', 0,0);
        //doc.text(20, 20, 'this is a page!');
        doc.addPage();
    }
    //var pathArray = window.location.pathname.split( '/' ).clean("");
    //doc.save(pathArray[pathArray.length-1] + '.pdf');
    doc.save('page.pdf');
    });
}

// var addElement = function( element ){
//     element.children().each(function () {
//         addElement(this,  callback) <!-- ADD_PAGE -->
//     }); 
// }


var fromHtml5 =  function(){

    var build_canvases = function(i, elements, callback, canvases) {
        if(typeof canvases === 'undefined') canvases = [];
        if(i < elements.length) {
        var element = elements[i]; //todo check
        html2canvas(element, {
            async: false,
            //canvas: null,
            onrendered: function(canvas) {
                $("#print-preview").append(canvas);
                canvases.push({"id":element.id, "data":canvas.toDataURL('image/png')});
                build_canvases((i+1), elements, callback, canvases);
            }});
        } else {
            callback(canvases);
        }
    }
    
    var count = 0;
    var page = 0;
    var temp_div = document.createElement("div");
    var children = $('#content').clone().children();
    for( var c = 0; c < children.length; c++ )
    {
        temp_div.appendChild(children[c]);
        if( count < 5 ) {
            count++
        } else {
            count = 0;
            page++;
            var id = "page"+page;
            temp_div.style = "width: 500px; height: 800px; margin:15px; padding:15px; border:black 1px solid;";
            temp_div.id = id;
            $("#print-preview-footer").append(temp_div);
            $("#"+id).addClass("pdf-page");
            temp_div = document.createElement("div");
        }
    }
    var elements = []
    var pages = $("#print-preview-footer").children();
        pages.each(function(){
        elements.push(this);
    });
    
    
    //should block untill 
    build_canvases(0,elements, function(ru_text){
        for( var p = 0; p < ru_text.length; p++ ) {
            doc.addImage(ru_text[p].data, 'JPEG', 0,0);
            doc.addPage();
        }
        doc.save('page.pdf');
    });
}


var fromHtml6 =  function(){
    var count = 0;
    var page = 0;
    var temp_div = document.createElement("div");
    var children = $('#content').clone().children();
    for( var c = 0; c < children.length; c++ )
    {
        temp_div.appendChild(children[c]);
        if( count < 5 ) {
            count++
        } else {
            count = 0;
            page++;
            var id = "page"+page;
            temp_div.style = "width: 500px; height: 800px; margin:15px; padding:15px; border:black 1px solid;";
            temp_div.id = id;
            $("#print-preview-footer").append(temp_div);
            $("#print-preview").append($("#"+id).clone());
            $("#"+id).addClass("pdf-page");
            temp_div = document.createElement("div");
        }
    }
    var promises = []
    var pages = $("#print-preview-footer").children();
        pages.each(function(){
        promises.push(html2canvas(this));
    });
    
    
    //should block untill 
    var doc = new jsPDF();
    Promise.all( promises ).then(function (canvases) { 
        for( var p = 0; p < canvases.length; p++ ) {
            try{
                $("#print-preview").append(canvas);
            } catch(e){
                console.log(e);
            }
            var data = canvases[p].toDataURL();
            doc.addImage(data, 'JPEG', 0,0);
            doc.addPage();
        }
        doc.save('page.pdf');
    });
}

var fromHtml7 =  function(){
    
    var content = $('#content');
    content.css("padding-left","15px");
    var promise = html2canvas(content[0]);
    Promise.all( [promise] ).then(function (c) { 
        var canvas = c[0];
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        doc.save('page.pdf');
    });
}

$('#myModal').on('hidden', function () {
    
})

$('#create-pdf').click(fromHtml7);