
import {create} from "zustand"
import { IAuthRes } from "../models/authModel";
import { authenticate } from "../services/authServices"
import { tokenKey, userKey } from "../utils/constants";
import { setAccessToken, setUserData } from "../utils/tokenHelper";

interface AuthState {
  login: (email: string, password: string) => void;
  isLoading: boolean;
  error:any;
  user: IAuthRes | null;
  logout: () => void;
}

export const authStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
//   signup: async (email, password) => {
//     set({ isLoading: true })

//     const response = await fetch("/api/user/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//     const json = await response.json()
//     if (!response.ok) {
//       set({ isLoading: false })
//       set({ error: json.error })
//     }
//     if (response.ok) {
//       localStorage.setItem("user", JSON.stringify(json))
//       set({ user: json })
//       set({ isLoading: false })
//       set({ error: null })
//     }
//   },
  login: async (email: string, password: string) => {
    set({ isLoading: true })

    await authenticate({email: email, password: password}).then((res)=>{
      setAccessToken(res.token)
      setUserData(res)
      set({ user: res })
      set({ isLoading: false })
      set({ error: null })
    }).catch((err)=>{
      set({ isLoading: false })
      set({ error: err })
    });
  },
  logout: () => {
    localStorage.removeItem(tokenKey)
    localStorage.removeItem(userKey)
    set({ user: null })
  },
}))