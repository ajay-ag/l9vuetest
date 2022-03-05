import axios from "axios";
import Cookies from "js-cookie";
import * as types from "../mutation-types";

// state
export const state = {
  user: {
    loggedIn: false,
    isSubscribed: false,
  },
};

// getters
export const getters = {
  auth: (state) => state.user,
};

// mutations
export const mutations = {};

// actions
export const actions = {};
