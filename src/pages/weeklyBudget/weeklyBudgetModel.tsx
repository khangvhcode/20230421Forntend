/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useState } from "react";
import { NotificationError, NotificationSuccess, URL_API } from "@app/system/constant";
import * as Yup from 'yup';
/**
 * Form delete 
 * API chức năng này đã được comment tại server
 * @returns 
 */
const WeeklybudgetForm = () => {

  const initialValues = {
    order_element_id: 0,
    name: "",
    budget: 0,
    display: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập code!'),
    budget: Yup.number()
      .required('Vui lòng không để trống price_cost')
      .min(0.01, 'price_cost trị phải lớn hơn 0')
      .max(999999999999999.99, 'price_cost trị phải nhỏ hơn 1000 tỷ')
      .typeError('Vui lòng nhập đúng định dạng số')
      .test('decimal', 'Phải chứa đúng 2 chữ số sau dấu phẩy', (value) => {
        if (value === undefined) return false;
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        return regex.test(value.toString());
      }),
    display: Yup.number()
      .required('Vui lòng không để trống price_cost')
      .min(0.01, 'price_cost trị phải lớn hơn 0')
  });

  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    axios.post(URL_API + '/weekly-budget/add-Weekly-budget', values)
      .then((response) => {
        console.log("API response:", response);
        // Thực hiện các xử lý cần thiết khi API trả về kết quả thành công
        NotificationSuccess('Thêm thành công');
        setFormValues(initialValues);
        resetForm();
      })
      .catch((error) => {
        console.error("API error:", error);
        // Thực hiện các xử lý cần thiết khi API trả về kết quả thất bại
        try {
          NotificationError(error.response.data);
        } catch (error) {
          NotificationError('Lỗi không thực hiện thêm mới!');
        }
      })
      .finally(() => {
        setSubmitting(false); // Kết thúc quá trình submit form
      });
  };


  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create New Weeklybudget </h3>
      </div>
      <div className="card-body">
        <Formik initialValues={formValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="budget">budget</label>
                <Field
                  className="form-control"
                  id="budget"
                  name="budget"
                  maxLength={19}
                  type="number"
                />
                <ErrorMessage name="budget" component="div" className="text-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="display">display</label>
                <Field
                  className="form-control"
                  id="display"
                  name="display"
                  maxLength={6}
                  type="number"
                />
                <ErrorMessage name="display" component="div" className="text-danger" />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WeeklybudgetForm;
