let initstate = {
  status: 200,
  message: "successful login",
  profile: {
    profile_pic: "https://lh3.googleusercontent.com/fife/ABSRlIrHOIluvFChHmd_2br9RYvhskmR6ijPTD5nCvosSk5S532wIkU1I0KfN8hHex6EWQFnj9MSGT-de_abVvwX87Qhmwyfa9ZBKvU1KZwrJzUnEpghOtaKXc68a8VsuOb0WN8_nu_sUPawKySA3YsPOn2F6_XRVr_JDX3eUZlKJRQ1DRYFO7HCZUN-8rckpM8IpY_4Si-em1c3hZOX4J8-9FJJwsGapSZ4-pqe-d3_7vwYibkFgAb4KaFUzOPYxSSJBcTpty6m7bvG4CQPddiDcn9Sm_Jd_xlW16paWsK1cim_J3CZVc0YTKdeBcdDcddAljYfKlZi0WPeMIY6-hp_LMa_KFGHRy8rQ8aUUh-Baa4HigvRENke3JQAO2C9jtimVKzBqrosuHajwrk35oYwWrhCgSUlYVvd1HGKQo65YPtD-pUtkYgfUVUKr5SW-_V1RCTTu2GJTmnWzDNVqxcXwSZcMxba1zjGc7e4gVfd5Dw4KlxaKRE3vaDf-6lwbJtNvUqzafkR2njius1_szkNef7EWHyjFtfQAu7xt5Zdvh6WQslo7HjfVm8Z4TmYUy28FdL8heBCQzELkwuHbsaTiDrejEOsUY_DNZV1smGB-cu696Zx0zSlbT2ECZSQuGxDvqxkuizB-UlIO5KA57B_YcvjmspGCtRtjLALfNRkqN-cPXmVQ4nl_fAFdz5LpaDT6-YNMx3twAl9bVtDSvCzikV2rBjqFKIeSrQOQa2q1gVVkQ=s83-c",
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

