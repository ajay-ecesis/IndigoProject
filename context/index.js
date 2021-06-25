import { useReducer, createContext, useEffect} from 'react'// store user state
import axios from 'axios'
//import {useRouter} from 'next/router'

// initial state
const initialState = {
    user: null,
};

// create context
const Context = createContext()

// root reducer
const rootReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload};
        case "LOGOUT":
            return {...state, user: null};
        default:
            return state;
    }
};

// context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    // router
    //const router = useRouter();

    useEffect(async () => {
        try{
            const {data} = await axios.get('/api/auth');
            console.log('auth', data);
            if(data.error){
                dispatch({
                    type:"LOGIN",
                    payload: null,
                })
            }
            else {
                if(data){
                    dispatch({
                        type:"LOGIN",
                        payload: data.user,
                    })
                }
                else {
                    dispatch({
                        type:"LOGIN",
                        payload: null,
                    })
                }           
            }
        }catch(err){
            console.log(err);
            dispatch({
                type:"LOGIN",
                payload: null,
            })
        }
        
    },[])

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider};
