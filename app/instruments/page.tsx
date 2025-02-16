import { createClient } from '@/app/utils/supabase/server';

export default async function Instruments() {
  // ✅ Correctly initialize Supabase in a Server Component
  const supabase = await createClient();
  
  // ✅ Fetch instruments
  const { data: instruments, error } = await supabase
    .from('instruments')
    .select('*');

  if (error) {
    console.error('Error fetching instruments:', error);
    return <p className="text-red-500 text-center">Failed to load instruments.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Instruments List</h2>
      {instruments?.length ? (
        <ul className="space-y-3">
          {instruments.map((instrument: { id: number; name: string; category?: string; price?: number }) => (
            <li key={instrument.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-700">{instrument.name}</p>
              {instrument.category && (
                <p className="text-sm text-gray-600">Category: {instrument.category}</p>
              )}
              {instrument.price !== undefined && (
                <p className="text-sm text-gray-600">Price: ${instrument.price}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No instruments available.</p>
      )}
    </div>
  );
}