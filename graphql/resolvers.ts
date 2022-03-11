// This module (Resolvers) is for the Data Request from your Database

export const resolvers = {
  Query: {
    students: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.student.findMany()
  },
  Mutation: {
    addStudent: async (_parent: any, { name, age, gender, course }: any, ctx: any) => await ctx.prisma.student.create({
      data: {
        name,
        age,
        gender,
        course
      }
    }),
    updateStudent: async (_parent: any, { id, name, age, gender, course }: any, ctx: any) => await ctx.prisma.student.update({
      where: {
        id: id
      },
      data: {
        name,
        age,
        gender,
        course
      }
    }),
    deleteStudent: async (_parent: any, { id }: any, ctx: any) => await ctx.prisma.student.delete({
      where: {
        id: id
      }
    })
  }
}