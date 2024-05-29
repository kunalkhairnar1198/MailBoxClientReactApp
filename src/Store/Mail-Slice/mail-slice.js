import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  sentMail: [],
  receivedMail: [],
  unReadMessages:0
};

const MailSlice = createSlice({
  name: 'mail',
  initialState: initialMailState,
  reducers: {
    addSentMail(state, action) {
      state.sentMail.push(action.payload);
      // console.log(state.sentMail);
    },
    setSentMails(state, action) {
      state.sentMail = action.payload;
      // console.log(state.sentMail);
    },
    addReceivedMail(state, action) {
      state.receivedMail.push(action.payload);
      // console.log(state.receivedMail);
    },
    setReceivedMails(state, action) {
      state.receivedMail = action.payload;
      const ureadMessages = state.receivedMail.filter(mail => mail.isRead === false)
      state.unReadMessages = ureadMessages.length;
      //  console.log(state.unReadMessages)
      // console.log(state.receivedMail);
    },
    markAsRead(state, action){
      const mail = state.receivedMail.find(mail => mail.id === action.payload);
     
      if (mail) {
        mail.isRead = true;
      }
    },
    deleteReceivedHandler(state, action) {
      state.receivedMail = state.receivedMail.filter(mail => mail.id !== action.payload);
      console.log(action)
    },
    deleteSentHandler(state, action) {
      state.sentMail = state.sentMail.filter(mail => mail.id !== action.payload);
      console.log(action)
    }
    
  }
});

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;


export const sendRequestToMail = (mailData) => {
  let senderEmail = localStorage.getItem('email');

  if (senderEmail) {
    senderEmail = senderEmail.replace(/[@.""]/g, "");
  }

  let receiverEmail = mailData.to.replace(/[@.""]/g, "");
  console.log('receiverEmail', receiverEmail);
  console.log('senderEmail', senderEmail);

  return async (dispatch) => {
    try {
      const response = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/emails/${senderEmail}/sent.json`, {
        method: 'POST',
        body: JSON.stringify(mailData)
      });

      if (!response.ok) {
        throw new Error('Failed to send mail.');
      }

      const senderData = await response.json();
      dispatch(mailActions.addSentMail({ id: senderData.name, ...mailData }));

      console.log('senderData', senderData);

      const receiverResponse = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/emails/${receiverEmail}/received.json`, {
        method: 'POST',
        body: JSON.stringify(mailData)
      });

      if (!receiverResponse.ok) {
        throw new Error('Failed to receive mail!');
      }

      const receiverData = await receiverResponse.json();
      dispatch(mailActions.addReceivedMail({ id: receiverData.name, ...mailData }));

      console.log('receiverData', receiverData);

    } catch (error) {
      console.log(error);
    }
  };
};

export const getSentMails = () => {
  let senderEmail = localStorage.getItem('email');

  if (senderEmail) {
    senderEmail = senderEmail.replace(/[@.""]/g, "");
  }
  console.log(senderEmail);

  return async (dispatch) => {
    try {
      const response = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/emails/${senderEmail}/sent.json`);
      const data = await response.json();
      let loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          to: data[key].to,
          message: data[key].message,
          senderEmail: data[key].senderEmail,
          subject: data[key].subject,
          timeStamp: data[key].timestamp,
          isRead : data[key].isRead
        });
      }
      dispatch(mailActions.setSentMails(loadedData));
      console.log(loadedData);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };
};

export const receivedMailsGet =()=>{
  let receiverEmail = localStorage.getItem('email');

  if (receiverEmail) {
    receiverEmail = receiverEmail.replace(/[@.""]/g, "");
  }
  console.log('received mail', receiverEmail)
  return async(dispatch)=>{
    try {
      const receiverResponse = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/emails/${receiverEmail}/received.json`)

      const receivedData = await receiverResponse.json()

      let loadedData = [];

      for (const key in receivedData) {
        loadedData.push({
          id: key,
          to: receivedData[key].to,
          message: receivedData[key].message,
          senderEmail: receivedData[key].senderEmail,
          subject: receivedData[key].subject,
          timeStamp: receivedData[key].timestamp,
          isRead : receivedData[key].isRead
        });
      }
      dispatch(mailActions.setReceivedMails(loadedData))
      console.log(loadedData)

    
    } catch (error) {
        console.log(error)
    }
  }
}

export const markReadMail =(mailId)=>{
  let email = localStorage.getItem('email');

  if (email) {
    email = email.replace(/[@.""]/g, "");
  }
  console.log('received mail', email)
  return async(dispatch)=>{
    try {
      const response = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/emails/${email}/received/${mailId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isRead: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error('Failed to mark mail as read.');
      }
      dispatch(mailActions.markAsRead(mailId));
    } catch (error) {
      console.error(error);
    }
  }
}

export const DeleteHandler =(id, type)=>{
  let email = localStorage.getItem('email');

  if (email) {
    email = email.replace(/[@.""]/g, "");
  }
  console.log(id,type)
  return async(dispatch)=>{
    try {
      const response = await fetch(`https://mailbox-client-app-713c1-default-rtdb.firebaseio.com/emails/${email}/${type}/${id}.json`,{
        method:'DELETE'
      })
      const data = await response.json()
      console.log(data)
      if(type === 'received'){
      dispatch(mailActions.deleteReceivedHandler(id))
     }else if(type === 'sent'){
      dispatch(mailActions.deleteSentHandler(id))
     }
    } catch (error) {
      console.log(error)
    }  
   
  }
}
