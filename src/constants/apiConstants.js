import {API_SERVER_URL} from "./generalConstants";

// User
export const API_URL = `${API_SERVER_URL}/api`;
export const LOGOUT_API_PATH = `${API_URL}/logout`;
export const EDIT_AVATAR_API_PATH = `${API_URL}/edit_avatar`;
export const FETCH_BALANCE_API_PATH = `${API_URL}/mon_solde`;
export const EDIT_PASSWORD_API_PATH = `${API_URL}/edit_password`;
export const EDIT_PROFILE_API_PATH = `${API_URL}/update_profile`;
export const AUTHENTICATION_API_PATH = `${API_URL}/authentication`;

// Settings
export const EDIT_SETTING_API_PATH = `${API_URL}/edit_setting`;

// Notifications
export const NOTIFICATIONS_API_PATH = `${API_URL}/all_notifications`;
export const READ_NOTIFICATIONS_API_PATH = `${API_URL}/read_notifications`;
export const UNREAD_NOTIFICATIONS_API_PATH = `${API_URL}/unread_notifications`;
export const DELETE_NOTIFICATIONS_API_PATH = `${API_URL}/delete_notifications`;

// Fleets requests
export const NEW_FLEET_API_PATH = `${API_URL}/demande_flote`;
export const FLEETS_API_PATH = `${API_URL}/list_all_demandes_flote`;
export const CANCEL_FLEET_API_PATH = `${API_URL}/annuler_demandes_flote`;
export const ALL_FLEETS_API_PATH = `${API_URL}/list_demandes_flote_agent_all`;

// Clearances requests
export const NEW_CLEARANCE_API_PATH = `${API_URL}/demande_destockage`;
export const CLEARANCES_API_PATH = `${API_URL}/list_all_demandes_destockage`;
export const ALL_CLEARANCES_API_PATH = `${API_URL}/list_all_demandes_destockage_all`;

// Sims
export const SIM_API_PATH = `${API_URL}/show_puce`;
export const SIMS_API_PATH = `${API_URL}/puce_list_resource`;
export const All_SIMS_API_PATH = `${API_URL}/puce_list_resource_all`;

// Recoveries
export const CASH_RECOVERIES_API_PATH = `${API_URL}/list_recouvrement_by_agent`;
export const FLEET_RECOVERIES_API_PATH = `${API_URL}/list_retour_flotte_by_agent`;

// Supplies
export const SUPPLIES_API_PATH = `${API_URL}/list_all_flottage_agent`;

// Refuels
export const REFUELS_API_PATH = `${API_URL}/list_destockage_agent`;
