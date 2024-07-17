import { USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,


  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_RESET,

} from '../constants/userConstants'
import axios from 'axios'


export const login = (email, password)=> async (dispatch) => {
  try{
    dispatch({ type:USER_LOGIN_REQUEST })

    const config = {
      'headers':{
        'Content-type':'application/json'
      }
    }    
    const { data } = await axios.post(
      '/api/users/login/',
      {"username" : email, "password": password},
      config
      )
    dispatch({type:USER_LOGIN_SUCCESS,
      payload: data 
    })


    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  catch (error){

    dispatch({
      type:USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      :error.message
    })
  }
}


export const logout = () => async (dispatch)=>{
  // localStorage.removeItem('userInfo')

  // const cartItems = localStorage.getItem('cartItems');

  // // Iterate over localStorage keys and remove those not related to cartItems
  // Object.keys(localStorage).forEach((key) => {
  //   if (key !== 'cartItems') {
  //     localStorage.removeItem(key);
  //   }
  // });
  
  localStorage.removeItem('userInfo')
  dispatch({type:USER_LOGOUT})
  dispatch({type:USER_DETAILS_RESET})
}

export const register = (name,email, password)=> async (dispatch) => {
  try{
    dispatch({ type:USER_REGISTER_REQUEST })

    const config = {
      'headers':{
        'Content-type':'application/json'
      }
    }    
    const { data } = await axios.post(
      '/api/users/register/',
      {"email" : email, "password": password, "name":name},
      config
      )
    dispatch({type:USER_REGISTER_SUCCESS,
      payload: data 
    })

    // dispatch({type:USER_LOGIN_SUCCESS,
    //   payload: data 
    // })



    localStorage.setItem('userRegisterInfo', JSON.stringify(data))
  }
  catch (error){

    dispatch({
      type:USER_REGISTER_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      :error.message
    })
  }
}



export const getUserDetails = ( id)=> async (dispatch,getState) => {
  try{
    dispatch({ type:USER_DETAILS_REQUEST })
    const {
      userLogin:{userInfo}
    } = getState()
    const config = {
      'headers':{
        'Content-type':'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }    
    const { data } = await axios.get(
      `api/users/${id}`,
      config
      )
    dispatch({type:USER_DETAILS_SUCCESS,
      payload: data 
    })
    localStorage.setItem('userDetails', JSON.stringify(data))
  }
  catch (error){

    dispatch({
      type:USER_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      :error.message
    })
  }
}



export const updateProfile = ( user)=> async (dispatch,getState) => {
  try{
    dispatch({ type:USER_PROFILE_UPDATE_REQUEST })
    const {
      userLogin:{userInfo}
    } = getState()

    const config = {
      'headers':{
        'Content-type':'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }    
    const { data } = await axios.put(
      `api/users/profile/update/`,
        user,
          config
      )
    dispatch({type:USER_PROFILE_UPDATE_SUCCESS,
      payload: data 
    })
    
    dispatch({type:USER_LOGIN_SUCCESS,
      payload: data 
    })
    localStorage.setItem('userDetails', JSON.stringify(data))


  }
  catch (error){

    dispatch({
      type:USER_PROFILE_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      :error.message
    })
  }
}