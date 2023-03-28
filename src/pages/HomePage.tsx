import React from 'react'
import { Navigate } from 'react-router-dom';

import { getUserData } from '../utils/tokenHelper';
import MapPage from './MapPage';
import UserPage from './UserPage';

const HomePage = () => {
    const user = getUserData();
    if (user === null)
        return <Navigate to={'/login'} />
    return (
        user.role === 'Admin' ? <UserPage /> : <MapPage />
    )
}

export default HomePage