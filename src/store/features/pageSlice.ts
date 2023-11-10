import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface PageState {
    loading: boolean;
    metadata: {
        title?: string,
        description?: string,
    };
}

const initialState: PageState = {
        loading: true,
        metadata: {},
}
 
export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        rollback: () => { return initialState },
        setMetadata (state, action: PayloadAction<any>) { state.metadata = action.payload },
        pageLoading (state) { state.loading = true },
        pageLoaded (state) { state.loading = false },
    }
})

export const { rollback, setMetadata, pageLoading, pageLoaded } = pageSlice.actions
export default pageSlice.reducer
