import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface ProjectState {
    id: string;
    title: string;
    description: string;
    color: string;
    createdAt: string;
    members: [];
    boards: [];
}

const initialState: ProjectState = {
        id: '',
        title: '',
        description: '',
        color: '',
        createdAt: '',
        members: [],
        boards: [],
}
 
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        rollbackProject () { return initialState },
        setProject (state, action: PayloadAction<any>) {
            Object.assign(state, action.payload)
        },
    }
})

export const { rollbackProject, setProject } = projectSlice.actions
export default projectSlice.reducer
