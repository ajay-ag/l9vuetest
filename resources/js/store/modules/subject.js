import axios from "axios";
import Cookies from "js-cookie";
import * as types from "../mutation-types";

// state
export const state = {
  subjects: [],
};

// getters
export const getters = {
  subjects: (state) => state.subjects,
};

// mutations
export const mutations = {
  [types.SAVE_SUBJECT](state, { subjects }) {
    state.subjects = subjects;
  },
  [types.ADD_SUBJECT](state, { subjects }) {
    state.subjects = [...state.subjects, { ...subjects }];
  },
};

// actions
export const actions = {
  async saveSubject({ commit }, { subject }) {
    try {
      const { data } = await subject.post("subjects");
      commit(types.ADD_SUBJECT, { subjects: data });
      subject.reset();
    } catch (e) {
      console.log(e);
    }
  },
  async getSubjects({ commit }) {
    try {
      const { data } = await axios.get("subjects");
      commit(types.SAVE_SUBJECT, { subjects: data });
    } catch (e) {
      console.log(e);
    }
  },
};
