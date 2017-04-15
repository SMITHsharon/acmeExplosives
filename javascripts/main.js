$(document).ready(function(){

var explosives = [];

// constants
// var numCategories = 2;
// var numTypes = 3;
// var fireworksTypes = 2;
// var demolitionTypes = 1;
// var numProducts = 8;
// var arrayIndexStart;



function writeDOM(){
    var domString = "";
    
    var selected = 0;
    if (selected === 0) {
    	domString += `<h1>Fireworks</h1>`;
    	// arrayIndexStart = 2; // explosives[2] , [3] tie to category Personal <0>
    	// typesLength = fireworksTypes;
    } else {
    	domString += `<h1>Demolition</h1>`;
    	// arrayIndexStart = 4; // explosives[4] tied to category Demolition <1>
    	// typesLength = demolitionTypes;
	};

	for (var i=0; i<explosives.length; i++) {
    // for (var i=arrayIndexStart; i<typesLength+arrayIndexStart; i++) {
// console.log("explosives[4].category  / selected :: ", explosives[4].category, selected);
    	if (explosives[i].category === selected) {
// console.log("explosives[i].category :: ", explosives[i].category);
     		domString += `<h3>${explosives[i].name}</h3>`;

     		$.each( explosives, function( index, value ) {
			$.each( value, function ( index2, value2 ) {
				if ((value2.name !== undefined) && (value2.type === explosives[i].id)) {
					domString += `<h5>${value2.name}</h5>`;
				} // <if>
			}); // <each>
		}); // <each>
     	};

    } // <for i>

	$("#explosionsOutput").append(domString);
} // <writeDom>



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