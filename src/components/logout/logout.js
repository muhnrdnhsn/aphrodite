import React, { useEffect } from 'react'

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem('token')
    })

    return(
        <div>

        </div>
    )
}


export default Logout;