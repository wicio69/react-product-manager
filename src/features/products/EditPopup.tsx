import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { REGEX_EMAIL } from '../../util/regex';
import { SelectChangeEvent } from '@mui/material/Select';
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
    const {
      target: { value },
    } = event;
    setErrorMail({ email: '' });
    setEmail(value);
    if (!value.match(REGEX_EMAIL)) {
      setErrorMail({ email: 'Please provide a correct e-mail' });
    }
  };

  const validateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setErrorName({ name: '' });
    setName(value);
    if (value.length < 6) {
      setErrorName({ name: 'Name must be at least five characters long' });
    }
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen} color={'primary'} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit product details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to edit the product, make all the necessary changes in the
            form and hit 'Save'.
          </DialogContentText>
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
            label="Description"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
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
