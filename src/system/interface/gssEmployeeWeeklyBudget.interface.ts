export interface GssEmployeeWeebudget {
    id: {
        gssEmployeeId: number;
        orderElementId: number;
    },
    code: string;
    budget: number;
    order_element_name?: string;
};