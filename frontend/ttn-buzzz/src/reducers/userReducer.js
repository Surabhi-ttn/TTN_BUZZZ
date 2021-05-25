let initstate = {
  status: 200,
  message: "successful login",
  profile: {
    profile_pic: "",
    cover_pic: "",
    designation: "software engineer",
    gender: "female",
    date_of_birth: "2021-05-04T00:00:00.000Z",
    website: "aaa",
    city: "Kanpur",
    state: "UP",
    pincode: 110019,
    post_count: 0,
    friends: ["ankitpahwa111@gmail.com"],
    friend_request: [],
    is_admin: false,
    created_at: "2021-05-17T15:01:57.508Z",
    updated_at: "2021-05-17T15:01:57.508Z",
    _id: "60a28585b69e342b63bb08f9",
    user_id: "surabhi.chaurasia@tothenew.com",
    first_name: "Surabhi",
    last_name: "Chaurasia",
    __v: 0,
  },
};

export const userReducer = (state = initstate, action) => {
  console.log(action);
  switch (action.type) {
    case "UPDATE_PROFILE":
      return action.payload || initstate;
    default:
      return state;
  }
};

