import React from "react";
import axios from "axios";

const default_url = 'http://127.0.0.1:8000/api';

export const loginAdmin = async (admin) => {
    return await axios.post(default_url + "/admin-login", admin);
}

export const getAdmin = async (id) => {
    return await axios.get(default_url + "/admin/" + id);
}
