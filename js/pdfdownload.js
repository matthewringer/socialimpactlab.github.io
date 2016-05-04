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
    var doc = new jsPDF();
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

$('#download-pdf').click(fromHtml);