// This module (Resolvers) is for the Data Request from your Database

export const resolvers = {
  Query: {
    students: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.student.findMany({
      orderBy: [{
        id: 'desc'
      }]
    }),
    getStudent: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.student.findUnique({
      where: {
        id: _args.id
      }
    })
  },
  Mutation: {
    addStudent: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.student.create({
      data: {
        name: _args.name,
        age: _args.age,
        gender: _args.gender,
        course: _args.course
      }
    }),
    updateStudent: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.student.update({
      where: {
        id: _args.id
      },
      data: {
        name: _args.name,
        age: _args.age,
        gender: _args.gender,
        course: _args.course
      }
    }),
    deleteStudent: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.student.delete({
      where: {
        id: _args.id
      }
    })
  }
}