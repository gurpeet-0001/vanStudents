//function logic for all students (for all GET POST PUT requests)
import supabase from '../config/db.js'

export const getStudents = async (req, res) => {

    try {
        if (req.user.role == 'admin') {
            const data = await supabase.from('Students')
                .select('*')
            res.status(200).send(data.data)
        }
        else {
            const data = await supabase.from('Students')
                .select('*')
                .eq('phoneNumber', req.user.parentNumber)
            res.status(200).send(data.data)
        }
    }
    catch(error){
        res.status(404).json({ 'message': 'Error fetching Students : ' + error });
    }
}

export const createStudent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Wrong Role, Only admin can create new user",
            });
        }

        const { phoneNumber, std_name } = req.body;

        const { data, error } = await supabase
            .from("Students")
            .insert([
                {
                    phoneNumber,
                    std_name,
                },
            ])
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);

            return res.status(500).json({
                message: error.message,
                error,
            });
        }

        return res.status(201).json({
            message: "Student created successfully",
            data,
        });
    } catch (error) {
        console.error("Server Error:", error);

        return res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
};

    export const getStudentsFee = async (req, res) => {
        try {
            const getId = req.params.id
            const phoneNumber = req.user.parentNumber

            const { data, error } = await supabase.from('Students')
                .select('* , Fees(*)')
                .eq('id', getId)
                .eq('phoneNumber', phoneNumber)
                .single();

            if (error || data.lenght == 0) {
                return res.json({ 'message': 'No data Found' })
            }
            res.status(200).send(data)

        } catch (error) {
            res.json({ 'message': 'error fetching students by id :' + error })
        }

    }

    export const addStudentFee = async (req, res) => {
        const std_id = req.params.id;
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Only admin can add student fees' });
            }

            const { from_month, to_month, year, fee } = req.body;
            const { data, error } = await supabase.from('Fees')
                .insert({
                    std_id: std_id,
                    from_month: from_month,
                    to_month: to_month,
                    year: year,
                    fee: fee
                })
                .select('*');

            if (error || !data) {
                return res.status(400).json({ message: 'Error adding student fee', details: error?.message });
            }

            return res.status(201).json(data[0] || data);
        } catch (error) {
            return res.status(500).json({ message: 'Code error at: Adding student fee at id: ' + std_id, error: error.message });
        }
    }

    export const updateStudentFee = async (req, res) => {
        const std_id = req.params.id;
        const { feeId, fee, year, from_month, to_month } = req.body;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can update student fees' });
        }

        if (!feeId) {
            return res.status(400).json({ message: 'feeId is required to update fee' });
        }

        try {
            const updateData = {};
            if (fee !== undefined) updateData.fee = fee;
            if (year !== undefined) updateData.year = year;
            if (from_month !== undefined) updateData.from_month = from_month;
            if (to_month !== undefined) updateData.to_month = to_month;

            const { data, error } = await supabase.from('Fees')
                .update(updateData)
                .eq('id', feeId)
                .eq('std_id', std_id)
                .select('*')
                .single();

            if (error || !data) {
                return res.status(400).json({ message: 'Failed to update fee', details: error?.message });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating student fee', error: error.message });
        }
    }

