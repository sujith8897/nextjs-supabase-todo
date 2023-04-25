import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const body = req.body
    console.log('Handling request with method:', method);
    console.log('Request body:', req.body);

    try {
        switch (method) {
            case 'GET':
                // Read operation
                const { data: readData, error: readError } = await supabase.from('tasks').select('*').order('completed');
                if (readError) throw readError;
                res.status(200).json(readData);
                break;

            case 'POST':
                // Create operation
                const newTask = body;
                const { data: createData, error: createError } = await supabase.from('tasks').insert([newTask]);
                if (createError) throw createError;
                res.status(201).json(createData?.[0]);
                break;

            case 'PUT':
                // Update operation
                const { id: updateId, ...updates } = body;
                const { data: updateData, error: updateError } = await supabase
                    .from('tasks')
                    .update(updates)
                    .eq('id', updateId);
                if (updateError) throw updateError;
                res.status(200).json(updateData?.[0]);
                break;

            case 'DELETE':
                // Delete operation
                const deleteId = req.query.id;
                const { data: deleteData, error: deleteError } = await supabase
                    .from('tasks')
                    .delete()
                    .eq('id', deleteId);
                if (deleteError) throw deleteError;
                res.status(200).json(deleteData?.[0]);
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error: any) {
        res.status(500).json({ error: error?.message || 'Internal Server Error' });
    }
}
