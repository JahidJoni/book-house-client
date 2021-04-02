import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Order.css'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';

const Order = () => {
    const { id } = useParams()

    const [book, setBook] = useState({})
    const [selectedDate, setSelectedDate] = useState({
        today: new Date(),
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        fetch(`https://boiling-meadow-65353.herokuapp.com/order/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
    }, [id])

    const handleBooking = () => {
        const {name, author, price} = book
         const orderDetails = {...loggedInUser, name, author, price , ...selectedDate}
        
         fetch('https://boiling-meadow-65353.herokuapp.com/addOrder', {
             method: 'POST',
             headers: {
                 'Content-type': 'application/json'
             },
             body: JSON.stringify(orderDetails)
         })
         .then(res=>res.json)
         .then(data=>{
             if(data){
                 alert("Order Placed Successfully")
             }
         })

        }

    return (
        <div className="order-info">
            <table style={{ width: '100%' }}>
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

            <button className="checkBtn" onClick={handleBooking}>Check Out</button>


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Order Date"
                        value={selectedDate.today}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

        </div>
    );
};

export default Order;