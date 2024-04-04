import { useState } from 'react';
import { isValidDate, isFutureDate } from 'date-fns';

export const usePaymentForm = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState();
  const [cvv, setCVV] = useState('');
  const [cvvVisible, setCVVVisible] = useState(false);
  const [numberStatus, setNumberStatus] = useState('basic');
  const [nameStatus, setNameStatus] = useState('basic');
  const [dateStatus, setDateStatus] = useState('basic');
  const [cvvStatus, setCVVStatus] = useState('basic');

  const isFutureDate = (dateStr) => {
    const [month, year] = dateStr.split('/');
    const expiryDate = new Date(`20${year}`, month - 1);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // to ignore the time component
    return expiryDate >= currentDate;
  };

  const onCVVIconPress = () => {
    setCVVVisible(!cvvVisible);
  };

  const validateForm = () => {
    let isValid = true;

    if (!number || number.length !== 16) {
      setNumberStatus('danger');
      isValid = false;
    } else {
      setNumberStatus('basic');
    }

    if (!name) {
      setNameStatus('danger');
      isValid = false;
    } else {
      setNameStatus('basic');
    }

    if (
      !date ||
      !/^((0[1-9])|(1[0-2]))\/\d{2}$/.test(date) ||
      !isFutureDate(date)
    ) {
      setDateStatus('danger');
      isValid = false;
    } else {
      setDateStatus('basic');
    }

    if (!cvv || cvv.length !== 3) {
      setCVVStatus('danger');
      isValid = false;
    } else {
      setCVVStatus('basic');
    }

    return isValid;
  };

  return {
    fields: {
      number,
      name,
      date,
      cvv,
    },
    setters: {
      setNumber,
      setName,
      setDate,
      setCVV,
    },
    cvvVisible,
    onCVVIconPress,
    fieldsStatus: {
      numberStatus,
      nameStatus,
      dateStatus,
      cvvStatus,
    },
    validateForm,
  };
};
