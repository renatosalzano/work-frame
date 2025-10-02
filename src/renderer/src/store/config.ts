import { create } from "zustand";

export const useConfig = create<Config>(window.config.createStore)
