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

export function EditPopup() {
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

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMail({ email: ' ' });
    const {
      target: { value },
    } = event;
    if (
      value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrorMail({ email: 'Please provide a correct e-mail' });
    }
  };

  const validateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setErrorName({ name: ' ' });
    setName(value);
    if (value.length < 6) {
      setErrorName({ name: 'Name must be at least five characters long' });
      console.log('mniej');
    }
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit product details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to edit the product, make all the necessary changes in the
            form and hit 'Save'.
          </DialogContentText>
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errorName?.name)}
            helperText={errorName?.name}
            onChange={validateName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            error={Boolean(errorMail?.email)}
            helperText={errorMail?.email}
            onChange={validateEmail}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="email"
            fullWidth
            variant="standard"
          />
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
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
