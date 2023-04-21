/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import axios from 'axios';

type Data = {
    order_element_id: number;
    name: string;
    budget: number | null;
    display: number | null;
};

const Blank = () => {
    const [data, setData] = useState<Data[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/weekly-budget/getAllData'
            );
            setData(response.data);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = (id : number) => {
        console.log(id);
    }

    return (
        <div>
            <ContentHeader title="Blank Page" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Title</h3>
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
                                    <tr>
                                        <th>order_element_id</th>
                                        <th>name</th>
                                        <th>budget</th>
                                        <th>display</th>
                                        <th>function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return (
                                            <tr key={item.order_element_id}>
                                                <td>{item.order_element_id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.budget}</td>
                                                <td>{item.display}</td>
                                                <td style={{display: 'flex', justifyContent: 'space-around'}}>
                                                    <button className='btn btn-primary' onClick={() => { handleUpdate(item.order_element_id) }}>
                                                        Edit
                                                    </button>
                                                    <button className='btn btn-danger' onClick={() => { }}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">Footer</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blank;
