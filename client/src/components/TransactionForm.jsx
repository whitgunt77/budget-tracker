import { useState } from 'react';

const TransactionForm = ({ onAddTransaction, editingId, onUpdate, currentTransaction, setEditingId }) => {
  const [formData, setFormData] = useState(() => ({
    category: currentTransaction?.category || '',
    amount: currentTransaction?.amount || '',
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await onUpdate(editingId, formData);
    } else {
      await onAddTransaction(formData);
    }

    setFormData({ category: '', amount: '' }); // Reset form
  };

  return (
    <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
        <div className='flex justify-between items-center mb-6'>
            <h3 className='text-lg font-bold text-gray-900'>
                {editingId ? 'Edit Transaction' : 'Add Transaction'}
            </h3>
            {/* Cancel Button */}
            {editingId && (
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ category: '', amount: '' });
                    }}
                    className='text-sm text-gray-500 hover:text-red-500 underline'
                >
                    Cancel
                </button>
            )}
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Category Field */}
            <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Category</label>
                <input
                    type='text'
                    name='category'
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder='e.g., Groceries'
                    className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                />
            </div>

            <br />

            {/* Amount Field */}
            <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Amount ($)</label>
                <input
                    type='number'
                    name='amount'
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder='0.00'
                    className='w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                />
            </div>

            <br />

            {/* Action Button */}
            <button
                type='submit'
                className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md active:transform active:scale-[0.98]'
            >
                {editingId ? 'Update Transaction' : 'Save Transaction'}
            </button>
        </form>
    </div>
  );
};

export default TransactionForm;