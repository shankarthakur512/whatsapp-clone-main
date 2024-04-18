export const HOST = "http://localhost:4000"

const AUTH_ROUTE= `${HOST}/api/v1/user`
const MESSAGE_ROUTE = `${HOST}/api/v1/messages`
export const CHECK_USER = `${AUTH_ROUTE}/login`
export const ONBOARDING_USER = `${AUTH_ROUTE}/onboarding`
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`
export const GENERATE_TOKENS = `${AUTH_ROUTE}/generate-token`
export const SEND_MESSAGE = `${MESSAGE_ROUTE}/add-message`
export const GET_MESSAGE = `${MESSAGE_ROUTE}/get-messages`
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-image-message`
export const ADD_AUDIO_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-audio-message`
export const GET_INTIAL_CONTACTS = `${MESSAGE_ROUTE}/get-intial-contacts`
