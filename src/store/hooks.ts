import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from ".";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch;
