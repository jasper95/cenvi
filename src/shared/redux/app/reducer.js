import { createSlice } from 'redux-starter-kit';

const initialState = {
  dialog: null,
  notification: null,
  dialogProcessing: false,
  formProcessing: false,
  temporaryClosedDialogs: [],
};

const auth = createSlice({
  slice: 'auth',
  initialState,
  reducers: {
    showDialog(state, { payload }) {
      const { dialog } = state;
      let { temporaryClosedDialogs } = state;
      if (dialog) {
        temporaryClosedDialogs = [...temporaryClosedDialogs, dialog];
      }
      state.dialog = payload;
      state.temporaryClosedDialogs = temporaryClosedDialogs;
    },
    hideDialog(state) {
      let dialog = null;
      let { temporaryClosedDialogs } = state;
      if (temporaryClosedDialogs.length) {
        [dialog] = [...temporaryClosedDialogs].reverse();
        temporaryClosedDialogs = temporaryClosedDialogs.slice(0, temporaryClosedDialogs.length - 1);
      }
      state.dialog = dialog;
      state.dialogProcessing = false;
      state.temporaryClosedDialogs = temporaryClosedDialogs;
    },
    dialogProcessing(state, action) {
      const { dialog } = state;
      if (dialog && action.payload) {
        state.dialogProcessing = action.payload;
      }
    },
    formProcessing(state, action) {
      state.formProcessing = action.payload;
    },
    hideNotification(state) {
      state.notification = null;
    },
    showError(state, { payload }) {
      state.notification = {
        ...payload,
        type: 'error',
      };
      state.formProcessing = false;
      state.dialogProcessing = false;
    },
    showSuccess(state, { payload }) {
      const { message, hideDialog = true } = payload;
      if (hideDialog) {
        this.hideDialog(state);
      }
      state.toast = {
        type: 'success',
        message,
      };
    },
    clearLoading(state) {
      state.formProcessing = false;
      state.dialogProcessing = false;
    },
  },
});

export const {
  showDialog,
  hideDialog,
  formProcessing,
  hideNotification,
  showError,
  showSuccess,
  clearLoading,
  dialogProcessing,
} = auth.actions;


export default auth.reducer;
