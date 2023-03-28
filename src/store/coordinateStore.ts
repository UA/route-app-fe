
import {create} from "zustand"
import { IUserCoordinateReq, IUserCoordinateRes } from "../models/coordinateModel";
import { createCoordinate, deleteCoordinate, getCoordinates } from "../services/coordinateServices";

interface CoordinateState {
    coordinate: IUserCoordinateRes | null;
    setUserId: (userId: string) => void;
    createCoordinate: (req: IUserCoordinateReq) => void;
    deleteCoordinate: (id: string) => void;
    fetchCoordinates: (userId: string) => void;
    handleUserCoordinateOpen: () => void;
    handleUserCoordinateClose: () => void;
    isCoordinateLoading: boolean;
    isUserCoordinateOpen: boolean;
    userId: string | null;
    error:any;
  }

  export const coordinateStore = create<CoordinateState>((set) => ({
    coordinate: null,
    isCoordinateLoading: false,
    isUserCoordinateOpen: false,
    error: null,
    userId: null,
    setUserId: (userId: string) => {
      set({userId: userId})
    },
    handleUserCoordinateOpen: () => {
      set({isUserCoordinateOpen: true});
    },
    handleUserCoordinateClose: () => {
      set({isUserCoordinateOpen: false})
      set({coordinate: null})
      set({userId: null})
    },
    fetchCoordinates: async (userId: string) => {
      set({ isCoordinateLoading: true })
      await getCoordinates(userId)
      .then((res)=>{
          set({ isUserCoordinateOpen: true })
          set({ isCoordinateLoading: false })
          set({ coordinate: res })
      }).catch((err)=>{
          set({ isCoordinateLoading: false })
          set({ error: err })
      });
    },
    createCoordinate: async (req: IUserCoordinateReq) => {
        set({ isCoordinateLoading: true })
        await createCoordinate(req)
        .then(()=>{
            set({ isCoordinateLoading: false })
            set({isUserCoordinateOpen: false})
        }).catch((err)=>{
            set({ isCoordinateLoading: false })
            set({ error: err })
        });
    },
    deleteCoordinate: async (id) => {
        set({ isCoordinateLoading: true })
        await deleteCoordinate(id)
        .then(()=>{
            set({ isCoordinateLoading: false })
            set({ isUserCoordinateOpen: false })
        }).catch((err)=>{
            set({ isCoordinateLoading: false })
            set({ error: err })
        });
    },
  }));

  
