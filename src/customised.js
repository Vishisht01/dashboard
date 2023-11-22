import React from 'react';
import Button from '@mui/material/Button';

export const WarningButton = ({ onClick,label }) => {
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
      {label}
    </Button>
  );
};

export const DangerButton = ({ onClick, label,disabled }) => {
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
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export const SuccessButton = ({ onClick, label,disabled }) => {
    return (
      <Button
        variant='contained'
        sx={{
          backgroundColor: 'green',
          borderRadius: '2rem',
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          '&:hover': {
            backgroundColor: 'green',
          },
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  };