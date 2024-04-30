import React from 'react'

const dateTimeFormatter = (data) => {
 const splitDate = data.split("T")
let correctedHour = (Number(splitDate[1].slice(0,2))+2)%24
if(correctedHour == 1||correctedHour==2){
    correctedHour = `0${correctedHour}`
}
const correctedTime = correctedHour+splitDate[1].slice(2,5)
 return splitDate[0]+" at "+correctedTime
}

export default dateTimeFormatter
