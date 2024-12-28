import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type Invoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
};

type InvoiceState = {
  invoices: Invoice[];
  isOpen: boolean;
  isDarkMode: boolean;
  delete: boolean;
};

const initialState: InvoiceState = {
  invoices: [],
  isOpen: false,
  isDarkMode: false,
  delete: false
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    removeInvoice: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        invoice => invoice.id !== action.payload
      );
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices.findIndex(
        invoice => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },

    setDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },

    setDelete: (state, action: PayloadAction<boolean>) => {
      state.delete = action.payload;
    }
  }
});

export const {
  addInvoice,
  removeInvoice,
  updateInvoice,
  setDialog,
  setDarkMode,
  setDelete,
} = stateSlice.actions;

export default stateSlice.reducer;
