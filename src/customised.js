import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export const WarningButton = ({ onClick,label }) => {
  return (
    <Button variant='contained'sx={{
        backgroundColor: '#24a0ed',
        borderRadius: '2rem',
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        '&:hover': {
          backgroundColor: '#24a0ed',
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
          backgroundColor: '#E30047',
          borderRadius: '2rem',
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          '&:hover': {
            backgroundColor: '#FF2468',
          },
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  };
 export const CustomTextField = ({ label, value, onChange, }) => {
    return (
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        sx={{ marginTop: "2rem" }}
      />
    );
  };