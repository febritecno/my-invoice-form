export const invoicesReducers = (state, action) => {
  switch (action.type) {
    case 'CREATE_INVOICE':
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      };
    case 'UPDATE_INVOICE':
      const updatedInvoice = action.payload;
      const updatedInvoices = state.invoices.map(invoice => {
        if (invoice.id === updatedInvoice.id) {
          return updatedInvoice;
        }

        return invoice;
      });

      return {
        ...state,
        invoices: updatedInvoices,
      };
    case 'DELETE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice.id !== action.payload
        ),
      };
    case 'MARK_AS_PAID':
      const invoiceStatus = action.payload;
      const updateInvoiceStatus = state.invoices.map(invoice => {
        if (invoice.id === invoiceStatus.id) {
          return { ...invoice, status: 'paid' };
        }

        return invoice;
      });
      return {
        ...state,
        invoices: updateInvoiceStatus,
      };
    case 'SET_INVOICES':
      return {
        ...state,
        invoices: action.payload,
      };
    default:
      return state;
  }
};
