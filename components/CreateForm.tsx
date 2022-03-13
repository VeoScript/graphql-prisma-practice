import React from 'react'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_STUDENT_MUTATION } from '../graphql/modules/mutations'
import DialogLayout from '../layouts/dialog'
import { RiAddLine, RiCheckboxCircleFill, RiCloseLine } from 'react-icons/ri'
import Spinner from '../utils/Spinner'

interface FormData {
  name: string
  age: string
  gender: string
  course: string
}

const CreateForm = () => {

  const [addStudent] = useMutation(CREATE_STUDENT_MUTATION)

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    reset()
    setIsOpen(true)
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  async function onAddStudent(formData: FormData) {
    const name = formData.name
    const age = formData.age
    const gender = formData.gender
    const course = formData.course

    const variables = { name, age, gender, course }

    await addStudent({ variables })

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <RiCheckboxCircleFill className="w-10 h-10 text-blue-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                { name }
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Student successfully added.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ))

    reset()
    closeModal()
    Router.replace(Router.asPath)
  }

  return (
    <React.Fragment>
      <button
        title="New Student"
        className="outline-none p-2 rounded-full text-white bg-blue-600 transition ease-in-out duration-200 hover:bg-opacity-60"
        onClick={openModal}
      >
        <RiAddLine className="w-6 h-6" />
      </button>

      <DialogLayout
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border border-zinc-300">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">New Student</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form
              className={`${isSubmitting ? 'hidden' : 'flex flex-col'} w-full space-y-3 p-5`}
              onSubmit={handleSubmit(onAddStudent)}
            >
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Name</label>
                <input
                  type="text"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Age</label>
                <input
                  type="number"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  min={5}
                  {...register('age', { required: true })}
                />
                {errors.age && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Gender</label>
                <select
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600 cursor-pointer"
                  {...register('gender', { required: true })}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Course</label>
                <input
                  type="text"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-blue-600"
                  {...register('course', { required: true })}
                />
                {errors.course && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex items-center justify-end w-full">
                <button
                  type="submit"
                  className="w-[7rem] p-2 rounded-md text-white bg-blue-600 transition ease-in-out duration-200 hover:bg-opacity-60"
                >
                  Add
                </button>
              </div>
            </form>
            {isSubmitting && (
              <div className="flex flex-col items-center justify-center p-5 w-full h-[20rem] space-y-2">
                <Spinner
                  width={50}
                  height={50}
                  color={'#333333'}                  
                />
                <span className="font-light text-base">Sending...</span>
              </div>
            )}
          </div>
        </div>
      </DialogLayout>
    </React.Fragment>
  )
}

export default CreateForm