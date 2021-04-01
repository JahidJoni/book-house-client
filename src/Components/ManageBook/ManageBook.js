import { AddBox, Dashboard, EditOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CssBaseline, Divider, Drawer } from '@material-ui/core';
import './ManageBook.css'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    },
}));


const ManageBook = () => {
    const classes = useStyles();

    const [books, setBooks] = useState([]);
    const [deleteBook, setDeleteBook] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
    }, [])

    const handleDelete = (id) => {
        const remainingBooks = deleteBook.filter(items => items._id !== id);

        fetch(`http://localhost:5000/delete/${id}`, {
            method: "DELETE",
        })
            .then(res => {
                res.json()
            })
            .then(data => {
                setDeleteBook(remainingBooks);
            });
    }

    return (
        <div>
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">
                    <div className={classes.toolbar} />
                    <Divider />
                    <Link to="/manageBook" className="sideBar"> <Dashboard></Dashboard> Manage Books </Link>

                    <Link to="/addBook" className="sideBar"> <AddBox></AddBox> Add Books </Link>

                    <Link className="sideBar"> <EditOutlined/> Edit Books </Link>
                    <Divider />
                </Drawer>

                <main className={classes.content}>
                    <h2>Books on Stock-</h2>
                    {
                        books.map(book =>
                            <div style={{ height: 60, width: '100%' }}>
                                <li>{book.name} by {book.author} ${book.price} </li>
                                <Button size="small" variant="outlined" color="secondary" style={{ marginLeft: 20 }} onClick={() => handleDelete(book._id)}>Remove</Button>
                                <Button size="small" variant="outlined" color="primary" style={{ marginLeft: 20 }}>Edit</Button>
                            </div>)
                    }
                </main>
            </div>
        </div>
    );
};

export default ManageBook;