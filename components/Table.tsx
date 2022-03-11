import React from 'react'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'

interface IProps {
  students: any
}

const Table: React.FC<IProps> = ({ students }) => {
  return (
    <table className="border-collapse border border-slate-400 w-full max-w-3xl">
      <thead>
        <tr>
          <th className="border border-slate-300 p-3">Name</th>
          <th className="border border-slate-300 p-3">Age</th>
          <th className="border border-slate-300 p-3">Gender</th>
          <th className="border border-slate-300 p-3">Course</th>
          <th className="border border-slate-300 p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student: {id: string, name: string, age: string, gender: string, course: string}) => (
          <tr key={student.id}>
            <td className="border border-slate-300 p-3">{ student.name }</td>
            <td className="border border-slate-300 p-3">{ student.age }</td>
            <td className="border border-slate-300 p-3">{ student.gender }</td>
            <td className="border border-slate-300 p-3">{ student.course }</td>
            <td className="border border-slate-300 p-3">
              <div className="flex items-center justify-center w-full space-x-1">
                <EditForm student={student} />
                <DeleteForm student={student} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table