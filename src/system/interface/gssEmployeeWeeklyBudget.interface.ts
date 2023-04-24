export interface GssEmployeeWeebudget {
    id: {
        gssEmployeeId: number;
        orderElementId: number;
    },
    code: string;
    budget: number;
    gss_employee_name?: string;
    order_element_name?: string;
};