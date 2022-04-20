/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { REGEX_EMAIL } from '../../util/regex';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { datePicker } from './Product.module.style';
import { Product } from './productSlice';
import { editIcon } from './Product.module.style';

export function EditPopup({
  id,
  description,
  quantity,
  name,
  email,
  date,
}: Product) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputEmail, setEmail] = useState<string>(email);
  const [inputQuantity, setQuantity] = useState<string>(quantity.toString());
  const [inputDescription, setDescription] = useState<string>(description);
  const [inputName, setName] = useState<string>(name);
  const [inputDate, setDate] = useState<Date | null>(date);
  const [errorMail, setErrorMail] = useState<{ email: string }>();
  const [errorName, setErrorName] = useState<{ name: string }>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <EditIcon onClick={handleClickOpen} css={editIcon} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit product details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to edit the product, make all the necessary changes in the
            form and hit 'Save'.
          </DialogContentText>
          <TextField
            autoFocus
            value={inputName}
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
            value={inputEmail}
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
            onChange={(e) => setDescription(e.target.value)}
            value={inputDescription}
            margin="dense"
            id="description"
            label="Description"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => setQuantity(e.target.value)}
            value={inputQuantity}
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <div css={datePicker}>
              <DatePicker
                label="Date"
                value={inputDate}
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
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
