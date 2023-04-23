/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { NotificationError, NotificationSuccess, URL_API } from '@app/system/constant';
import { useTranslation } from 'react-i18next';
import { GssEmployeeWeebudget } from '@app/system/interface/gssEmployeeWeeklyBudget.interface';
import { useAppDispatch, useAppSelector } from "@app/redux/store";
import { setModalOpen } from './EmployeeWeeklySlide';
import {
    PlusOutlined
  } from "@ant-design/icons";

const EmployeeWeeklyBudgetList = () => {
    const [t] = useTranslation();
    const [data, setData] = useState<GssEmployeeWeebudget[]>([]);
    const [updateData, setUpdateData] = useState<GssEmployeeWeebudget>({ id: {gssEmployeeId: 0,  orderElementId: 0}, code: '', budget: 0});
    const [editingId, setEditingId] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);

    const fetchData = async () => {
        try {
            const response = await axios.get(URL_API + '/gss_weekly/getAllData');
            const resullt = response?.data;
            setData(resullt);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = (item: any) => {
        setUpdateData({ ...item });
        setEditingId(item?.id);
    }

    const showDeleteConfirm = (id: number, idOrder: number) => {
        Modal.confirm({
            title: `${t<string>('messagConfirm.deleteItem')}`,
            okText: `${t<string>('action.delete')}`,
            okType: 'danger',
            cancelText: `${t<string>('action.cancel')}`,
            onOk() {
                handleDelete(id);
            },
        });
    };

    const handleDelete = async (id: number) => {
        // try {
        //     const url = URL_API + `/gss-employee/deleteGss-employee/` + id;
        //     await axios.delete(url);
        //     fetchData();
        //     // Xử lý phản hồi ở đây
        //     NotificationSuccess(`${t<string>('messagSuccess.success', { param: `${t<string>('action.delete')}` })}`);
        // } catch (error) {
        //// Xử lý lỗi ở đây
        //     NotificationError(`${t<string>('messagError.error')}`);
        // }
    }

    const dispatch = useAppDispatch();

    const handleClickAddBtn = () => {
      dispatch(setModalOpen(true));
    };

    const handleOnCodeChange = (value: string) => {
        setUpdateData({ ...updateData, code: value })
    }

    const handleOnPriceCostChange = (value: number) => {
        setUpdateData({ ...updateData, budget: value })
    }

    const handleSaveClick = () => {
        // Gọi API để cập nhật dữ liệu với updatedData
        // cap nhat lai danh sach 
        const regex = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*$/;

        if (updateData.code === '' || !regex.test(updateData.code)) {
            NotificationError(`${t<string>('messagError.required_special_characters', { param: `${t<string>('GssEmployee.code')}` })}`);
            return;
        }

        // if (updateData.price_cost.toString() === '') {
        //     NotificationError(`${t<string>('messagError.required', { param: `${t<string>('GssEmployee.price_cost')}` })}`);
        //     return;
        // }

        // const account = data.find((element) => element.id === updateData.id);
        // if (account?.code === updateData.code && account?.price_cost === updateData.price_cost) {
        //     setEditingId(-1);
        //     return;
        // }

        const newData = data.map((item) => {
            if (item.id === updateData.id) {
                item.code = updateData.code;
                // item.price_cost = updateData.price_cost;
            };
            return item;
        })

        axios.post(URL_API + '/gss-employee/updateGss-employee', updateData)
            .then((response) => {
                console.log("API response:", response);
                // Thực hiện các xử lý cần thiết khi API trả về kết quả thành công
                NotificationSuccess(`${t<string>('messagSuccess.success', { param: `${t<string>('action.update')}` })}`);
                setData(newData);
                setEditingId(-1);
            })
            .catch((error) => {
                console.error("API error:", error);
                // Thực hiện các xử lý cần thiết khi API trả về kết quả thất bại
                try {
                    NotificationError(error.response.data);
                } catch (error) {
                    NotificationError(`${t<string>('messagError.error')}`);
                }
            })
    };

    const handlePageChange = (pageNumber: any) => {
        setEditingId(-1);
        setCurrentPage(pageNumber);
    };

    // Hàm xử lý khi người dùng nhấn vào "First"
    const handleFirstPage = () => {
        handlePageChange(1);
    };

    // Hàm xử lý khi người dùng nhấn vào "Last"
    const handleLastPage = () => {
        handlePageChange(pageNumbers.length - 2);
    };
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(data.length / usersPerPage);
    const pageNumbers: any = Array.from({ length: totalPages }, (_, i) => i + 1);
    // Thêm phần tử "First" vào đầu mảng
    pageNumbers.unshift('First');
    // Thêm phần tử "Last" vào cuối mảng
    pageNumbers.push('Last');
    return (
        <div>
            <ContentHeader title={t<string>('GssEmployee.list')} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">{t<string>('GssEmployee.list')}</h3>
                        </div>
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                                <thead>
                                    <tr className="text-center">
                                        <th>{t<string>('GssEmployee.code')}</th>
                                        <th>{t<string>('GssEmployee.price_cost')}</th>
                                        <th style={{ width: '300px' }}>{t<string>('action.action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((item , index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{editingId === index ?
                                                    (
                                                        <input type="text" maxLength={100} defaultValue={item.code} onInput={(evt: any) => { handleOnCodeChange(evt?.target?.value) }} />
                                                    ) : (
                                                        item.code
                                                    )}
                                                </td>
                                                <td>{editingId === index ?
                                                    (
                                                        <input
                                                            type="text"
                                                            maxLength={17}
                                                            defaultValue={item.budget}
                                                            onInput={(evt: any) => {
                                                                const inputVal = evt?.target?.value;
                                                                const regex = /^\d{1,8}(?:\.\d{0,2})?$/; // Regex decimal
                                                                if (regex.test(inputVal)) {
                                                                    handleOnPriceCostChange(inputVal);
                                                                } else {
                                                                    // Xử lý thông báo lỗi ở đây
                                                                    NotificationError(`${t<string>('messagError.typeErrorDecimal2')}`);
                                                                    evt.target.value = updateData.budget;
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        item.budget
                                                    )}</td>
                                                <td style={{ display: 'flex', justifyContent: 'space-around', width: '300px' }}>
                                                    {editingId === index ?
                                                        (
                                                            <>
                                                                <button className='btn btn-primary' onClick={() => { handleSaveClick() }}>
                                                                    {t<string>('action.save')}
                                                                </button>
                                                                <button className='btn btn-danger' onClick={() => { setEditingId(-1) }}>
                                                                    {t<string>('action.cancel')}
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button className='btn btn-primary' onClick={() => { handleUpdate(item) }}>
                                                                    {t<string>('action.edit')}
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => showDeleteConfirm(item.id.gssEmployeeId , item.id.orderElementId)}
                                                                >
                                                                    {t<string>('action.delete')}
                                                                </button>
                                                            </>
                                                        )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="dataTables_info">
                                    <Button
                                        icon={<PlusOutlined />}
                                        type="primary"
                                        size="small"
                                        onClick={handleClickAddBtn}
                                    >Thêm</Button>
                                        {/* Hiển thị từ {startIndex + 1} đến {endIndex} của {data.length} mục */}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate paging_simple_numbers">
                                        <ul className="pagination">
                                            {pageNumbers.map((number: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className={
                                                        currentPage === index ? "page-item active" : "page-item"
                                                    }
                                                >
                                                    {typeof number === "number" ? (
                                                        <button className="page-link" onClick={() => handlePageChange(number)}>
                                                            {number}
                                                        </button>
                                                    ) : number === "First" ? (
                                                        <button className="page-link" onClick={() => handleFirstPage()}>
                                                            {`${t<string>('action.first')}`}
                                                        </button>
                                                    ) : (
                                                        <button className="page-link" onClick={() => handleLastPage()}>
                                                            {`${t<string>('action.last')}`}
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmployeeWeeklyBudgetList;
