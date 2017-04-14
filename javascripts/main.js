$(document).ready(function(){

var explosives = [];

// constants
var numCategories = 2;
var numTypes = 3;
var numProducts;



function writeDOM(){
    var domString = "";

    domString += `<h1>Fireworks</h1>`;
    var arrayIndexStart = 2;
    for (var i=arrayIndexStart; i<numTypes+arrayIndexStart-1; i++) {
    	domString += `<h3>${explosives[i].name}</h3>`;
    }

    domString += `<h1>Demolition</h1>`;
    var arrayIndexStart = 4;
    for (var i=arrayIndexStart; i<numTypes+arrayIndexStart-1; i++) {
    	domString += `<h3>${explosives[i].name}</h3>`;
    }

	$("#explosionsOutput").append(domString);
}



var categoriesJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/categories.json").done(function(data1){
                resolve(data1.categories);
            }).fail(function(error1){
                reject(error1);
            });
        });
    };

var typesJSON = function(){
    return new Promise(function(resolve, reject){
        $.ajax("./db/types.json").done(function(data2){
            resolve(data2.types);
        }).fail(function(error2){
            reject(error2);
        });
    });
};

var productsJSON = function(){
    return new Promise(function(resolve, reject){
        $.ajax("./db/products.json").done(function(data3){
            resolve(data3.products);
        }).fail(function(error3){
            reject(error3);
        });
    });
};


Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
        .then(function(resultz){
console.log("resultz", resultz);
            resultz.forEach(function(ajaxCalls){
                ajaxCalls.forEach(function(acme){
                    explosives.push(acme);
                })
            })
console.log("explosives :: ", explosives);
            writeDOM();
        })

});