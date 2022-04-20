/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch } from '../../util/hooks';
import { addProducts } from './apiCalls';
import { datePicker } from './Product.module.style';

export function AddPopup() {
  const [open, setOpen] = useState(false);
  const [errorMail, setErrorMail] = useState<{ email: string }>();
  const [errorName, setErrorName] = useState<{ name: string }>();
  const [date, setDate] = useState<Date | null>(null);
  const [email, setEmail] = useState<string>();
  const [quantity, setQuantity] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [name, setName] = useState<string>();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (
      name &&
      date &&
      description &&
      quantity &&
      email &&
      !errorMail &&
      !errorName
    ) {
      dispatch(
        addProducts({
          name: name,
          email: email,
          quantity: parseInt(quantity),
          description: description,
          date: date,
          id: 1,
        })
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <form>
        <Button variant="contained" onClick={handleClickOpen}>
          Add a new product
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add a new product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In order to add a new product, please fill out all the necessary
              fields and hit 'Save'.
            </DialogContentText>
            <TextField
              onChange={(e) => setName(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              id="description"
              label="Description"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={(e) => setQuantity(e.target.value)}
              margin="dense"
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="standard"
            />
            <LocalizationProvider css={datePicker} dateAdapter={AdapterMoment}>
              <div css={datePicker}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </div>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
