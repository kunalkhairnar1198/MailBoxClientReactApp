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
  let email = localStorage.getItem('email')

  if(email){
    email = email.replace(/[@.""]/g, "");
  }
  console.log(email)
  return async (dispatch) => {
    try {
      const response = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/${email}/email.json`, {
        method: 'POST',
        body: JSON.stringify(mailData)
      });

      if (!response.ok) {
        throw new Error('Failed to send mail.');
      }

      const data = await response.json();
      const mailWithId = { ...mailData, id: data.name }; 
      dispatch(mailActions.addSentMail(mailWithId));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMails = () => {
  let email = localStorage.getItem('email')

  if(email){
    email = email.replace(/[@.""]/g, "");
  }
  console.log(email)
  return async (dispatch) => {
    try {
      const response = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/${email}/email.json`)
      const data = await response.json();
      console.log(data);
      dispatch(mailActions.addSentMail(data))
    } catch (error) {
      console.log(error);
    }
  };
};
