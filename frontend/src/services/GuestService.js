import React from "react";
import axios from "axios";

const default_url = 'http://127.0.0.1:8000/api';

export const saveGuest = async (guest) => {
    return await axios.post(default_url + "/guest/", guest);
}

export const getGuest = async (id) => {
    return await axios.get(default_url + "/guest/" + id);
}

export const getAllGuests = async () => {
    return await axios.get(default_url + "/guest/");
}

export const updateGuestScore = async (id, guest) => {
    return await axios.put(default_url + "/guest/" + id + "/", guest)
}
