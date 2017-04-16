$(document).ready(function(){

var explosives = [];

function writeDropdownMenu(){

	var domString = "";
	var thisID = -1;
	var dropdownDone = false;

	for (var i=0; i<explosives.length; i++) {
		
		if (thisID > explosives[i].id) {
			dropdownDone = true;
			i = explosives.length;
		}
			
		if (!dropdownDone) {
			thisID++;
			domString += `<li><a href="#">${explosives[i].name}</a></li>`;
		} // <if>
	} // <for>
	$(".dropdown-menu").append(domString);
} // <writeDropdownMenu



function writeDOM(){
    var domString = "";
    
    var selected = 0;
    if (selected === 0) {
    	domString += `<h1>Fireworks</h1>`;
    } else {
    	domString += `<h1>Demolition</h1>`;
	};

	for (var i=0; i<explosives.length; i++) {
    	if (explosives[i].category === selected) {
     		domString += `<h3>${explosives[i].name}</h3>`;

// explosives.forEach(function (value) {
// console.log("value :: ", value);
// explosives.forEach(function (value2) {
// console.log("value2 :: ", value2);

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
            writeDropdownMenu();
        })

});