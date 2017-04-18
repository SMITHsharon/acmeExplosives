// jQuery <document> wrapper
$(document).ready(function(){

var categoriesArray = [];
var typesArray = [];
var productsArray = [];


// function dynamically writes the Categories options to the 
// <Explosives Products> dropdown menu, reading from <categoriesArray>
function writeDropdownMenu(){

	var domString = "";
	for (var i=0; i<categoriesArray.length; i++) {

		domString += `<li><a id=${categoriesArray[i].id} href="#">${categoriesArray[i].name}</a></li>`;
	} 
	$(".dropdown-menu").append(domString);
} // <writeDropdownMenu


// event handler for click event on the <Explosives Products> dropdown menu
// passes the user-selected option from the menu, parsed as an integer
// to <writeDOM> funciton
$(".dropdown-menu").on("click", function(e){
	writeDOM(parseInt(e.target.id));
});


// function writes the Explosives Products Line for the user-selected category
// Takes as Parameter :: user-selected menu option, given as an integer
// Displays the Explsives Products for the selected category, sorted by Type
function writeDOM(selected){

	var counter = 0;
	var domString = "";

    $("#explosionsOutput").empty(); // clear DOM
    var selectedHeader = "* " + categoriesArray[selected].name.toUpperCase().split('').join(' ') + " *";
    console.log("selectedHeader :: ", selectedHeader);
    domString += `<h1 class="categoryHeader">${selectedHeader}</h1>`;
    // domString += `<h1 class="categoryHeader">${categoriesArray[selected].name}</h1>`;

	for (var i=0; i<typesArray.length; i++) {
		if (counter % 3 === 0) {
			domString += `<div class="row">`;
		}

		if (typesArray[i].category === selected) {
			domString += `<div class="acmeCard col-sm-4">`;
			domString += `<h3 class="typeHeader">${typesArray[i].name}</h3>`;
			domString += `<p class="typeDesc">${typesArray[i].description}</p>`;

			$.each( productsArray, function( index, product ) {
				if (product.type === typesArray[i].id) {
					domString += `<h4 class="productHeader">${product.name}</h4>`;
					domString += `<p class="productDesc">${product.description}</p>`;
				} // <if>
			}) // <.each>
		} // <if>

		domString += `</div>`;
		counter++;
		if (counter % 3 === 0) {
			domString += `</div>`;
		} // <if> row counter
	} // <for>

	domString += `</div></div>`;
	$("#explosionsOutput").append(domString);

} // <writeDom>



// functions for getting the indicated JSON files
// each function returns the parsed datafile on success
// returns error condition on fail
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


 // Processes the JSON data files into three separate arrays
 // <categoriesArray>, <typesArray>, <productsArray>
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


// Rewrote the following <Promise.all> to the above ^^^ 
// to flatten the data to three separated arrays
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

}); // end <jQuery> document wrapper
