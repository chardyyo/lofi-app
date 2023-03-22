import React, { ChangeEvent, FormEvent } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface FormValues {
  description: string;
  supply: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  input: {
    marginBottom: '1rem',
  },
});

export default function Form() {
  const classes = useStyles();

  const [formValues, setFormValues] = React.useState<FormValues>({
    description: '',
    supply: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    console.log('Form Values: ', formValues);
  };

  return (
    <form onSubmit={handleSubmit} className={classes?.root}>
      <TextField
        label="Description"
        variant="outlined"
        className={classes.input}
        name="description"
        value={formValues.description}
        onChange={handleInputChange}
      />
      <TextField
        label="Supply"
        variant="outlined"
        className={classes.input}
        name="supply"
        value={formValues.supply}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
