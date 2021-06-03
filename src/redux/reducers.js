import user from './user/reducer';
import sims from './sims/reducer';
import fleets from './fleets/reducer';
import returns from './returns/reducer';
import refuels from './refuels/reducer';
import settings from './settings/reducer';
import supplies from './supplies/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import fleetsRequests from './requests/fleets/reducer';
import refuelsRequests from './requests/refuels/reducer';
import returnsRequests from './requests/returns/reducer';
import settingsRequests from './requests/settings/reducer';
import suppliesRequests from './requests/supplies/reducer';
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
    recoveries,
    clearances,
    simsRequests,
    userRequests,
    notifications,
    fleetsRequests,
    returnsRequests,
    refuelsRequests,
    suppliesRequests,
    settingsRequests,
    recoveriesRequests,
    clearancesRequests,
    notificationsRequests,
};
