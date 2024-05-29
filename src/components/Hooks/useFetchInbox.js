import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { markReadMail, receivedMailsGet } from '../../Store/Mail-Slice/mail-slice'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { LoaderActions } from '../../Store/UI-Slice/loader-slice'

const useFetchInbox = (inboxId) => {
    const dispatch = useDispatch()
    const receivedMails = useSelector(state => state.mail.receivedMail)
    const isLoading = useSelector(state => state.loader.isVisible);
    const location = useLocation()
    console.log(inboxId)
    useEffect(()=>{
        const fetchData = async (inboxId) => {
            await dispatch(markReadMail(inboxId))
            dispatch(LoaderActions.isLoadingData());
            await dispatch(receivedMailsGet());
            dispatch(LoaderActions.stopIsloading());
          };
      
          fetchData();
    },[dispatch, location, inboxId])

    return {receivedMails, isLoading}
}

export default useFetchInbox
