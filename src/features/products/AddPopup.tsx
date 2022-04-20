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
import { Alert } from '@mui/material';
import { datePicker, addButton, formAlert } from './Product.module.style';
import { MAX_NAME_LENGTH } from '../../util/config';
import { REGEX_EMAIL } from '../../util/regex';

export function AddPopup() {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMail, setErrorMail] = useState<{ email: string }>();
  const [errorName, setErrorName] = useState<{ name: string }>();
  const [date, setDate] = useState<Date | null>(null);
  const [email, setEmail] = useState<string>();
  const [quantity, setQuantity] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [name, setName] = useState<string>();
  const [failure, setFailure] = useState<boolean>(false);
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
      setFailure(false);
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
    } else {
      setFailure(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFailure(false);
    setOpen(false);
  };

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setFailure(false);
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
    setFailure(false);
    setErrorName({ name: '' });
    setName(value);
    if (value.length < MAX_NAME_LENGTH) {
      setErrorName({ name: 'Name must be at least five characters long' });
    }
  };

  return (
    <div>
      <form>
        <Button variant="contained" onClick={handleClickOpen} css={addButton}>
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
              onChange={validateName}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              error={Boolean(errorName?.name)}
              helperText={errorName?.name}
              variant="standard"
              required
            />
            <TextField
              onChange={validateEmail}
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              error={Boolean(errorMail?.email)}
              helperText={errorMail?.email}
              variant="standard"
              required
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              id="description"
              label="Description"
              type="email"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              onChange={(e) => setQuantity(e.target.value)}
              margin="dense"
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="standard"
              required
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
            {failure && (
              <Alert css={formAlert} severity="error">
                All fields are required. Name must be at least five characters
                long. Email address must have a correct format.
              </Alert>
            )}
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
