package com.project.vrs.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class Routes {

    public static final String VRS = "/api";
    public static final String AUTH_VRS = "/auth/api";
    public static final String LOGOUT = AUTH_VRS + "/logout/{email}";
    public static final String REGISTER = VRS + "/register";
    public static final String LOGIN = VRS + "/sign_in";
    public static final String RESERVE = AUTH_VRS + "/reserve";
    public static final String AVAILABLE_VEHICLES = AUTH_VRS + "/get_vehicles";
    public static final String USER_VEHICLES = AUTH_VRS + "/get_vehicles/{email}";
    public static final String ADD_VEHICLE = AUTH_VRS + "/add_vehicle";
    public static final String VEHICLE_QUALITY = AUTH_VRS + "/quality_info/{vehicle_id}";
    public static final String ADD_VEHICLE_QUALITY = AUTH_VRS + "/quality_info";
    public static final String MAKE_PAYMENT = AUTH_VRS + "/make_payment";
}
