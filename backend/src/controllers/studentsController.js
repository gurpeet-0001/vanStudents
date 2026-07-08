//function logic for all students (for all GET POST PUT requests)
import supabase from '../config/db.js'

export const getStudents = async (req, res) => {
    const data = await supabase.from('Students')
    .select('*')
    .eq('phoneNumber', req.user.parentNumber)
    res.status(200).send(data.data)


}

export const createStudent = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            const { phoneNumber, password } = req.body;
            const { data, error } = await supabase.from('Students')
                .insert({
                    'phoneNumber': phoneNumber,
                    'password': password
                })
            return res.status(200).json({ 'message': 'User Created successfully' })
        }
        res.status(404).json({ 'message': 'Wrong Role, Only admin can create new user' })
    } catch (error) {
        return res.status(404).json({ 'message': 'Error creating User : ' + error })
    }
}

export const getStudentsById = async (req, res) => {
    try {
        const getId = req.params.id
        const data = await supabase.from('Students')
            .select('* , Fees(*)')
            .eq('id', getId)
            .single();

        res.send(data);
    } catch (error) {
        res.json({ 'message': 'error fetching students by id :' + error })
    }

}

export const addStudentFee = async (req, res) => {
    const std_id = req.params.id
    const { from_month, to_month, year, fee } = req.body
    const data = await supabase.from('Fees')
        .insert({
            std_id: std_id,
            from_month: from_month,
            to_month: to_month,
            year: year,
            fee: fee
        })
        .select('*')

    res.send('DATA INSERTED :' + data)
}

export const updateStudentFee = (req, res) => {
    res.send('updated student info/fee by id')
}

