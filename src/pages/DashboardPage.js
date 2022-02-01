import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import {DONE} from "../constants/typeConstants";
import * as path from "../constants/pagePathConstants";
import * as setting from "../constants/settingsConstants";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {formatNumber} from "../functions/generalFunctions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllClearancesFetch} from "../redux/clearances/actions";
import {storeAllFleetsRequestReset} from "../redux/requests/fleets/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllClearancesRequestReset} from "../redux/requests/clearances/actions";
import DashboardWithOperatorCardComponent from "../components/dashboard/DashboardWithOperatorCardComponent";

// Component
function DashboardPage({fleets, clearances, settings, dispatch,
                           location, allClearancesRequests, allFleetsRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllFleetsFetch());
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
    };

    // Data
    const cardsData = settings.cards;
    const mtnFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const orangeFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const yupFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '3');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const yoomeeFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '4');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const mtnClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const orangeClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const yupClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '3');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const yoomeeClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '4');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        {/* Fleets requests */}
                        <div className="row">
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_MTN) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '1'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(mtnFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_MTN} (${mtnFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_ORANGE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '2'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(orangeFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_ORANGE} (${orangeFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_YUP) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '3'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(yupFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_YUP} (${yupFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_YOOMEE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '4'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(yoomeeFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_YOOMEE} (${yoomeeFleetsData.number})`}
                                />
                            </div>
                            }
                        </div>

                        {/* Clearances requests */}
                        <div className="row">
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_MTN) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '1'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(mtnClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_MTN} (${mtnClearancesData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_ORANGE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '2'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(orangeClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_ORANGE} (${orangeClearancesData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_YUP) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '3'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(yupClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_YUP} (${yupClearancesData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_YOOMEE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '4'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(yoomeeClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_YOOMEE} (${yoomeeClearancesData.number})`}
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
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    allFleetsRequests: PropTypes.object.isRequired,
    allClearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
