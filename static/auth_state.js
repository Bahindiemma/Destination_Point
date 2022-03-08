
/*
* This file stores the current state of the user on the site and persists it using localstorage
*
* Listener sets the authStore
* */

import { writable } from "svelte/store";

// script to persist stores to localstorage
import { persist_store } from "./persist_store.js";

const auth = persist_store('user', {
    isLoggedIn: false,
    firebaseControlled: false,
})

export default {
    subscribe: auth.subscribe,
    set: auth.set,
};
