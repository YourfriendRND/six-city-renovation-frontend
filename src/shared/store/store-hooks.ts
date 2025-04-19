import { useDispatch, useSelector, useStore } from 'react-redux'
import type { State, AppDispatch, store as AppStore } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<State>()
export const useAppStore = useStore.withTypes<typeof AppStore>()
