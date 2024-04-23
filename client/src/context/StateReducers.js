import { reducerCases } from "./constants";

export const initialState ={
userInfo : undefined,
newUser : undefined,
contactsPage : false,
currentChatUser : undefined,
messages : [],
socket : undefined,
messageSearch : false,
userContacts : [],
onlineUser : [],
filteredContacts : [],
voiceCall : undefined,
videoCall : undefined,
IncomingVideoCall : undefined,
IncomingVoiceCall : undefined,
peer : undefined,
// offer : undefined,

};

const reducer = (state ,action) =>{
    switch(action.type){
        case reducerCases.SET_USER_INFO:
        return {
            ...state,
            userInfo : action.userInfo,
        };
        case reducerCases.SET_NEW_USER:
            return{
                ...state,
                newUser : action.newUser
            };
        case reducerCases.SET_ALL_CONTACTS_PAGE:
            return {
                ...state,
                contactsPage : !state.contactsPage
            };
        case reducerCases.CHANGE_CURRENT_CHAT_USER:
            return{
                ...state,
                currentChatUser : action.user
            }
        case reducerCases.SET_MESSAGES:
            return {
            ...state,
            messages : action.messages,
        }
        case reducerCases.SET_SOCKET :
        return {
          ...state,
          socket : action.socket,
        }
        case reducerCases.ADD_MESSAGE:
            return {
                ...state,
                messages : [...state.messages , action.newMessage]
            }
        case reducerCases.SET_MESSAGE_SEARCH:{
            return {
                 ...state,
                 messageSearch : !state.messageSearch
            }
        }
        case reducerCases.SET_USER_CONTACTS : {
            return {
                ...state ,
                userContacts : action.userContacts
            }
        }
        case reducerCases.SET_ONLINE_USER: {
            return {
                ...state ,
                onlineUser : action.onlineUser
            }
        }
        case reducerCases.SET_FILTERED_CONTACTS :{

      const filteredContacts =   state.userContacts.filter((contacts) => contacts.name.toLowerCase().includes(action.contactSearched.toLowerCase()))
      
            return {
                ...state,
                contactSearched : action.contactSearched,
                filteredContacts 
     }  
     }
     case reducerCases.SET_VIDEO_CALL: {
       return{
        ...state,
        videoCall : action.videoCall
       }
     }
     case reducerCases.SET_VOICE_CALL: {
        return{
         ...state,
         voiceCall : action.voiceCall
        }
      }
      case reducerCases.SET_INCOMING_VIDEO_CALL: {
        return{
         ...state,
         IncomingVideoCall : action.IncomingVideoCall
        }
      }
      case reducerCases.SET_INCOMING_VOICE_CALL: {
        return{
         ...state,
         IncomingVoiceCall : action.IncomingVoiceCall
        }
      }
      case reducerCases.SET_END_CALL :{
        return{
            ...state,
            voiceCall : undefined,
            videoCall : undefined,
            IncomingVideoCall : undefined,
            IncomingVoiceCall : undefined,
        }
      }
      case reducerCases.SET_PEER : {
        return {
            ...state,
            peer : action.peer
        }
      }
    //   case reducerCases.CREATE_OFFER : {
        
    
    //     return {
    //         ...state,
    //         offer : action.myOffer
    //     }
    //   }

    case reducerCases.SET_EXIT_CHAT :{
        return{
            ...state,
            currentChatUser : undefined
        }
    }
        default:
            return state;
    }
}
export default reducer;