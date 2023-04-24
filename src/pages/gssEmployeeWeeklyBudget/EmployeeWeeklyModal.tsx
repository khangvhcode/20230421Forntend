/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  NotificationError,
  NotificationSuccess,
  URL_API
} from '@app/system/constant';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { GssEmployeeWeebudget } from '@app/system/interface/gssEmployeeWeeklyBudget.interface';
import { OrderElement } from '@app/system/interface/orderElement.interface';
import { Select } from 'antd';
import { GssEmployee } from '@app/system/interface/gssEmployee.interface';

const GssEmployeeWeeklyModal = () => {
  const [t] = useTranslation();
  const initialValues: GssEmployeeWeebudget = {
    id: {
      gssEmployeeId: 0,
      orderElementId: 0
    },
    code: '',
    budget: 0
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [orderData, setOrderData] = useState<OrderElement[]>([]);
  const [emloyeeData, setEmplyeeData] = useState<GssEmployee[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionOrder, setSelectedOptionOrder] = useState(null);

  const validationSchema = Yup.object().shape({
    code: Yup.string().required(
      `${t<string>('messagError.required', {
        param: `${t<string>('GssEmployee.code')}`
      })}`
    ),
    budget: Yup.number()
      .typeError(`${t<string>('messagError.isNaNNumber')}`)
      .min(0.01, `${t<string>('messagError.minNumber', { param: `${t<string>('GssEmployeeWeekly.budget')}` })}`)
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
    // const coppyData = [...values, values?.id?.gssEmployeeId selectedOption]

    // Tạo bản sao của values
    const copiedValues = { ...values };

    // Thêm giá trị của selectedOption vào bản sao values
    copiedValues.id = {
      ...copiedValues.id,
      gssEmployeeId: selectedOption,
      orderElementId: selectedOptionOrder
    };

    console.log(copiedValues)
    const regex = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*$/;
    if (!regex.test(copiedValues.code)) {
      NotificationError(`${t<string>('messagError.special_characters')}`);
      setSubmitting(false);
      return;
    }
    if (null === copiedValues.id.gssEmployeeId || 0 === copiedValues.id.gssEmployeeId || null === copiedValues.id.orderElementId || 0 === copiedValues.id.orderElementId) {
      const params = 0 === copiedValues.id.gssEmployeeId || null === copiedValues.id.gssEmployeeId ? `${t<string>('GssEmployeeWeekly.gssEmployeeId')}` : `${t<string>('GssEmployeeWeekly.orderElementId')}`;
      NotificationError(`${t<string>('messagError.required', { param: params })}`);
      setSubmitting(false);
      return;
    }
    axios
      .post(URL_API + '/gss_weekly/addData', copiedValues)
      .then((response) => {
        console.log('API response:', response);
        NotificationSuccess(
          `${t<string>('messagSuccess.success', {
            param: `${t<string>('action.save')}`
          })}`
        );
        setFormValues(initialValues);
        resetForm();
        setSelectedOption(null);
        setSelectedOptionOrder(null);
      })
      .catch((error) => {
        console.error('API error:', error);
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

  const fetchDataOrder = async () => {
    try {
      const response = await axios.get(URL_API + '/order-element/getAllData');
      const resullt = response?.data;
      setOrderData(resullt);
    } catch (error) { }
  };

  const fetchDataEmployee = async () => {
    try {
      const response = await axios.get(URL_API + '/gss-employee/getAllData');
      const resullt = response?.data;
      setEmplyeeData(resullt);
    } catch (error) { }
  };

  const Option = Select.Option;

  const options = orderData.map((d) => <Option key={d.id}>{d.name}</Option>);
  const optionsEmployee = emloyeeData.map((d) => (
    <Option key={d.id}>{d.code}</Option>
  ));

  useEffect(() => {
    emloyeeData.length === 0 && fetchDataOrder();
    orderData.length === 0 && fetchDataEmployee();
  }, []);

  return (
    <div className="card card-warning">
      <div className="card-header">
        <h3 className="card-title">{t<string>('GssEmployee.form')}</h3>
      </div>
      <div className="card-body">
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>

              <div className="row">
                <div className="col-sm-6">

                  <div className="form-group">
                    <label htmlFor="price_cost">
                      {t<string>('GssEmployeeWeekly.gssEmployeeId')}
                    </label>
                    <br></br>
                    <Select
                      showSearch
                      value={selectedOption}
                      style={{ width:'100%' }}
                      placeholder="Chọn nhân viên "
                      optionFilterProp="children"
                      onChange={setSelectedOption}
                      filterOption={(input, optionsEmployee: any) =>
                        optionsEmployee.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionsEmployee}
                    </Select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="price_cost">
                      {t<string>('GssEmployeeWeekly.orderElementId')}
                    </label>
                    <br></br>
                    <Select
                      showSearch
                      style={{ width:'100%' }}
                      value={selectedOptionOrder}
                      placeholder="Chọn dự án"
                      optionFilterProp="children"
                      onChange={setSelectedOptionOrder}
                      filterOption={(input, options: any) =>
                        options.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {options}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="code">{t<string>('GssEmployeeWeekly.code')}</label>
                    <Field
                      className="form-control"
                      id="code"
                      name="code"
                      maxLength={100}
                    />
                    <ErrorMessage
                      name="code"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="price_cost">
                      {t<string>('GssEmployeeWeekly.budget')}
                    </label>
                    <Field
                      className="form-control"
                      id="budget"
                      name="budget"
                    // maxLength="20"
                    />
                    <ErrorMessage
                      name="budget"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                </div>
              </div>


              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? `${t<string>('action.saves')}`
                  : `${t<string>('action.save')}`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GssEmployeeWeeklyModal;
