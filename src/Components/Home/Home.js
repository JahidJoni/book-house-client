import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './Home.css'
import { Container, LinearProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


const Home = () => {
    const classes = useStyles();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://boiling-meadow-65353.herokuapp.com/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
    }, [])

    return (
        <div>
            {
                books.length === 0 && <div ><LinearProgress centered/></div>
            }
        <div className="cards">
            {
                books.map(book => <Container className="book-card">
                    <Card className='book-card'>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={book.imageURL}
                                title={book.name}
                            />
                            <CardContent className="card-body">
                                <Typography gutterBottom variant="h5" component="h2">
                                    {book.name}
                                </Typography>
                                <Typography gutterBottom variant="p" component="p">
                                   By: {book.author}
                                </Typography>
                                <Typography gutterBottom variant="p" component="p">
                                    {book.price} tk.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="card-body">
                            <Link to={`/order/${book._id}`} className="check-btn">Check Out  <FontAwesomeIcon icon={faShoppingCart} /></Link>
                        </CardActions>
                    </Card>
                </Container>)
            }
        </div>
        </div>
    );
};

export default Home;