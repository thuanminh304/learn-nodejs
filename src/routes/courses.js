const express=require('express')
const router=express.Router()

const courseController= require('../app/controllers/CourseController')

router.get('/create',courseController.create)
router.post('/store',courseController.store)
router.get('/edit/:id',courseController.edit)
//put sửa nhiều trường
router.put('/updated/:id',courseController.updated)
//patch sửa 1 phần ,restore dựa vào id
router.patch('/restored/:id',courseController.restoreCourse)
router.post('/handle-delete-form-course',courseController.handleDeleteFormCourse)
router.post('/handle-form-trash-course',courseController.handleFormTrashCourse)
// xóa mềm đưua vào thùng rác
router.delete('/:id',courseController.sofeDelete)
//xóa vĩnh viễn
router.delete('/force/:id',courseController.forceDelete)
router.get('/:slugger',courseController.showDetail)



module.exports=router
