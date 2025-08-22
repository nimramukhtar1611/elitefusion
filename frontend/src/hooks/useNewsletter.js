import { useState } from 'react';
import gameJamService from '../services/gameJamService';

export const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError(null);
      await gameJamService.subscribeToNewsletter(email);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setSuccess(false);
    setError(null);
  };

  return {
    email,
    setEmail,
    loading,
    success,
    error,
    subscribe,
    resetStatus,
  };
};