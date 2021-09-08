import express from 'express';
const router = express.Router();

import {intoDB, showResultbyCountry} from '../controllers/countryController.js'
import {fetchData} from '../middleware/fetchData.js'
import {scratchData} from '../middleware/scratchData.js'
import {extractText} from '../middleware/extractText.js'
import { checkUpToDate } from '../controllers/countryController.js';


router.route('/:id').get(showResultbyCountry)

export default router




// router.route('/:id').get(showResultbyCountry ,checkUpToDate, fetchData, scratchData, extractText, intoDB)
