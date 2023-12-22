'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/store"
import { deleteDocProject, updatedDocProject } from "@/firebase/features/project"
import ColorPicker from "@/app/_components/colorPicker"
import Trash from "@/assets/svg/trash"
import { PageLoading } from "@/app/_components/loadings"
import { ButtonSubmit } from "@/app/_components/buttons"


export default function Settings() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const { replace } = useRouter()
    const errorText = 'Something went wrong! Please try again later.'
    const [color, setColor] = useState(currentProject.color)
    const [loading, setLoading] = useState(false)

    function getFormData(formData: FormData) {
        return {
            title: (formData.get('title') as string).trim(),
            description: (formData.get('description') as string).trim(),
            color: (formData.get('color') as string),
            requests: formData.get('requests') ? true : false,
        }
    }

    async function updateProject(project: any) {
        setLoading(true)
        if (await updatedDocProject(currentProject.id, project)) alert('The project has been updated')
        else alert(errorText)
        setLoading(false)
    }

    async function deleteProject() {
        var r = confirm("Delete this project?");
        if (r === true) {
            setLoading(true)
            if (await deleteDocProject(currentProject.id, currentProject)) replace('/')
            else alert(errorText)
            setLoading(false)
        }
    }

    return (
        <div className="settings-container">
            {!loading ? null : <PageLoading />}
            <form className='form' action={formData => {
                const updatedBoard: {} = getFormData(formData)
                updateProject(updatedBoard)
            }}>
                <div className="form-inputs">
                    <input className="title" name="title" placeholder="Title"
                        defaultValue={currentProject.title} type="text" maxLength={20} required
                    />
                    <textarea className="description" name='description' placeholder='Description'
                        defaultValue={currentProject.description} maxLength={1000}
                    />
                    <ColorPicker defaultValue={color} onChange={(e: any) => setColor(e)} />
                    <div className="requests">
                        <p>Users can send requests to join:</p>
                        <input type='checkbox' name='requests' defaultChecked={currentProject.requests}/>
                    </div>
                </div>
                <div className="form-buttons">
                    <button type="reset" className="button-secondary" onClick={() => setColor(currentProject.color)}>
                        Cancel
                    </button>
                    <ButtonSubmit text="Save"/>
                </div>
            </form>
            <button className="delete-project" onClick={deleteProject}>
                <Trash color="rgb(181, 48, 44)" />
                <h3>Delete project</h3>
            </button>
        </div>
    )
}