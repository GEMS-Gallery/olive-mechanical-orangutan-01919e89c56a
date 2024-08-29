import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

type Inputs = {
  newGreeting: string;
};

function App() {
  const [greeting, setGreeting] = useState<string>('');
  const [updateCount, setUpdateCount] = useState<bigint>(BigInt(0));
  const [currentTime, setCurrentTime] = useState<bigint>(BigInt(0));
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const fetchGreeting = async () => {
    const fetchedGreeting = await backend.getGreeting();
    setGreeting(fetchedGreeting);
  };

  const fetchUpdateCount = async () => {
    const fetchedCount = await backend.getUpdateCount();
    setUpdateCount(fetchedCount);
  };

  const fetchCurrentTime = async () => {
    const fetchedTime = await backend.getCurrentTime();
    setCurrentTime(fetchedTime);
  };

  useEffect(() => {
    fetchGreeting();
    fetchUpdateCount();
    fetchCurrentTime();

    const interval = setInterval(fetchCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await backend.setGreeting(data.newGreeting);
    fetchGreeting();
    fetchUpdateCount();
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello World Dapp
        </Typography>
        <Typography variant="h6" gutterBottom>
          Current Greeting: {greeting}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Update Count: {updateCount.toString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Current Time: {new Date(Number(currentTime) / 1000000).toLocaleString()}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('newGreeting')}
            label="New Greeting"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Greeting
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default App;