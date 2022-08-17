import React from "react";
import axios from "axios";

const default_url = 'http://127.0.0.1:8000/api';

export const loadCompanies = async () => {
    return await axios.get(default_url + "/company/");
}

export const loadSingleCompany = async (id) => {
    return await axios.get(default_url + "/company/" + id);
}

export const saveNewLogo = async (logo) => {
    return await axios.post(default_url + "/company/", logo);
}
