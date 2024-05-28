import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { receivedMailsGet } from '../../Store/Mail-Slice/mail-slice'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const useFetchInbox = () => {
    const dispatch = useDispatch()
    const inboxData = useSelector(state => state.mail.receivedMail)
    const location = useLocation()

    useEffect(()=>{
        dispatch(receivedMailsGet())
    },[dispatch, location])

    return inboxData
}

export default useFetchInbox
