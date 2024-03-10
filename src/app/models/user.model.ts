export class UserModel{

  constructor(
      public firstName: string,
      public lastName: string,
      public comunidad: string,
      public email: string,
      public role: string,
      public birthday: Date | null,
      public gender: string,
      public phone: string,
      public token: string,
      public id: string
  ){}
}