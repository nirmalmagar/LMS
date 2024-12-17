export interface UserInterface {
  id : number;
  name : string;
}
export interface GenresInterface {
  id : number;
  name : string,
}
export interface GradeInterface{
  id: number;
  name : string;
}

export interface DepartmentInterface{
  id : number;
  name : string;
  head_of_department : string;
  description : string;
  phone_number : number;
  location : string;
  borrowing_period_days : number
}
