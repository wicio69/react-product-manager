import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { iconButton } from './Product.module.style';

export function AddPopup() {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState('');
  const [value, setValue] = useState<Date | null>(null);
  const [errorMail, setErrorMail] = useState<{ email: string }>();
  const [errorName, setErrorName] = useState<{ name: string }>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a new product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to add a new product, fill out all the necessary fields and
            hit 'Save'.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="email"
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Quantity"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
