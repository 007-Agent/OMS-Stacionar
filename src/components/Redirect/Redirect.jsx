import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectOnReload = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 

  useEffect(() => {
   
    if (!user) {
      navigate('/'); 
    }
  }, [navigate, user]);

  return null; 
};

export default RedirectOnReload;