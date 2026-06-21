import { ShoppingCart, DollarSign, Briefcase, Coffee, Home, Tag, Trash2, Edit2 } from 'lucide-react';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  if (!Array.isArray(transactions)) {
    return <div className="p-6 text-gray-500">Loading transactions...</div>;
  }

  const getIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('grocer')) return <ShoppingCart size={20} />;
    if (cat.includes('bill')) return <Home size={20} />;
    if (cat.includes('work')) return <Briefcase size={20} />;
    if (cat.includes('food') || cat.includes('coffee')) return <Coffee size={20} />;
    if (cat.includes('shop')) return <Tag size={20} />;
    return <DollarSign size={20} />;
  };

  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {transactions.length > 0 ? (
          <>
            {transactions.map((t) => (
              <div
                key={t._id}
                className="grid grid-cols-[auto,1fr,auto,auto] items-center gap-6 p-4 rounded-xl hover:bg-blue-50 border border-transparent"
              >
                <div className='w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700'>
                    {getIcon(t.category)}
                </div>

                <div>
                    <p className='font-semibold text-gray-800'>{t.category}</p>
                    <p className='text-xs text-gray-400'>
                        {new Date(t.date).toLocaleDateString()}
                    </p>
                </div>

                <span className='font-mono font-medium text-gray-600 w-24 text-right'>
                    -${Number(t.amount).toFixed(2)}
                </span>

                <div className='flex gap-2 w-20 justify-end'>
                    <button onClick={() => onEdit(t)} className='text-gray-400 hover:text-yellow-400'>
                        <Edit2 size={20} />
                    </button>
                    <button onClick={() => onDelete(t._id)} className='text-gray-400 hover:text-red-500'>
                        <Trash2 size={20} />
                    </button>
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <span className="font-bold text-gray-700">Total Spent</span>
              <span className="text-xl font-mono font-bold text-blue-600">-${total.toFixed(2)}</span>
            </div>
          </>
        ) : (
            <p className="text-center text-gray-400 py-4">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;