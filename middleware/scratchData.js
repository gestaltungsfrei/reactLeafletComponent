export const scratchData = (req, res, next) => {
    if (req.locals.notUpdate){
        next()
    }
    else{
        const {id, text} = req.locals
        const artArr = [];
        console.log('Found hits at: ', text.search('class="hits"'))
        const re = /(?<="count">..<.span>).*?("><span)/g
        const rawArr = [... text.matchAll(re)]
        rawArr.map(element => artArr.push(element[0]))
        req.locals = {id: id, artArr: artArr}
        next()
    }
}