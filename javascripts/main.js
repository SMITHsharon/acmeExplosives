$(document).ready(function(){

var explosives = [];

var categoriesArray = [];
var typesArray = [];
var productsArray = [];

function writeDropdownMenu(){

	var domString = "";
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
    
    domString += `<h1>${categoriesArray[selected].name}</h1>`;

	for (var i=0; i<typesArray.length; i++) {
		if (counter % 3 === 0) {
			domString += `<div class="row">`;
		}

		if (typesArray[i].category === selected) {
			domString += `<div class="acmeCard col-sm-3">`;
			domString += `<h2>${typesArray[i].name}</h2>`;
			domString += `<p>${typesArray[i].description}</p>`;

// console.log("productsArray.length :: ", productsArray[length]);

			// for (var j=0; j<productsArray.length; j++) {
			$.each( productsArray, function( index, product ) {
				if (product.type === typesArray[i].id) {
console.log("i /  product.type / typesArray[i].id :: ", i, product.type, typesArray[i].id);
					domString += `<h4>${product.name}</h4>`;
					domString += `<p>${product.description}</p>`;
				}
			})
		}

		domString += `</div>`;
		counter++;
		if (counter % 3 === 0) {
			domString += `</div>`;
		}

	} // <for>

	domString += `</div></div>`;
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
console.log("typesArray :: ", typesArray);
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