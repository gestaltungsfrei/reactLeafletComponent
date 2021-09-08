import fetch from 'node-fetch'


export const fetchData = (req, res,next) => {
        if (req.locals.notUpdate){
                next()
        }
         const {id} = req.params
         fetch(`https://monde-diplomatique.de/archiv-text?text=${id}`)
              .then(res => res.text())
              .then(text => req.locals = {id: id, text: text})
              .then(() => next())            
    }