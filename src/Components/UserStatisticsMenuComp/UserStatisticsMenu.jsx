import React from 'react';
import { useAuth } from "../../AuthContext";

import './UserStatisticsMenu.scss';

import Loader from '../LoaderComp/Loader';

const UserStatisticsMenu = () => {
    const { userData, loadingUserData } = useAuth();

    return (
        <div className='user-statistics-menu'>
            {!loadingUserData ?
                <div className="user-statistics-entries">
                    <div className="entry-titles-wrapper">
                        <div className='user-statistics-entry-title'>Использовано компаний
                            <div className='entry-value first'>{userData.eventFiltersInfo.usedCompanyCount}</div>
                        </div>
                        <div className='user-statistics-entry-title'>Лимит по компаниям
                            <div className='entry-value second'>{userData.eventFiltersInfo.companyLimit}</div>
                        </div>
                    </div>
                </div>
            : <Loader />
            }
        </div>
    )
}

export default UserStatisticsMenu;