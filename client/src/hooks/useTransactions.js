import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    };

    const addTransaction = async (data) => {
        try {
            await axios.post('http://localhost:5000/api/transactions', data);
            fetchTransactions(); // Refresh
        } catch (error) {
            console.error(error.response.data);
        }
    };

    useEffect(() => {
        // Call fetch asynchronously inside the effect to avoid sync setState during render
        (async () => { await fetchTransactions(); })();
    }, []);

    return { transactions, addTransaction };
};