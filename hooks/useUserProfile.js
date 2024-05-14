import { useEffect, useState } from 'react';
import usersService from '../features/users/usersService';

export const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await usersService.getUserById(userId);
        if (data.first_name === 'Anonymous') setIsPrivate(true);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error, isPrivate };
};
