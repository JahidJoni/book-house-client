import { Book } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Order.css'

const Order = () => {
    const {id} = useParams()

        const [book, setBook] = useState({})
      
      useEffect(()=>{
          fetch(`http://localhost:5000/order/${id}`)
          .then(res=>res.json())
          .then(data=>setBook(data))
      }, [id])  
        
    
    return (
        <div className="order-info">
           <table style={{width: '100%'}}>
               <tr>
                   <th>Name</th>
                   <th>Author</th>
                   <th>Quantity</th>
                   <th>Price</th>
               </tr>
               <tr>
                   <td>{book.name}</td>
                   <td>{book.author}</td>
                   <td>1</td>
                   <td>{book.price} tk.</td>
               </tr>
           </table>

           <button className="checkBtn">Check Out</button>
        </div>
    );
};

export default Order;