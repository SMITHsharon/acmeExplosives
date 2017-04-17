$(document).ready(function(){

var explosives = [];

var categoriesArray = [];
var typesArray = [];
var productsArray = [];

function writeDropdownMenu(){

	var domString = "";
console.log("categoriesArray.length :: ", categoriesArray.length);
	for (var i=0; i<categoriesArray.length; i++) {

		domString += `<li><a id=${categoriesArray[i].id} href="#">${categoriesArray[i].name}</a></li>`;
	} // <for>
	$(".dropdown-menu").append(domString);
} // <writeDropdownMenu



// handler for click event on a dropdown menu
$(".dropdown-menu").on("click", function(e){
	writeDOM(parseInt(e.target.id));
});


function writeDOM(selected){
// console.log("selected :: ", selected);

console.log("categoriesArray :: ", categoriesArray);
console.log("typesArray :: ", typesArray);
console.log("productsArray :: ", productsArray);

	var counter = 0;
	domString = "";

    $("#explosionsOutput").empty(); // clear DOM
    
    // var selected = 0;
    if (selected === 0) {
    	domString += `<h1>Fireworks</h1>`;
    } else {
    	domString += `<h1>Demolition</h1>`;
	};

	for (var i=0; i<explosives.length; i++) {

    	

// explosives.forEach(function (value) {
// console.log("value :: ", value);
// explosives.forEach(function (value2) {
// console.log("value2 :: ", value2);

     		$.each( explosives, function( index, value ) {
console.log("outer loop :: index, value :: ", index, value);
// console.log("explosives :: ", explosives);
				$.each( value, function ( index2, value2 ) {


					if ((value2.name !== undefined) 
						&& (explosives[i].category === selected)
						&& (value2.type === explosives[i].id)) {

						
						

						domString += `<div>`;
			     		domString += `<h3>${explosives[i].name}</h3>`;
			     		

console.log("value2 / explosives[i] / i :: ", i, value2, explosives[i]);
console.log("value2.type / explosives[i].id / i :: ", i, value2.type, explosives[i].id);
						domString += `<h5>${value2.name}</h5>`;
					} // <if>
					counter++;
					if (counter % 3 === 0) {
						domString += `</div>`;
						domString += `<div class="row">`;
						domString += `<div class="explCard col-sm-3">`;
					}
					

				}); // <each>
			}); // <each>
			domString += `</div></div>`;
     	// };
    } // <for i>

	domString += `</div>`;
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


 // Process the JSON data files into three separate arrays
 // categories, types, products
categoriesJSON().then(function(categoriesData){
    categoriesArray = categoriesData;
    return typesJSON();
}).then(function(typesData){
    typesData.forEach(function(types){
        typesArray.push(types);
    })
    return productsJSON();
}).then(function(productsData){
    productsData.forEach(function(products){
	productsArray = products;
    })

     writeDropdownMenu();
});


// Rewrote the following <Promise.all> to the above ^^^ to flatten the data
// to three separated arrays
// 
// Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
//         .then(function(resultz){
// console.log("resultz", resultz);
//             resultz.forEach(function(ajaxCalls){
//                 ajaxCalls.forEach(function(acme){
//                     explosives.push(acme);
//                 })
//             })
// console.log("explosives :: ", explosives);
//             writeDropdownMenu();
//         })

});