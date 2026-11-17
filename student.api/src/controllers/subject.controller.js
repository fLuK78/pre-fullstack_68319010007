
const prisma = require("../prisma");

// ดึงข้อมูลทั้งหมด และค้นหาจากชื่อวิชา
exports.getAllSubjects = async (req, res) => {
    try {
        const search = req.query.search || "";

        const subjects = await prisma.subject.findMany({
            where: {
                OR: [
                    { subjectCode: { contains: search } },
                    { subjectName: { contains: search } }
                ]
            },
            orderBy: { id: "asc" },
        });

        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// ดึงข้อมูลรายวิชาตาม ID
exports.getSubjectById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const subject = await prisma.subject.findUnique({
            where: { id }
        });

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// เพิ่มรายวิชา
exports.createSubject = async (req, res) => {
    try {
        const {
            subjectCode,
            subjectName,
            objective,
            description,
            credit,
            teacher
        } = req.body;

        if (!subjectCode || !subjectName || !objective ||
            !description || !credit || !teacher) {
            return res.status(400).json({
                message: "Please Field Information"
            });
        }

        const newSubject = await prisma.subject.create({
            data: {
                subjectCode,
                subjectName,
                objective,
                description,
                credit,
                teacher
            },
        });

        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ message: "Fail" });
    }
};

// แก้ไขรายวิชา
exports.updateSubject = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            subjectCode,
            subjectName,
            objective,
            description,
            credit,
            teacher
        } = req.body;

        if (!subjectCode || !subjectName || !objective ||
            !description || !credit || !teacher) {
            return res.status(400).json({
                message: "Please Field Information"
            });
        }

        const updatedSubject = await prisma.subject.update({
            where: { id: Number(id) },
            data: {
                subjectCode,
                subjectName,
                objective,
                description,
                credit,
                teacher
            },
        });

        res.status(200).json(updatedSubject);
    } catch (error) {
        res.status(404).json({ message: "Fail" });
    }
};

// ลบรายวิชา
exports.deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.subject.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({
            message: `ลบรายวิชารหัส ${id} สำเร็จ`
        });
    } catch (error) {
        res.status(404).json({ message: "Fail" });
    }
};
