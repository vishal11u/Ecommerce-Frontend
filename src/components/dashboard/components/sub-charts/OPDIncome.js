import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CommonLoader from '../../../common/CommonLoader';

const daysOfWeek = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

function OPDIncome() {
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('Day');
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (button) => {
        setActiveButton(button);
        fetchOrderData(button);
    };

    const fetchOrderData = async (filter) => {
        setLoading(true); 
        try {
            const response = await axios.get('https://ecommerce-backend-three-eta.vercel.app/api/dashboard');
            const fetchedData = response.data;

            const orderData = fetchedData.orderTypes.offline.map(item => ({
                name: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
                Orders: item.count
            }));

            const weekData = daysOfWeek.map(day => {
                const dayData = orderData.find(data => data.name === day);
                return {
                    name: day,
                    Orders: dayData ? dayData.Orders : 0
                };
            });

            setData(weekData);
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchOrderData(activeButton);
    }, [activeButton]);

    return (
        <div className='w-[39.5%] h-[39vh] border shadow py-1 mt-2 px-2 ml-2 bg-white rounded-md overflow-hidden'>
            <div className='flex items-center justify-between space-x-1 border-b pb-1.5 pt-0.5'>
                <h1 className='font-semibold text-[14px]'>Offline Orders</h1>
                <div className='flex items-center text-[13px] font-medium'>
                    <button
                        type='button'
                        className={`border px-2 py-0.5 rounded-l ${activeButton === 'Day' ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
                        onClick={() => handleButtonClick('Day')}
                    >
                        Day
                    </button>
                    <button
                        type='button'
                        className={`border px-2 py-0.5 ${activeButton === 'Week' ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
                        onClick={() => handleButtonClick('Week')}
                    >
                        Week
                    </button>
                    <button
                        type='button'
                        className={`border px-2 py-0.5 rounded-r ${activeButton === 'Month' ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
                        onClick={() => handleButtonClick('Month')}
                    >
                        Month
                    </button>
                </div>
            </div>
            {/* --------------------------------------- */}
            {loading ? (
                <div className='w-full h-full flex items-center justify-center'>
                    <CommonLoader />
                </div>
            ) : data.length > 0 ? (
                <div className='w-full h-[calc(100%-2rem)]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            width={500}
                            height={300}
                            margin={{
                                top: 10,
                                right: 5,
                                left: -21,
                                bottom: 0,
                            }}
                        >
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="Orders" stroke="blue" strokeWidth={1.5} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className='w-full h-full flex items-center justify-center'>
                    <p className='font-medium text-[18px]'>No data available</p>
                </div>
            )}
        </div>
    );
}

export default OPDIncome;
