import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { DocumentData, arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { getProjectRequests } from "@/firebase/features/member";
import { DataGrid, GridActionsCellItem, GridValueGetterParams, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import Close from "@/assets/svg/close";
import Tick from "@/assets/svg/tick";
import { setDocById } from "@/firebase/features/setDoc";
import { useRouter } from "next/navigation";


export default function ModalRequests() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const currentProject = useAppSelector((state) => state.projectReducer)
    const [requests, setRequests] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const { replace } = useRouter();

    useEffect(() => {
        if (currentProject.userRole) {
            currentProject.userRole == 'member' ? replace('?') : getRequests()
        }
    }, [currentProject.requestsToJoin, currentProject.userRole])

    async function getRequests() {
        const arr = await getProjectRequests(currentProject.requestsToJoin)
        setRequests(arr)
        setLoading(false)
    }


    async function actionRequests(id: any, isAccept: boolean) {
        try {
            setLoading(true)
            const projectRef = doc(FIREBASE_DB, `projects/${currentProject.id}`);
            await updateDoc(projectRef, { requestsToJoin: arrayRemove(id) });
            if (isAccept) {
                await Promise.all([
                    updateDoc(projectRef, { members: arrayUnion(id) }),
                    setDocById(`users/${id}/projects/${currentProject.id}`, {
                        joined: moment().unix(),
                        role: "member"
                    })
                ])
            }
        } catch (error) {
            alert('Something went wrong! Please try again later.')
        }
    }

    return (
        <div className="modal-request form">
            <DataGrid className="table"
                loading={loading}
                rows={requests}
                columns={[
                    {
                        field: 'avatar', headerName: 'Avatar', width: 80, sortable: false, filterable: false,
                        valueGetter: (params: GridValueGetterParams) => ({ letter: params.row.username[0], color: params.row.color }),
                        renderCell: ({ value }) => (
                            <h1 className="avatar flex-center" style={{ backgroundColor: value.color }}>
                                {value.letter}
                            </h1>
                        ),
                    },
                    { field: 'username', headerName: 'Username', width: 200, type: "string" },
                    { field: 'email', headerName: 'Email', width: 160, type: "string" },
                    {
                        field: 'actions', headerName: 'Actions', width: 80, type: "actions", sortable: false, filterable: false,
                        getActions: ({ id }) => ([
                            <GridActionsCellItem
                                icon={<div className="request-action"><Tick /></div>}
                                label="Accept"
                                onClick={() => actionRequests(id, true)}
                            />,
                            <GridActionsCellItem
                                icon={<div className="request-action"><Close /></div>}
                                label="Decline"
                                onClick={() => actionRequests(id, false)}
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