function ValidateQuery(query) {
    let returnValue = 1
    let selectArgument = []
    let fromArgument = []
    let whereArgument_1 = ' '
    let whereArgument_2 = ' '
    let whereArgument_3 = ' '
    let andArgument_1 = ' '
    let andArgument_2 = ' '
    let andArgument_3 = ' '
    let groupByArgument = ' '
    
    let queries = query.split(/[ ,]+/)
    for(let i = 0; i < queries.length; i++) {
        if(queries[i].toUpperCase() === 'SELECT') {
            i++;
            while(queries[i].toUpperCase() !== 'FROM') {
                selectArgument.push(queries[i++].toUpperCase())
            }
            i--
        } 
        else if(queries[i].toUpperCase() === 'FROM') {
            fromArgument.push(queries[++i].toUpperCase())
            if(i + 1 < queries.length && queries[i+1].toUpperCase() === 'NATURAL' && 
               i + 2 < queries.length && queries[i+2].toUpperCase() === 'JOIN') {
                i += 3
                fromArgument.push(queries[i].toUpperCase())
            }
        } else if(queries[i].toUpperCase() === 'WHERE') {
            whereArgument_1 = queries[++i].toUpperCase()
            whereArgument_2 = queries[++i]
            whereArgument_3 = queries[++i]
            if(queries[++i] == 'AND') {
                andArgument_1 = queries[++i].toUpperCase()
                andArgument_2 = queries[++i]
                andArgument_3 = queries[++i]
            }
        } else if(queries[i].toUpperCase() === 'GROUP' && queries[i+1].toUpperCase() === 'BY') {
            i = i + 2
            groupByArgument = queries[i].toUpperCase()
        }else {
            returnValue = -1
        }
    }
    // console.log(selectArgument)
    // console.log(fromArgument)
    // console.log(whereArgument_1)
    // console.log(whereArgument_3)
    // return returnValue === 1 ? [selectArgument, fromArgument, whereArgument_1, whereArgument_3] : "Invalid SQL Query"
    return [selectArgument, fromArgument, whereArgument_1, whereArgument_3, andArgument_1, andArgument_3, groupByArgument]
}

export {ValidateQuery}