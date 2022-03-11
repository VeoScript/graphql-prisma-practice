import React from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { DELETE_STUDENT_MUTATION } from '../graphql/modules/mutations'
import DialogLayout from '../layouts/dialog'
import { RiDeleteBinLine, RiCloseLine } from 'react-icons/ri'
import Spinner from '../utils/Spinner'

interface IProps {
  student: any
}

const DeleteForm: React.FC<IProps> = ({ student }) => {

  const [deleteStudent] = useMutation(DELETE_STUDENT_MUTATION)

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  async function onDeleteStudent() {
    const getId = student.id

    const variables = { getId }

    await deleteStudent({ variables })

    closeModal()
    Router.replace(Router.asPath)
  }

  return (
    <React.Fragment>
      <button
        title="Delete"
        className="p-2 rounded-full text-white bg-red-600 transition ease-in-out duration-200 hover:bg-opacity-60"
        onClick={openModal}
      >
        <RiDeleteBinLine />
      </button>

      <DialogLayout
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border border-zinc-300">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">Delete Student</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form
              className="flex flex-col items-center w-full space-y-5 p-5"
              onSubmit={handleSubmit(onDeleteStudent)}
            >
              <p className="w-full text-center">
                <p>Are you want to permanently delete this student</p>
                <p className="font-bold">{ student.name }</p>
              </p>
              <div className="flex items-center justify-center w-full space-x-1">
                {!isSubmitting && (
                  <button
                    type="submit"
                    className="w-[7rem] p-2 rounded-md text-white bg-red-600 transition ease-in-out duration-200 hover:bg-opacity-60"
                  >
                    Delete
                  </button>
                )}
                {isSubmitting && (
                  <div className="flex flex-row items-center justify-center w-[7rem] p-2 rounded-md text-white bg-red-600">
                    <Spinner
                      width={25}
                      height={25}
                      color={'#FFFFFF'}                    
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="w-[7rem] p-2 rounded-md text-black bg-zinc-300 transition ease-in-out duration-200 hover:bg-opacity-60"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogLayout>
    </React.Fragment>
  )
}

export default DeleteForm