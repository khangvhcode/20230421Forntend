export interface ListGssEmployeeWeebudget {}

export interface UpdateGssEmployeeWeebudget {
  id: {
    gssEmployeeId: number;
    orderElementId: number;
  };
  code: string;
  budget: number;
}
export interface DeleteGssEmployeeWeebudget {
  id: {
    gssEmployeeId: number;
    orderElementId: number;
  };
}