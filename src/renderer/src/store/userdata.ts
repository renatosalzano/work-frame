// import { UserDataStore } from 
import { create } from "zustand";

export const useUserdata = create<Userdata>(window.userdata.createStore)
