import React from 'react';
import { useAuth } from "../../AuthContext";

import './UserStatisticsMenu.scss';

import Loader from '../LoaderComp/Loader';

const UserStatisticsMenu = () => {
    const { userData, loadingUserData } = useAuth();

    return (
        <div className='user-statistics-menu_container'>
            {!loadingUserData ?
                <div className="user-statistics-menu_entries">
                    <div className="user-statistics-menu_entry-titles-wrapper">
                        <div className='user-statistics-menu_entry-title'>Использовано компаний
                            <div className='user-statistics-menu_entry-value user-statistics-menu_first-entry'>{userData.eventFiltersInfo.usedCompanyCount}</div>
                        </div>
                        <div className='user-statistics-menu_entry-title'>Лимит по компаниям
                            <div className='user-statistics-menu_entry-value user-statistics-menu_second-entry'>{userData.eventFiltersInfo.companyLimit}</div>
                        </div>
                    </div>
                </div>
            : <Loader />
            }
        </div>
    )
}

export default UserStatisticsMenu;