
const prisma = require("../prisma");

// GET: ดึงข้อมูลนักศึกษาทั้งหมด
exports.getAllStudents = async (req, res) => {
    try {
        const search = req.query.search || "";

        const students = await prisma.student.findMany({
            where: {
                name: {
                    contains: search
                }
            },
            orderBy: {
                id: "asc"
            }
        });

        res.json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
};

// GET: ดึงข้อมูลนักศึกษาตาม ID
exports.getStudentById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const student = await prisma.student.findUnique({
            where: { id }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// POST: เพิ่มนักศึกษา
exports.createStudent = async (req, res) => {
    try {
        const { name, age, major } = req.body;

        if (!name || !age || !major) {
            return res.status(400).json({
                message: "Please Fill Information"
            });
        }

        const newStudent = await prisma.student.create({
            data: {
                name,
                age: Number(age),
                major
            }
        });

        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Create Student Error:", error);

        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    }
};

// PUT: แก้ไขข้อมูลนักศึกษา
exports.updateStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, age, major } = req.body;

        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                name,
                age: Number(age),
                major
            }
        });

        res.status(200).json(updatedStudent);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        console.error(error);
        res.status(500).json({ message: "Fail" });
    }
};

// DELETE: ลบนักศึกษา
exports.deleteStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.student.delete({
            where: { id }
        });

        res.json({
            message: `ลบนักศึกษารหัส ${id} สำเร็จ`
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "ไม่พบนักศึกษา"
            });
        }

        console.error(error);
        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    }
};
