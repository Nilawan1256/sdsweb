/* 
###### define lov value ######
module.exports.gender = {
    male: 1,
    female: 2,
}

module.exports.prefix = {
    mr: 1,
    miss: 2,
}

###### use lov_mapping ######
require file lov_mapping
const lov_mapping = require(../../mapping/lov_mapping);

let gender_text = '';
if(req.param.gender == lov_mapping.gender.male){
    gender_text = 'Male';
}else if(req.param.gender == lov_mapping.gender.female){
    gender_text = 'Female';
}
*/
