import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import * as path from "../constants/pagePathConstants";
import * as setting from "../constants/settingsConstants";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {emitFetchUserBalance} from "../redux/user/actions";
import {formatNumber} from "../functions/generalFunctions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllClearancesFetch} from "../redux/clearances/actions";
import {storeAllFleetsRequestReset} from "../redux/requests/fleets/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllClearancesRequestReset} from "../redux/requests/clearances/actions";

// Component
function DashboardPage({user, fleets, clearances, settings, dispatch, location, balanceUserRequests,allClearancesRequests, allFleetsRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllFleetsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllClearancesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllFleetsRequestReset());
        dispatch(storeAllClearancesRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
    };

    // Data
    const cardsData = settings.cards;

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            {cardsData.includes(setting.CARD_ACCOUNTS_BALANCE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-dark'
                                                            icon='fa fa-coins'
                                                            url={path.PROFILE_PAGE_PATH}
                                                            request={balanceUserRequests}
                                                            data={formatNumber(user.balance)}
                                                            label={setting.LABEL_ACCOUNTS_BALANCE}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-rss'
                                                            color='bg-danger'
                                                            data={fleets.length}
                                                            request={allFleetsRequests}
                                                            url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                            label={setting.LABEL_FLEETS_REQUESTS}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-warning'
                                                            icon='fa fa-rss-square'
                                                            data={clearances.length}
                                                            request={allClearancesRequests}
                                                            url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                            label={setting.LABEL_CLEARANCES_REQUEST}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    user: PropTypes.object.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    allFleetsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allClearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);