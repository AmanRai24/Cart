import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {


  constructor () {
    super();
    this.state = {
      products: [
        {
          price: 499,
          title: 'Watch',
          qty: 1,
          img: 'https://rukminim1.flixcart.com/image/714/857/jr6o13k0/watch/w/q/z/1164-br-fogg-original-imaf9stmmgg2eq2f.jpeg?q=50',
          id: 1
        },
        {
          price: 14999,
          title: 'Mobile Phone',
          qty: 1,
          img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9',
          id: 2
        },
        {
          price: 56999,
          title: 'Laptop',
          qty: 1,
          img: 'https://cdn.mos.cms.futurecdn.net/ahevYTh9pWRzkNPF85MQhb-1200-80.jpg',
          id: 3
        }
      ]
    }
} 

handleIncreaseQuantity=(product)=>{
    console.log('hey plz inc the qty',product);
    const{products}=this.state;
    const index=products.indexOf(product);

    products[index].qty+=1;

    this.setState({
      products:products
    })
}

handledecreaseQuantity=(product)=>{
  console.log('hey plz inc the qty',product);
  const{products}=this.state;
  const index=products.indexOf(product);

  if(products[index].qty===0)
  {
    return;
  }

  products[index].qty-=1;
  
  this.setState({
    products:products
  })
}

handleDeleteProduct=(id)=>{
const{products}=this.state;

const items=products.filter((item)=>item.id!==id);
this.setState({
  products:items
})
}

getCartCount=()=>{
  const{products}=this.state;
  let count =0;
  products.forEach((product)=>{
    count+=product.qty;

  })
  return count;
}

getCartTotal = () => {
  const { products } = this.state;

  let cartTotal = 0;

  products.map((product) => {
    cartTotal = cartTotal + product.qty * product.price
  })

  return cartTotal;
}
  render(){
    const{products}=this.state;
  return (
    <div className="App">
      <Navbar count={this.getCartCount()} />
      <Cart
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity}
        onDecreaseQuantity={this.handledecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
      />
      <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
    </div>
    
  );
}
}

export default App;
