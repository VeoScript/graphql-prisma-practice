import React from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_STUDENT_MUTATION } from '../graphql/modules/mutations'
import DialogLayout from '../layouts/dialog'
import { RiEditBoxLine, RiCloseLine } from 'react-icons/ri'
import Spinner from '../utils/Spinner'

interface IProps {
  student: any
}

interface FormData {
  name: string
  age: string
  gender: string
  course: string
}

const EditForm: React.FC<IProps> = ({ student }) => {

  const [editStudent] = useMutation(UPDATE_STUDENT_MUTATION)

  const defaultValues = {
    name: student.name,
    age: student.age,
    gender: student.gender,
    course: student.course
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ defaultValues })

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    reset(defaultValues)
    setIsOpen(true)
  }

  async function onEditStudent(formData: FormData) {
    const getId = student.id
    const name = formData.name
    const age = formData.age
    const gender = formData.gender
    const course = formData.course

    const variables = { getId, name, age, gender, course }

    await editStudent({ variables })

    reset()
    closeModal()
    Router.replace(Router.asPath)
  }

  return (
    <React.Fragment>
      <button 
        title="Edit" 
        className="outline-none p-2 rounded-full text-white bg-green-600 transition ease-in-out duration-200 hover:bg-opacity-60"
        onClick={openModal}
      >
        <RiEditBoxLine />
      </button>

      <DialogLayout
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="font-titilliumweb inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border border-zinc-300">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b border-zinc-300">
              <h3 className="font-bold text-lg">Edit Student</h3>
              <button
                className="outline-none"
                onClick={closeModal}
              >
                <RiCloseLine className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form
              className={`${isSubmitting ? 'hidden' : 'flex flex-col'} w-full space-y-3 p-5`}
              onSubmit={handleSubmit(onEditStudent)}
            >
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Name</label>
                <input
                  type="text"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-green-600"
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Age</label>
                <input
                  type="number"
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-green-600"
                  min={5}
                  {...register('age', { required: true })}
                />
                {errors.age && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex flex-col w-full space-y-1">
                <label className="text-sm text-zinc-400">Gender</label>
                <select
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-green-600"
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
                  className="form-input outline-none mt-0 block w-full px-0.5 py-3 border-0 border-b border-zinc-300 focus:ring-0 focus:border-green-600"
                  {...register('course', { required: true })}
                />
                {errors.course && <span className="font-light text-xs text-red-600">Required</span>}
              </div>
              <div className="flex items-center justify-end w-full">
                <button
                  type="submit"
                  className="w-[7rem] p-2 rounded-md text-white bg-green-600 transition ease-in-out duration-200 hover:bg-opacity-60"
                >
                  Update
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

export default EditForm