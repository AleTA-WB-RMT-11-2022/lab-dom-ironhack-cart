// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input')
  const subtotal = product.querySelector('.subtotal span')

  const priceValue = price.innerHTML
  const quantityValue = quantity.value
  console.log(priceValue)
  console.log(quantityValue)
  

  const subtotalValue = priceValue * quantityValue
  const element = document.getElementsByTagName('span')[1]
  console.log(element)
  
  subtotal.innerHTML = subtotalValue

  return subtotalValue

  
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test
  let totalSum = 0
  // ITERATION 2
  const products = document.querySelectorAll('.product')
  products.forEach((product)=>{
    subtotal = updateSubtotal(product)
    totalSum += subtotal
  })

  // ITERATION 3
  const total = document.querySelector("#total-value span")
  return total.innerHTML = totalSum
}

// ITERATION 4
  
function removeProduct(event) {
  const target = event.currentTarget.parentNode.parentNode; // the event being passed will be the button, this means parentNode of parentNode of the event will be the product we will want to delete

  target.parentNode.removeChild(target); // this function will delete the the target (the product DOM element) from it's parentNode. essentially removing it from the DOM.

  const total = document.querySelector("#total-value span"); // total DOM element
  const subtotal = target.querySelector(".subtotal span"); // subtotal DOM element

  total.innerHTML = total.innerHTML - subtotal.innerHTML; // this is to reduce from the total, the subtotal of the removed element

  // NOTE. another approach for updating the subtotal would be to run the calculateAll() function again.
}


// ITERATION 5

function createProduct() {
  // input values from the create product line
  let nameElement = document.querySelector(
    '.create-product input[type="text"]'
  );
  let priceElement = document.querySelector(
    '.create-product input[type="number"]'
  );

  let cart = document.querySelector("tbody"); // targets the cart DOM in which the new elements will be added
  
  // We proceed to create the product DOM element via 3 steps (create the element, add a class (optional), add some innerHTML (which can include other HTML tags))

  let newProduct = document.createElement("tr"); // to create the new product DOM element that will be added
  newProduct.className = "product"; // to add a new class to the new product DOM element

  // We create the nested elements by passing a string that represents HTML elements to innerHTML
  // .innerHTML will cause the string to be parsed and converted to nested elements
  // the values from the input nameElement and priceElement are passed with string interpolation
  newProduct.innerHTML = `
    <tr class="product">
      <td class="name">
        <span>${nameElement.value}</span>
      </td>
      <td class="price">$<span>${priceElement.value}</span></td>
      <td class="quantity">
        <input type="number" value="0" min="0" placeholder="Quantity" />
      </td>
      <td class="subtotal">$<span>0</span></td>
      <td class="action">
        <button class="btn btn-remove">Remove</button>
      </td>
    </tr>
  `;

  cart.appendChild(newProduct); // now that we created the whole product DOM element we add it (append it) to the cart

  nameElement.value = ""; // to clear the name input for a new use
  priceElement.value = ""; // to clear the price input for a new use

  // since this is a new element the remove buttons won't have the functionalities, so we proceed to add them
  var deleteButton = newProduct.querySelector(".btn-remove"); // targets the new button not from document, but from the newProduct DOM element.
  deleteButton.addEventListener("click", removeProduct); // addEventListener and reusing the removeProduct function
}


window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  

  const removeButtons = document.querySelectorAll(".btn-remove");
  removeButtons.forEach((eachButton) => {
    eachButton.addEventListener("click", removeProduct);
  });

  // BONUS 2. to add functionality to create button to run the createProduct function when clicked
  const createButton = document.querySelector("#create");
  createButton.addEventListener("click", createProduct);
});
