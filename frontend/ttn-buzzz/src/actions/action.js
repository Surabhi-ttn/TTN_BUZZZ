import axios from 'axios';

export const fetchUserAction = () => {
   return (dispatch) => {

    axios.get('http://localhost:9000/auth/current_user')
    .then((res) => {
        console.log(res)
       dispatch({type:'GET_USER', payload: res.data})
    })

   }
}