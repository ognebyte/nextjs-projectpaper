import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface ProjectState {
    id: string;
    title: string;
    description: string;
    color: string;
    createdAt: number;
    members: string[];
    boards: string[];
    requestsToJoin: string[];
    requests: boolean | undefined;
    userRole: string | undefined;
}

const initialState: ProjectState = {
    id: '',
    title: '',
    description: '',
    color: '',
    createdAt: NaN,
    members: [],
    boards: [],
    requests: undefined,
    requestsToJoin: [],
    userRole: undefined,
}
 
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        rollbackProject () { return initialState },
        setProject (state, action: PayloadAction<any>) {
            Object.assign(state, action.payload)
        },
        setUserRole (state, action: PayloadAction<any>) {
            state.userRole = action.payload
        }
    }
})

export const { rollbackProject, setProject, setUserRole } = projectSlice.actions
export default projectSlice.reducer
