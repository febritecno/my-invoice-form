import { createContext, useReducer, useState, useEffect } from 'react';
import { invoicesReducers } from '../store/reducers/invoicesReducers';
import generatePaymentDueDate from '../utilities/generatePaymentDueDate';
import generateID from '../utilities/generateId';

require('dotenv').config();

const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_API_URL}/api`;

const getInvoicesFromAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/invoice`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
};

// Initial state values
const initialState = {
  invoices: [],
  isFormOpen: false,
  isPopUpOpen: false,
};

export const AppContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoicesReducers, initialState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoints = 768;

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoices = await getInvoicesFromAPI();
      dispatch({ type: 'SET_INVOICES', payload: invoices });
    };
    fetchInvoices();
  }, []);

  const onHandleFormOpen = () => setIsFormOpen(!isFormOpen);
  const onHandlePopUpOpen = () => setPopUpOpen(!isPopUpOpen);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredInvoices(
        state.invoices.filter(invoice => invoice.status === filter)
      );
    } else {
      setFilteredInvoices(state.invoices);
    }
  }, [state.invoices, filter]);

  const createInvoice = async (data, status) => {
    const paymentDue = generatePaymentDueDate(data.createdAt, data.paymentTerms);
    const total = data.items.reduce((acc, item) => acc + item.total, 0);
    const id = generateID();
    const newInvoice = { ...data, id, status, paymentDue, total };
    try {
      const response = await fetch(`${API_URL}/invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoice),
      });
      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }
      const result = await response.json();
      dispatch({ type: 'CREATE_INVOICE', payload: result });
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const updateInvoice = async (data) => {
    const total = data.items.reduce((acc, item) => acc + item.total, 0);
    const updatedInvoice = { ...data, total };
    try {
      const response = await fetch(`${API_URL}/invoice/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInvoice),
      });
      if (!response.ok) {
        throw new Error('Failed to update invoice');
      }
      const result = await response.json();
      dispatch({ type: 'UPDATE_INVOICE', payload: result });
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      const response = await fetch(`${API_URL}/invoice/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete invoice');
      }
      dispatch({ type: 'DELETE_INVOICE', payload: id });
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const markAsPaid = async (data) => {
    const updatedInvoice = { ...data, status: 'paid' };
    try {
      const response = await fetch(`${API_URL}/invoice/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInvoice),
      });
      if (!response.ok) {
        throw new Error('Failed to update invoice status');
      }
      const result = await response.json();
      dispatch({ type: 'MARK_AS_PAID', payload: result });
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        invoices: state.invoices,
        isFormOpen,
        isPopUpOpen,
        onHandleFormOpen,
        onHandlePopUpOpen,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        markAsPaid,
        setFilter,
        filter,
        filteredInvoices,
        width,
        breakpoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
