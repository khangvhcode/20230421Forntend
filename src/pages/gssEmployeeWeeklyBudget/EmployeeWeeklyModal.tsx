/* eslint-disable jsx-a11y/anchor-is-valid */
import {Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  NotificationError,
  NotificationSuccess,
  URL_API
} from '@app/system/constant';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {GssEmployeeWeebudget} from '@app/system/interface/gssEmployeeWeeklyBudget.interface';
import {OrderElement} from '@app/system/interface/orderElement.interface';
import {Select} from 'antd';
// import { GetSelection } from '@app/components/CommonSelection';
import {useAppSelector, useAppDispatch} from '@app/redux/store';
import Item from 'antd/es/list/Item';
import {GssEmployee} from '@app/system/interface/gssEmployee.interface';

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

  // const {orderElements} = useAppSelector((state) => state.orderElement);
  const validationSchema = Yup.object().shape({
    code: Yup.string().required(
      `${t<string>('messagError.required', {
        param: `${t<string>('GssEmployee.code')}`
      })}`
    )
  });

  const handleSubmit = (values: any, {setSubmitting, resetForm}: any) => {
    const regex = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*$/;
    if (!regex.test(values.code)) {
      NotificationError(`${t<string>('messagError.special_characters')}`);
      setSubmitting(false);
      return;
    }

    axios
      .post(URL_API + '/gss-employee/add-Gss-employee', values)
      .then((response) => {
        console.log('API response:', response);
        NotificationSuccess(
          `${t<string>('messagSuccess.success', {
            param: `${t<string>('action.save')}`
          })}`
        );
        setFormValues(initialValues);
        resetForm();
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
    } catch (error) {}
  };

  const fetchDataEmployee = async () => {
    try {
      const response = await axios.get(URL_API + '/gss-employee/getAllData');
      const resullt = response?.data;
      setEmplyeeData(resullt);
    } catch (error) {}
  };

  const Option = Select.Option;

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  function handleBlur() {
    console.log('blur');
  }

  function handleFocus() {
    console.log('focus');
  }

  const options = orderData.map((d) => <Option key={d.id}>{d.name}</Option>);
  const optionsEmployee = emloyeeData.map((d) => (
    <Option key={d.id}>{d.code}</Option>
  ));
  function handleChangeEmployee(value: any) {
    console.log(`selected ${value}`);
  }

  function handleBlurEmployee() {
    console.log('blur');
  }

  function handleFocusEmployee() {
    console.log('focus');
  }

  useEffect(() => {
    fetchDataOrder();
    fetchDataEmployee();
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{t<string>('GssEmployee.form')}</h3>
      </div>
      <div className="card-body">
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting}) => (
            <Form>
              <div className="form-group">
                <label htmlFor="price_cost">
                  {t<string>('GssEmployee.price_cost')}
                </label>
                <Select
                  showSearch
                  style={{width: 200}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, options: any) =>
                    options.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {options}
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="price_cost">
                  {t<string>('GssEmployee.price_cost')}
                </label>
                <Select
                  showSearch
                  style={{width: 200}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={handleChangeEmployee}
                  onFocus={handleFocusEmployee}
                  onBlur={handleBlurEmployee}
                  filterOption={(input, optionsEmployee: any) =>
                    optionsEmployee.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {optionsEmployee}
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="code">{t<string>('GssEmployee.code')}</label>
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
              <div className="form-group">
                <label htmlFor="price_cost">
                  {t<string>('GssEmployee.price_cost')}
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
