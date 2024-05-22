import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  sentMail: {},
  receivedMail: {}
};

const MailSlice = createSlice({
  name: 'mail',
  initialState: initialMailState,
  reducers: {
    addSentMail(state, action) {
      const newMail = action.payload;
      state.sentMail[newMail.id] = newMail;
      console.log(action)
    }
  }
});

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;

export const sendRequestToMail = (mailData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/email.json', {
        method: 'POST',
        body: JSON.stringify(mailData)
      });

      if (!response.ok) {
        throw new Error('Failed to send mail.');
      }

      const data = await response.json();
      // Assuming the response contains an id or some unique identifier
      const mailWithId = { ...mailData, id: data.name }; // `data.name` is typically the key Firebase returns
      dispatch(mailActions.addSentMail(mailWithId));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
