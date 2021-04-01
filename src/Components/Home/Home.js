import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './Home.css'
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';


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
        fetch('http://localhost:5000/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
    }, [])

    return (
        <div className="">

        <div className="cards container">
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
                                    {book.author}
                                </Typography>
                                <Typography gutterBottom variant="p" component="p">
                                    {book.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="card-body">
                            <Link to={`/order/${book._id}`}>Check Out</Link>
                        </CardActions>
                    </Card>
                </Container>)
            }
        </div>
        </div>
    );
};

export default Home;