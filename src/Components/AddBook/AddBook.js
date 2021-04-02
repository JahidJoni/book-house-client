import { CssBaseline, Divider, Drawer} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddBox, Dashboard, EditOutlined } from '@material-ui/icons';
import './AddBook.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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
}));

const AddBook = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
          const bookData = {
              name: data.name,
              author: data.author,
              price: data.price,
              imageURL: imageURL
          }

          const url = `https://boiling-meadow-65353.herokuapp.com/addBook`
          console.log(bookData);

          fetch(url, {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
              body: JSON.stringify(bookData)
          })
          .then(res=>console.log(res))
    }

    const classes = useStyles();
    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '8273e8bed23f1645029948b7f60f08be')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
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

                   <Link className="sideBar"> <AddBox/> Add Books </Link>

                   <Link  className="sideBar"> <EditOutlined></EditOutlined> Manage Books </Link>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <h3>Use all this field to add a new book on database-</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input name="name" placeholder="Book Name" className='form' ref={register} />
                        <br />
                        <input name="author" placeholder="Author Name" className='form' ref={register} />
                        <br />
                        <input name="price" placeholder="Price" className='form' ref={register} />
                        <br />
                        <input name="exampleRequired" className='file' type="file" onChange={handleImageUpload} />
                        <br />
                        <input type="submit" className='form' />
                    </form>
                </main>
            </div>
        </div>
    );
};

export default AddBook;