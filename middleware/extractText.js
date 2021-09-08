export const extractText = (req, res, next) => {
    const escapeHTML = str => str.replace(/(&.uml;)|(&szlig;)|(&eacute;)|(&aacute;)|(&agrave;)|(&egrave;)/g, 
    tag => ({
        '&Auml;': 'Ä',
        '&auml;': 'ä',
        '&Ouml;': 'Ö',
        '&ouml;': 'ö',
        '&Uuml;': 'Ü',
        '&uuml;': 'ü',
        '&szlig;': 'ß',
        '&eacute;': 'é',
        '&aacute;': 'á',
        '&agrave;': 'à',
        '&egrave;':'è'
      }[tag])); 
    
    if (req.locals.notUpdate){
        next()
    }
    else {
        const {artArr, id} = req.locals
        req.locals = []    
        artArr.map(element => {
            let endHead = element.indexOf('<')
            let head = element.slice(0,endHead)
            let newHead = escapeHTML(head)
            console.log('This should be escaped: ',newHead)
            head = newHead

            let dateEnd = element.indexOf('span')
            let date = element.slice((dateEnd-13),(dateEnd-3))
       
            let urlEnd = element.indexOf('"><span')
            let urlBegin = element.indexOf('="')
            let url = element.slice((urlBegin+2),urlEnd) 
        
            req.locals.push({head, date, url, country: id})   
        })
        next()
    }
}