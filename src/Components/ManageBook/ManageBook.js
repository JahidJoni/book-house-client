import { AddBox, Dashboard, EditOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Divider, Drawer, LinearProgress } from '@material-ui/core';
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
        fetch('https://boiling-meadow-65353.herokuapp.com/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
    }, [])

    const handleDelete = (id) => {
        const remainingBooks = deleteBook.filter(items => items._id !== id);

        fetch(`https://boiling-meadow-65353.herokuapp.com/delete/${id}`, {
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
             {
                books.length === 0 && <div style={{width: '100%'}}><LinearProgress /></div>
              }
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
                    <table>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    {
                        books.map(book=> <tr>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.price}</td>
                            <td><button onClick={() => handleDelete(book._id)}>Delete</button> <button>Edit</button> </td>
                        </tr>)
                    }
                        </table>
                </main>
            </div>
        </div>
    );
};

export default ManageBook;