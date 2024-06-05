import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { LoaderActions } from '../Store/UI-Slice/loader-slice'
import { receivedMailsGet } from '../Store/Mail-Slice/mail-slice'

const sortItems =(Items, ascending) =>{
    return [...Items].sort((ItemA, ItemB)=>{
      if(ascending){
          return ItemA.id > ItemB.id ? 1 : -1;
      }else{
        return ItemA.id < ItemB.id ? 1 : -1;
      }
    })
  }

const useFetchInbox = () => {
    const dispatch = useDispatch()
    const receivedMails = useSelector(state => state.mail.receivedMail)
    const isLoading = useSelector(state => state.loader.isVisible);
    const location = useLocation()

    useEffect(()=>{
        const fetchData = async () => {
            dispatch(LoaderActions.isLoadingData());
            await dispatch(receivedMailsGet());
            dispatch(LoaderActions.stopIsloading());
          };
      
          fetchData();
    },[dispatch, location])

    const queryParams = new URLSearchParams(location.search)

    const isSortAscending = queryParams.get('sort') === 'asc'
  
    const sortIedtems = sortItems(receivedMails, isSortAscending) 
    console.log(sortIedtems)

    return {sortIedtems, isLoading, isSortAscending}
}

export default useFetchInbox
