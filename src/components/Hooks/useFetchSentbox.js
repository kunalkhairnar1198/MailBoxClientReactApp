import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { LoaderActions } from '../../Store/UI-Slice/loader-slice'
import { getSentMails } from '../../Store/Mail-Slice/mail-slice'

const useFetchSentbox = () => {
    const mails = useSelector(state => state.mail.sentMail)
    const isLoading = useSelector(state => state.loader.isVisible); 
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        const fetchData = async () => {
            dispatch(LoaderActions.isLoadingData());
            await dispatch(getSentMails());
            dispatch(LoaderActions.stopIsloading());
          };
      
          fetchData();
    },[dispatch,location])
    
  return {mails, isLoading}
}

export default useFetchSentbox
