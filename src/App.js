import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from "./data.json";
import Products from "./components/Products";
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component{
  constructor()
  {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")?
      JSON.parse(localStorage.getItem("cartItems")):[],
      // cartItems: [],
      color: "",
      sort: "",
    };
  } 


  createOrder = (order) =>{
    alert("Need to save order for" + order.name);
  }

removeFromCart = (product) =>{
  const cartItems = this.state.cartItems.slice();
  this.setState({
  cartItems: cartItems.filter(x=>x._id !== product._id),
  
  });
  localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
};

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    cartItems.forEach(item => {
      if(item._id === product._id)
      {
        // cartItems.length++;
        item.count++ ;
        alreadyInCart = true;
      }
      
    });
   
    if(!alreadyInCart){
      // alert(item._id);
      // alert(product._id);

      cartItems.push({...product, count: 1 });
      // alreadyInCart = true;
    }
    
    this.setState({ cartItems });
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  };

 

  sortProducts = (event) => {
    const sort = event.target.value;
      console.log(event.target.value);

      this.setState((state) => ({
        sort: sort,
        products: this.state.products
        .slice()
        .sort((a,b) => 
          sort === "lowest"
          ? a.price > b.price 
          ? 1 : -1 
          : sort === "highest"
          ? a.price < b.price 
          ? 1 : -1 
          : a._id > b._id 
          ? 1 : -1
        ),
      }
        ));
      };

  

  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({ color: event.target.value, product:data.products });
    }
    else{
    this.setState({
      color: event.target.value,
      products: data.products.filter(
      (product) => product.availableColors.indexOf(event.target.value) >= 0
    ),
  });
  }
  };

  
  render()
  {
  return (
    <div className="grid-container">

      <header>
        <a href="/">Flowers for you</a>
      </header>

      <main>
        <div className="content">

            <div className="main">
                <Filter count={this.state.products.length}
                color={this.state.color}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}>

                </Filter>
                <Products products={this.state.products} 
                addToCart={this.addToCart}></Products>
            </div>

            <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                removeFromCart = {this.removeFromCart}
                createOrder = {this.createOrder}></Cart>
            </div>

        </div>
      </main>

      <footer>
        All rights are reserved.
      </footer>

    </div>
  );
}
}

export default App;
