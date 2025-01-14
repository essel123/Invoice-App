import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Address type definition
type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

// Item type definition
type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

// Invoice type definition
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

// Invoice states definition
type InvoiceStates = {
  invoices: Invoice[];
  invoice: Invoice;
  isOpen: boolean;
  isDarkMode: boolean;
  isDelete: boolean;
  selectedInvoice: string;
  isEdit: boolean;
};

// Initial state
const initialState: InvoiceStates = {
  invoice: {
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 0,
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    items: [],
    total: 0
  },
  selectedInvoice: "",
  invoices: [],
  isOpen: false,
  isDarkMode: false,
  isDelete: false,
  isEdit: false
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
    updateInvoiceStatusToPaid: (state, action: PayloadAction<string>) => {
      const invoice = state.invoices.find(
        invoice => invoice.id === action.payload
      );
      if (invoice) {
        invoice.status = "paid";
      }
    },
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setSelectedInvoice: (state, action: PayloadAction<string>) => {
      state.selectedInvoice = action.payload;
    },
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    }
  }
});

export const {
  addInvoice,
  removeInvoice,
  updateInvoice,
  updateInvoiceStatusToPaid,
  setDialog,
  setDarkMode,
  setDelete,
  setSelectedInvoice,
  setEdit
} = stateSlice.actions;

export default stateSlice.reducer;
