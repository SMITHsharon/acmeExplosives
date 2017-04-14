$(document).ready(function(){

var explosives = [];

// constants
var numCategories = 2;
var numTypes = 3;
var numProducts = 8;



function writeDOM(){
    var domString = "";
    var productsArray = explosives[5];

    domString += `<h1>Fireworks</h1>`;

    var arrayIndexStart = 2; // explosives[2] , [3] tie to category Personal <0>
    for (var i=arrayIndexStart; i<numTypes+arrayIndexStart; i++) {
    	if (explosives[i].category === 0) {
    		domString += `<h3>${explosives[i].name}</h3>`;


	    	for (var j=0; j<numProducts; j++) {
    		// explosives[5] starts the Product Objects in <explosives> array
	    		Object.keys(productsArray).forEach(function(key){
		    		if (productsArray[key]["type"] === explosives[i].category) {
	// console.log("productsArray[j].type // j :: ", j, productsArray[j].type);
	console.log("explosives[i].category // i :: ", i, explosives[i].category); // 2, 0
	// console.log("inside for loop / productName :: ", productName);
		    			domString += `<h5>${productsArray[key].name}</h5>`;
		    		}
	    		})
	    	}
    	}
    }

    domString += `<h1>Demolition</h1>`;

    var arrayIndexStart = 4; // explosives[4] tie2 to category Demolition <1>
    for (var i=arrayIndexStart; i<numTypes+arrayIndexStart-1; i++) {
    	if (explosives[i].category === 1) {
    		domString += `<h3>${explosives[i].name}</h3>`;
    	}
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
// console.log("resultz", resultz);
            resultz.forEach(function(ajaxCalls){
                ajaxCalls.forEach(function(acme){
                    explosives.push(acme);
                })
            })
console.log("explosives :: ", explosives);
            writeDOM();
        })

});