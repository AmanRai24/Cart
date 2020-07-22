import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {


  constructor () {
    super();
    this.state = {
      products: [],
      loading:true
    }
    this.db = firebase.firestore();
} 

componentDidMount(){
  //--- on any update in firebase we have to refresh the page to get update on browser ----
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products = snapshot.docs.map((doc) =>{
    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     });
    //     this.setState({
    //       products,
    //       loading: false
    //     });

    //   });

    this.db
    .collection('Products')
    // .where('price', '<=', 300) //(to get only thoes data whorice price<=300) 
    // .orderBy('price', 'desc') //(short the data in desc/aesc)
    .onSnapshot((snapshot)=>{
      console.log(snapshot);

      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });

      const products = snapshot.docs.map((doc) =>{
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });
      this.setState({
        products,
        loading: false
      });
    });

}

handleIncreaseQuantity=(product)=>{
    //console.log('hey plz inc the qty',product);
    const{products}=this.state;
    const index=products.indexOf(product);

    // products[index].qty+=1;

    // this.setState({
    //   products:products
    // });

    const docRef = this.db.collection('Products').doc(products[index].id);

      docRef
        .update({
          qty: products[index].qty+1
        }).then(() => {
          console.log('Increase Successfully');
        }).catch((err) => {
          console.log('Error',err);
        })
}

handledecreaseQuantity=(product)=>{
 // console.log('hey plz inc the qty',product);
  const{products}=this.state;
  const index=products.indexOf(product);

//   if(products[index].qty===0)
//   {
//     return;
//   }

//   products[index].qty-=1;
  
//   this.setState({
//     products:products
//   });
// };

if(products[index].qty === 0){
  return;
}

const docRef = this.db.collection('Products').doc(products[index].id);

docRef
.update({
    qty: products[index].qty-1
}).then(() => {
  console.log('Decrease Successfully');
}).catch((err) => {
  console.log('Error',err);
})

}

handleDeleteProduct=(id)=>{
//const{products}=this.state;

// const items=products.filter((item)=>item.id!==id);
// this.setState({
//   products:items
// });
// };

const docRef = this.db.collection('Products').doc(id);

      docRef
        .delete()
        .then(() => {
          console.log('Product Deleted Successfully');
        }).catch((err) => {
          console.log('Error',err);
        })
  }

getCartCount=()=>{
  const{products}=this.state;
  let count =0;
  products.forEach((product)=>{
    count+=product.qty;

  });
  return count;
};

getCartTotal = () => {
  const { products } = this.state;

  let cartTotal = 0;

  products.map((product) => {
    if(product.qty>0){
    cartTotal = cartTotal + product.qty * product.price
    }
    return '';
  });

  return cartTotal;
};

   render(){
    const{products,loading}=this.state;
    return (
    <div className="App">
      <Navbar count={this.getCartCount()} />
      <Cart
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity}
        onDecreaseQuantity={this.handledecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
        //products={products}
      />
      { loading && <h1>Loading Products...</h1>}
      <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
    </div>
    
  );
}
}

export default App;
