import axios from "axios";
import store from "@/store";
import router from "@/router";

axios.defaults.baseURL = `${window.location.origin}/api/`;
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use((request) => {
    const token = store.getters["auth/token"];
    if (token) {
        request.headers.common.Authorization = `Bearer ${token}`;
    }

    const locale = store.getters["lang/locale"];
    if (locale) {
        request.headers.common["Accept-Language"] = locale;
    }
    // request.headers['X-Socket-Id'] = Echo.socketId()
    return request;
});

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            sessionStorage.removeItem("TOKEN");
            router.push({ name: "Login" });
        } else if (error.response.status === 404) {
            router.push({ name: "NotFound" });
        }
        throw error;
    }
);
