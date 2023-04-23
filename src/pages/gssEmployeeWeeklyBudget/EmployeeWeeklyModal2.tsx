import {useAppDispatch, useAppSelector} from '@app/redux/store';
import {setModalOpen, addGssEmployeeWeebudgetAsync} from './EmployeeWeeklySlide';
import {useEffect} from 'react';
import {GssEmployeeWeebudget} from '@app/system/interface/gssEmployeeWeeklyBudget.interface';
import {object} from 'yup';
import {NumberValidation, StringValidation} from '@app/system/constant';
import {Form, Formik} from 'formik';
import {DraggableModal} from '@app/components/DraggableModal';
import {CloseCircleFilled} from '@ant-design/icons';
import SubmitButton from '@app/components/SubmitButton';
import {Input, InputNumber} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import {Button} from 'admin-lte';

export const EmplyoeeWeeklyModal = () => {
  const {isModalOpen, selectedGssEmployeeWeebudget} = useAppSelector(
    (state) => state.gssEmployeeWeebudget
  );
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setModalOpen(false));
  };

//   const initialValues: GssEmployeeWeebudget = selectedGssEmployeeWeebudget ?? {
    const initialValues: GssEmployeeWeebudget =  {
    id: {
      gssEmployeeId: 0,
      orderElementId: 0
    },
    code: '',
    budget: 0
  };

  const validationSchema = object().shape({
    code: StringValidation,
    orderElementId: NumberValidation,
    gssEmployeeId: NumberValidation,
    budget: NumberValidation
  });

//   const title = selectedGssEmployeeWeebudget ? <>Cap nhat</> : <>Them</>;
  const title =' Cap nhat';

  const handleSubmit = (values: any, actions: any) => {};

  useEffect(() => {}, [isModalOpen, selectedGssEmployeeWeebudget]);

  return (
    <>
      {/* {isModalOpen && ( */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          render={(props) => (
            // <Form labelCol={{span: 10}} wrapperCol={{span: 14}}>
            <Form>
              <DraggableModal
                title={title}
                // open={true}
                closeIcon={<CloseCircleFilled />}
                onCancel={handleCloseModal}
                footer={
                  <>
                    <SubmitButton onClick={props.submitForm} htmlType="submit">
                      Luu
                    </SubmitButton>
                    <Button>Huy</Button>
                    {/* <ResetButton>Huy</ResetButton> */}
                  </>
                }
              >
                <FormItem name="tieuDe" label="Tiêu đề">
                  <Input name={'tieuDe'} suffix />
                </FormItem>
                <FormItem name="giaTriTu" label="Giá trị từ">
                  <InputNumber
                    prefix
                    // {...InputCurrencyProps}
                    addonAfter="đ"
                    name={'giaTriTu'}
                  />
                </FormItem>
                <FormItem name="giaTriDen" label="Giá trị đến">
                  <InputNumber prefix addonAfter="đ" name={'giaTriDen'} />
                </FormItem>
                <FormItem name="diemThuong" label="Điểm thưởng">
                  <Input name={'diemThuong'} type={'number'} suffix />
                </FormItem>
              </DraggableModal>
            </Form>
          )}
        />
      {/* )} */}
    </>
  );
};

export default EmplyoeeWeeklyModal;
