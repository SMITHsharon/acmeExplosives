# NSS ACME Explosives

### Project Description 
For this exercise I created three `JSON` files that describe all the explosives products that ACME Explosives sells. Upon loading the `JSON` files, the options for a select dropdown menu are dynamically written to the DOM, and upon a user selection from this menu, the selected product line is displayed dynamically. 


#### ACME Explosives Application Launch
![ACME Explosives Application Launch](https://raw.githubusercontent.com/SMITHsharon/acmeExplosives/screens/screens/ACME%20Explosives%20on%20Launch.png)


#### ACME Explosives Dropdown Select
![ACME Explosives Dropdown Select](https://raw.githubusercontent.com/SMITHsharon/acmeExplosives/screens/screens/ACME%20Explosives%20Dropdown%20Select.png)


#### ACME Explosives Fireworks Products
![ACME Explosives Fireworks Products](https://raw.githubusercontent.com/SMITHsharon/acmeExplosives/screens/screens/ACME%20Explosives%20Fireworks%20Products.png)


#### ACME Explosives Demolition Products
![ACME Explosives Demolition Products](https://raw.githubusercontent.com/SMITHsharon/acmeExplosives/screens/screens/ACME%20Explosives%20Demolition%20Products.png)


### Project Specs
- Completed the `jQuery`, `Bootstrap`, `Grunt` setup
- Uses `jQuery` `Promises` to load `categories.json`, `types.json`, then `products.json`, 
in that order
- Writes the data from the three `json` files to three separate arrays
- Reads the contents of `categoriesArray` to dynamically write the options on the `Explosives Products` select dropdown menu 
- Upon a user selection from the dropdown menu, loops through the `typesArray` and `productsArray` to write the respective product line to the DOM
- Uses `Bootstrap` to define the underlying grid for styling


### Technologies Used
- `html`
- `css`
- `JavaScript`
- `Bootstrap`
- `jQuery` 
- `Grunt`


### How To View The Screen 
#### (Node must be installed on your machine):
```
git clone git@github.com:SMITHsharon/acmeExplosives.git
cd acmeExplosives
cd lib
bower install
npm install
-server -p 8080

This will show in your browser at: `http://localhost:8080`

### Contributor
[Sharon Smith](https://github.com/SMITHsharon)
