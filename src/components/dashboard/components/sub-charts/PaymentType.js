import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CommonLoader from '../../../common/CommonLoader';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

function PaymentType() {
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('Day');
    const [totalValue, setTotalValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const fetchPaymentData = async (filter) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/dashboard');
            const paymentEntries = response.data.payments;

            if (!Array.isArray(paymentEntries)) {
                console.error('Unexpected data structure:', paymentEntries);
                return;
            }

            const aggregatedData = paymentEntries.reduce((acc, entry) => {
                const mode = entry.mode || 'Unknown';
                const amount = entry.amount || 0;
                if (!acc[mode]) {
                    acc[mode] = 0;
                }
                acc[mode] += amount;
                return acc;
            }, {});

            const paymentData = Object.keys(aggregatedData).map(name => ({
                name,
                value: aggregatedData[name]
            }));

            const total = paymentData.reduce((acc, entry) => acc + entry.value, 0);
            setTotalValue(total);
            setData(paymentData);
            console.log("Aggregated Payment Data:", paymentData);
        } catch (error) {
            console.error('Error fetching payment data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentData(activeButton.toLowerCase());
    }, [activeButton]);

    // Custom label for the pie chart
    const renderCustomLabel = ({ value }) => `₹${value}`;

    return (
        <div className='w-[39.5%] h-[39vh] border shadow py-1 mt-2 px-2 ml-3 bg-white rounded-md overflow-hidden'>
            <div className='flex items-center justify-between space-x-1 border-b pb-1.5 pt-0.5'>
                <h1 className='font-semibold text-[14px]'>Payment Type of Orders</h1>
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
            {/* ------------- Chart section -------------- */}
            <div className='w-full h-[calc(100%-2rem)] flex justify-between'>
                {loading ? (
                    <div className='w-full h-full flex items-center justify-center'>
                        <CommonLoader />
                    </div>
                ) : data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={data}
                                cx="45%"
                                cy="52%"
                                outerRadius={75}
                                fill="#8884d8"
                                label={renderCustomLabel}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='w-full h-full flex items-center justify-center font-medium text-[18px]'>No data available</p>
                )}
                {/* --------- content ------------- */}
                {data.length > 0 && (
                    <div className='w-[35%]'>
                        <h1 className='font-semibold mt-4 text-[17px]'>Total :</h1>
                        <h1 className='font-semibold mt-0 text-[17px]'> ₹{loading ? 0 : totalValue.toLocaleString()}</h1>
                        <div className='mt-5 space-y-2'>
                            {data.length > 0 ? (
                                data.map((entry, index) => (
                                    <div key={index} className='flex items-center text-[13px] font-medium space-x-1'>
                                        <span className='h-3 w-3 inline-block rounded-full mr-1' style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                        <h1 className='text-[14px] font-semibold'>{entry.name}</h1>
                                    </div>
                                ))
                            ) : (
                                <p>No payment modes available</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentType;