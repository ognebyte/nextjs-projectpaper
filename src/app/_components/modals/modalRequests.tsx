import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { DocumentData } from "firebase/firestore";
import { getProjectRequests } from "@/firebase/features/member";
import { DataGrid, GridActionsCellItem, GridToolbar, GridValueGetterParams, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import Close from "@/assets/svg/close";
import Tick from "@/assets/svg/tick";


const COLORS = ['#8AB4F8', '#F28B82', '#FDD663', '#81C995', '#FF8BCB', '#C58AF9', '#FCAD70', '#78D9EC',]


export default function ModalRequests() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const currentProject = useAppSelector((state) => state.projectReducer)
    const [requests, setRequests] = useState<DocumentData[]>([]);

    useEffect(() => {
        getRequests()
    }, [])

    async function getRequests() {
        const arr = await getProjectRequests(currentProject.requestsToJoin)
        setRequests(arr)
    }


    function acceptRequest(id: any) {
        console.log('accept', id)
    }
    function declineRequest(id: any) {
        console.log('decline', id)
    }

    return (
        <div className="modal-request form">
            <DataGrid className="table"
                loading={requests.length == 0}
                rows={requests}
                columns={[
                    {
                        field: 'avatar', headerName: 'Avatar', width: 80, sortable: false, filterable: false,
                        valueGetter: (params: GridValueGetterParams) => params.row.username[0],
                        renderCell: ({ value }) => (
                            <div className="avatar-container">
                                <h1 className="avatar flex-center" style={{ backgroundColor: COLORS[Math.floor(Math.random() * 8)] }}>
                                    {value}
                                </h1>
                            </div>
                        ),
                    },
                    { field: 'username', headerName: 'Username', width: 200, type: "string" },
                    { field: 'email', headerName: 'Email', width: 160, type: "string" },
                    {
                        field: 'actions', headerName: 'Actions', width: 80, type: "actions", sortable: false, filterable: false,
                        cellClassName: 'actions',
                        getActions: ({ id }) => ([
                            <GridActionsCellItem
                                icon={<div className="request-action"><Tick /></div>}
                                label="Accept"
                                onClick={() => acceptRequest(id)}
                            />,
                            <GridActionsCellItem
                                icon={<div className="request-action"><Close /></div>}
                                label="Decline"
                                onClick={() => declineRequest(id)}
                            />,
                        ])
                    },
                ]}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 }, } }}
                pageSizeOptions={[50, 100, 150, 200]}
                disableColumnMenu
                disableDensitySelector
                rowSelection={false}
                sx={{
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none', },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none', },
                }}
            />
        </div>
    );
}