const express=require('express')
const router=express.Router()

const siteController= require('../app/controllers/SiteController')

router.get('/search',siteController.search)
router.get('/contact',siteController.contact)
router.get('/about',siteController.about)

router.get('/',siteController.home)
router.get('/home',siteController.home)


module.exports=router
