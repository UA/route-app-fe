
import {create} from "zustand"
import { IUserReq, IUserRes } from "../models/userModel";
import { createUser, deleteUser, getUsers } from "../services/userServices";

interface UserState {
    users: IUserRes[];
    createUser: (req: IUserReq) => void;
    deleteUser: (id: string) => void;
    fetchUsers: () => void;
    onCreateUserOpen: () => void;
    onCreateUserClose: () => void;
    isUserLoading: boolean;
    isCreateUserOpen: boolean;
    error:any;
  }

  export const userStore = create<UserState>((set) => ({
    users: [],
    isUserLoading: false,
    isCreateUserOpen: false,
    error: null,
    onCreateUserOpen: () => {
        set({isCreateUserOpen: true})
    },
    onCreateUserClose: () => {
        set({isCreateUserOpen: false})
    },
    fetchUsers: async () => {
      set({ isUserLoading: true })
      await getUsers()
      .then((res)=>{
          set({ isUserLoading: false })
          set({ users: res })
      }).catch((err)=>{
          set({ isUserLoading: false })
          set({ error: err })
      });
    },
    createUser: async (req: IUserReq) => {
        set({ isUserLoading: true })
        await createUser(req)
        .then((res)=>{
            set({ isUserLoading: false })
            set((state) => ({
                users: [
                  ...state.users,
                  {
                    ...res
                  } as IUserRes,
                ],
              }));
              set({ isCreateUserOpen: false })
        }).catch((err)=>{
            set({ isUserLoading: false })
            set({ error: err })
        });
     
    },
    deleteUser: async (id) => {
        set({ isUserLoading: true })
        await deleteUser(id)
        .then(()=>{
            set({ isUserLoading: false })
            set((state) => ({
                users: state.users.filter((user) => user.id !== id),
              }));
        }).catch((err)=>{
            set({ isUserLoading: false })
            set({ error: err })
        });
    
    },
  }));

  
