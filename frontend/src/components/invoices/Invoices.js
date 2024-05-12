import React, { useContext, useEffect, useState } from 'react';
import InvoicesList from './InvoicesList';
import { AppContext } from '../../context/context';
import { invoicesVariants } from '../../utilities/framerVariants';
import { useReducedMotion } from 'framer-motion';

const Invoices = () => {
  const { filteredInvoices } = useContext(AppContext);
  const shouldReduceMotion = useReducedMotion();
  const variant = (element, index) => {
    return shouldReduceMotion
      ? invoicesVariants.reduced
      : invoicesVariants[element](index);
  };

  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoData(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!filteredInvoices || filteredInvoices.length === 0) {
    return (
      <div className="text-center text-2xl mt-[20vh]">
        {showNoData ? 'No data' : 'Loading...'}
      </div>
    );
  }
  return (
    <ul className="w-full mt-[44px] px-4">
      {filteredInvoices.map((invoice, index) => {
        return (
          <InvoicesList
            key={index}
            invoice={invoice}
            variants={variant('list', index)}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        );
      })}
    </ul>
  );
};

export default Invoices;
