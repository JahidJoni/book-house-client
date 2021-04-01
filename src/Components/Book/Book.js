import React from 'react';

const Book = ({books}) => {
    return (
        <div>
            <h3>{books.name}</h3>
        </div>
    );
};

export default Book;