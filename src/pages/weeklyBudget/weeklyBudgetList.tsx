/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import axios from 'axios';
import { NotificationError, NotificationSuccess, URL_API } from '@app/system/constant';
import SlideToggle from './displayToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { WeeklyBudget } from '@app/system/interface/weeklyBudget.interface';

const WeeklybudgetList = () => {
  const [t] = useTranslation();
  const [data, setData] = useState<WeeklyBudget[]>([]);
  const [editingId, setEditingId] = useState<number>(-1);
  const [updateData, setUpdateData] = useState<WeeklyBudget>({ order_element_id: 0, name: '', budget: 0, display: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL_API + '/weekly-budget/getAllData');
      setData(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (item: any) => {
    setUpdateData({ ...item });
    setEditingId(item?.order_element_id);
  }

  const handleOnBudgetChange = (value: number) => {
    setUpdateData({ ...updateData, budget: value });
  }

  const handleOnDisplayChange = (isChecked: boolean) => {
    setUpdateData({ ...updateData, display: isChecked ? 1 : 0 });
  }

  const handleSaveClick = () => {
    // Gọi API để cập nhật dữ liệu với updatedData
    // cap nhat lai danh sach 
    if (updateData.budget.toString() === '') {
      NotificationError(`${t<string>('messagError.required', { param: `${t<string>('weeklyBudget.budget')}` })}`);
      return;
    }
    const account = data.find((element) => element.order_element_id === updateData.order_element_id);
    if (account?.budget === updateData.budget && account?.display === updateData.display) {
      setEditingId(-1);
      return;
    }

    const newData = data.map((item) => {
      if (item.order_element_id === updateData.order_element_id) {
        item.name = updateData.name;
        item.display = updateData.display;
        item.budget = updateData.budget;
      };
      return item;
    })

    axios.post(URL_API + '/weekly-budget/updateWeekly-budget', updateData)
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
      });
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
      <ContentHeader title={t<string>('weeklyBudget.list')} />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">{t<string>('weeklyBudget.list')}</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table id="example2" className="table table-bordered table-hover">
                <thead>
                  <tr className="text-center">
                    <th>{t<string>('weeklyBudget.name')}</th>
                    <th>{t<string>('weeklyBudget.budget')}</th>
                    <th>{t<string>('weeklyBudget.display')}</th>
                    <th style={{ width: '200px' }}>{t<string>('action.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((item) => {
                    return (
                      <tr key={item.order_element_id}>
                        <td>{item.name}</td>
                        <td>{editingId === item.order_element_id ?
                          (
                            <input
                              type="text"
                              maxLength={17}
                              defaultValue={item.budget}
                              onInput={(evt: any) => {
                                const inputVal = evt?.target?.value;
                                const regex = /^\d{1,8}(?:\.\d{0,2})?$/; // Regex decimal 19,2
                                if (regex.test(inputVal)) {
                                  handleOnBudgetChange(parseFloat(inputVal));
                                } else {
                                  // Xử lý thông báo lỗi ở đây
                                  NotificationError(`${t<string>('messagError.typeErrorDecimal2')}`);
                                  evt.target.value = updateData.budget;
                                }
                              }}
                            />
                          ) : (
                            item.budget
                          )}
                        </td>
                        <td className="text-center">{editingId === item.order_element_id ?
                          (
                            <SlideToggle defaultChecked={item.display === 1} onChange={handleOnDisplayChange} />
                          ) : (
                            item.display === 1 ?
                              <FontAwesomeIcon icon={faCheck} className="text-success" />
                              :
                              <FontAwesomeIcon icon={faTimes} className="text-danger" />
                          )}</td>
                        <td style={{ display: 'flex', justifyContent: 'space-around', width: '200px' }}>
                          {editingId === item.order_element_id ?
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

export default WeeklybudgetList;
