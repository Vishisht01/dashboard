import React from 'react';
import Button from '@mui/material/Button';

export const EditButton = ({ onClick }) => {
  return (
    <Button variant='contained'sx={{
        backgroundColor: '#FFDB58',
        borderRadius: '2rem',
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        '&:hover': {
          backgroundColor: '#FFDB58',
        },
      }}
       onClick={onClick}>
      Edit
    </Button>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (
    <Button
      variant='contained'
      sx={{
        backgroundColor: 'red',
        borderRadius: '2rem',
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        '&:hover': {
          backgroundColor: 'red',
        },
      }}
      onClick={onClick}
    >
      Delete
    </Button>
  );
};
