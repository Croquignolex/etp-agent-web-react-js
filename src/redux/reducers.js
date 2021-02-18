import user from './user/reducer';
import sims from './sims/reducer';
import fleets from './fleets/reducer';
import returns from './returns/reducer';
import refuels from './refuels/reducer';
import settings from './settings/reducer';
import supplies from './supplies/reducer';
import operators from './operators/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import fleetsRequests from './requests/fleets/reducer';
import refuelsRequests from './requests/refuels/reducer';
import returnsRequests from './requests/returns/reducer';
import settingsRequests from './requests/settings/reducer';
import suppliesRequests from './requests/supplies/reducer';
import operatorsRequests from './requests/operators/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import recoveriesRequests from './requests/recoveries/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    fleets,
    returns,
    refuels,
    settings,
    supplies,
    operators,
    recoveries,
    clearances,
    collectors,
    simsRequests,
    userRequests,
    notifications,
    fleetsRequests,
    returnsRequests,
    refuelsRequests,
    suppliesRequests,
    settingsRequests,
    operatorsRequests,
    recoveriesRequests,
    clearancesRequests,
    collectorsRequests,
    notificationsRequests,
};
