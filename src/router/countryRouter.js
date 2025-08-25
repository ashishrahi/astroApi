import express from 'express'
const router = express.Router()
import { countryController} from '../controllers/index.js'
import { validate } from '../middleware/validateJoi.js'
import { countrySchemaValidation } from '../validators/countryJoi.js'


router.post('/create', validate(countrySchemaValidation) ,countryController.createCountry)
router.get('/', countryController.getCountry)
router.put('/update/:id', countryController.updateCountry)
router.delete('/:id', countryController.deleteCountry)
export default router
