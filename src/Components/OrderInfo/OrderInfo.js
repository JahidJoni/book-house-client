import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './OrderInfo.css'

const OrderInfo = () => {
    const [orders, setOrders] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

        useEffect(()=>{
            fetch('https://boiling-meadow-65353.herokuapp.com/orders?email='+loggedInUser.email)
            .then(res=>res.json())
            .then(data=>setOrders(data))
        }, [loggedInUser.email])

    return (
        <div className= "orders">
            {
                loggedInUser && <div>
                    <h4> Hlw! {loggedInUser.name}</h4> <img src={loggedInUser.photoURL} alt=""/>
                </div>
            }
            <h3>You Have total {orders.length} orders</h3>
                 <table style={{ width: '100%' }}>
                    <tr>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Price</th>
                        <th>Order Placed</th>
                    </tr>
                    {
                        orders.map(order=><tr>
                            <td>{order.name}</td>
                            <td>{order.author}</td>
                            <td>{order.price}</td>
                            <td>{order.today}</td>
                        </tr>
                        )}
                        
                </table>

        </div>
    );
};

export default OrderInfo;