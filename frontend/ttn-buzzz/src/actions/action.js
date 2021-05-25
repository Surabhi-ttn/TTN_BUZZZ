
export const updateProfile = (updatedprofile) => {
   return (dispatch) => {
      dispatch({
         type: "UPDATE_PROFILE", 
         updatedprofile: updatedprofile
      })
   }
}