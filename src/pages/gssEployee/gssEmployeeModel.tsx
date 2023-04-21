/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useState } from "react";
import { NotificationError, NotificationSuccess, URL_API } from "@app/system/constant";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import { GssEmployee } from "@app/system/interface/gssEmployee.interface";

const GssEmployeeModel = () => {
  const [t] = useTranslation();


  const initialValues : GssEmployee = {
    id: 0,
    code: "",
    price_cost: 0,
  };
  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    code: Yup.string().required(`${t<string>('messagError.required', { param: `${t<string>('GssEmployee.code')}` })}`),
    price_cost: Yup.number()
      .typeError(`${t<string>('messagError.isNaNNumber')}`)
      .min(0.01, `${t<string>('messagError.minNumber', { param: `${t<string>('GssEmployee.price_cost')}` })}`)
      .test('decimal', `${t<string>('messagError.typeErrorDecimalFrom')}`, (value) => {
        if (Number.isNaN(value)) {
          return false;
        }
        if (value === undefined || value === null) return false;
        const regex = /^\d{1,8}(?:\.\d{1,2})?$/;
        return regex.test(value.toString());
      }),
  });

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    const regex = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*$/;
    if (!regex.test(values.code)) {
      NotificationError(`${t<string>('messagError.special_characters')}`);
      setSubmitting(false);
      return;
    }

    axios.post(URL_API + '/gss-employee/add-Gss-employee', values)
      .then((response) => {
        console.log("API response:", response);
        NotificationSuccess(`${t<string>('messagSuccess.success', { param: `${t<string>('action.save')}` })}`);
        setFormValues(initialValues);
        resetForm();
      })
      .catch((error) => {
        console.error("API error:", error);
        try {
          NotificationError(error.response.data);
        } catch (error) {
          NotificationError(`${t<string>('messagError.error')}`);
        }
        // Thực hiện các xử lý cần thiết khi API trả về kết quả thất bại
      })
      .finally(() => {
        setSubmitting(false); // Kết thúc quá trình submit form
      });
  };


  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{t<string>('GssEmployee.form')}</h3>
      </div>
      <div className="card-body">
        <Formik initialValues={formValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="code">{t<string>('GssEmployee.code')}</label>
                <Field
                  className="form-control"
                  id="code"
                  name="code"
                  maxLength={100}
                />
                <ErrorMessage name="code" component="div" className="text-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="price_cost">{t<string>('GssEmployee.price_cost')}</label>
                <Field
                  className="form-control"
                  id="price_cost"
                  name="price_cost"
                // maxLength="20"
                />
                <ErrorMessage name="price_cost" component="div" className="text-danger" />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? `${t<string>('action.saves')}` : `${t<string>('action.save')}`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GssEmployeeModel;
