/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BASE_ID } from '../../util/config';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  useAppDispatch,
  useAppSelector,
  useFieldWithValidation,
} from '../../util/hooks';
import { addProducts } from './apiCalls';
import { Alert } from '@mui/material';
import { datePicker, addButton, formAlert } from './Product.module.style';
import {
  selectIsRepeated,
  selectIsUploaded,
  cancelUploaded,
  cancelRepeated,
} from './productSlice';
import { isEmpty } from 'lodash';
import { ValidationConsts } from '../../util/config';

export function AddPopup() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);

  const [failure, setFailure] = useState<boolean>(false);
  const isRepeated = useAppSelector(selectIsRepeated);
  const isUploaded = useAppSelector(selectIsUploaded);

  const [quantity, setQuantity] = useState<string>();

  const [email, emailError, validateEmail] = useFieldWithValidation(
    (email: string) => {
      return email.match(ValidationConsts.REGEX_EMAIL);
    },
    ValidationConsts.EMAIL_VALIDATION
  );

  const [name, nameError, validateName] = useFieldWithValidation(
    (name: string) => {
      return name.length < ValidationConsts.MAX_NAME_LENGTH;
    },
    ValidationConsts.NAME_VALIDATION
  );

  const [description, descriptionError, validateDescription] =
    useFieldWithValidation((description: string) => {
      return description.length < ValidationConsts.MAX_DESC_LENGTH;
    }, ValidationConsts.DESC_VALIDATION);

  const handleSubmit = () => {
    if (
      name &&
      date &&
      description &&
      quantity &&
      email &&
      isEmpty(emailError) &&
      isEmpty(nameError)
    ) {
      setFailure(false);
      dispatch(
        addProducts({
          name: name,
          email: email,
          quantity: parseInt(quantity),
          description: description,
          date: date,
          id: BASE_ID,
        })
      );
    } else {
      setFailure(true);
    }
  };

  return (
    <div>
      <form>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          css={addButton}
        >
          Add a new product
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
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
              label="Product Name"
              type="text"
              fullWidth
              error={!isEmpty(nameError)}
              helperText={nameError}
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
              error={!isEmpty(emailError)}
              helperText={emailError}
              variant="standard"
              required
            />
            <TextField
              onChange={validateDescription}
              margin="dense"
              id="description"
              label="Description"
              type="email"
              fullWidth
              error={!isEmpty(descriptionError)}
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
                  renderInput={(params) => (
                    <TextField data-testid="picker" fullWidth {...params} />
                  )}
                />
              </div>
            </LocalizationProvider>
            {/* {failure && (
              <Alert css={formAlert} severity="error">
                All fields are required. Name must be at least five characters
                long. Email address must have a correct format.
              </Alert>
            )} */}
            {isRepeated && (
              <Alert css={formAlert} severity="error">
                This name is already taken.
              </Alert>
            )}
            {isUploaded && (
              <Alert
                css={formAlert}
                severity="success"
                data-testid="alertSuccessId"
              >
                The product has been added.
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {isUploaded ? (
              <Button
                type="submit"
                disabled
                onClick={() => console.log('tu byl handle submit')}
              >
                Save
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={() => console.log('tu byl handle submit')}
              >
                Save
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
