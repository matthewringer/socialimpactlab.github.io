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

    var callback = function (e){
        var pathArray = window.location.pathname.split( '/' ).clean("");
        doc.save(pathArray[pathArray.length-1] + '.pdf');
    }
    
    //$("#content img").remove();
    // $("#content img").filter(function(){
    //     return this.src === undefined
    // }).remove();
    
    var div = $('#content');
    
    div.find("img").css( "width", "500px" );
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


var fromHtml3 = function(){
    
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
    
    //console.log($('#content'));
    //console.log($('#content')[0]);
    
    // pdf.addHTML(document.body, 
    // function() {
    //     console.log('callback');
    //      doc.save('sampler-file.pdf');
    //     }
    // );
    
    $('#content').children("*").each(function() {
        console.log(this);
        var element = this;
        var nextSibling = element.nextElementSibling;
        
        if(nextSibling === null){
            pdf.addHTML(element, callback);
            return;
        }
        
        if(currentPageHeight + element.clientHeight < 900)
        {
            currentPageHeight =+ element.clientHeight;
            pdf.addHTML(element, callback);
        }
        else{
            pdf.addPage();
            currentPageHeight = element.clientHeight;
            pdf.addHTML(element, callback);
        }
    });
    
    setTimeout(callback,6000);
}

// var addElement = function( element ){
//     element.children().each(function () {
//         addElement(this,  callback) <!-- ADD_PAGE -->
//     }); 
// }


$('#create-pdf').click(fromHtml2);