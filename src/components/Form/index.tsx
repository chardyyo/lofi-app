import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, FormEvent } from 'react';

const BASE_API_ROUTE = 'http://localhost:3000/api';
const CREATE_OPPORTUNITY_API = `${BASE_API_ROUTE}/opportunity`;

interface FormValues {
  description: string;
  supply: string;
}

export default function Form() {
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

    fetch(CREATE_OPPORTUNITY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: formValues?.description,
        supply: formValues?.supply,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('created opportunity: ', data));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <TextField
        style={{
          marginBottom: '1rem',
        }}
        label="Description"
        variant="outlined"
        name="description"
        value={formValues.description}
        onChange={handleInputChange}
      />
      <TextField
        style={{
          marginBottom: '1rem',
        }}
        label="Supply"
        variant="outlined"
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
