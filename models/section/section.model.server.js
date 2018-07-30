var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}
function updateSection(section){

    var sectionId=section.id;

    return sectionModel
        .findOneAndUpdate(
            {_id:sectionId},
            {
                $set: {

                    name: section.name,
                    seats: section.seats,

                }
            },
            {upsert:true,
                returnNewDocument:true},

            function(err,data){
                if(err){
                    console.log("err")
                }
                else{
                    console.log("body" + data)
                    return data;
                }
            }
        )

}
function deleteSection(section){
    console.log("delete in section insde " + JSON.stringify(section));
    return sectionModel.deleteOne({name:section.name},
        function(err,data){
        if(err){
            console.log("err")
        }
        else{
            console.log("body1" + data)
            return data;
        }
    })
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    deleteSection:deleteSection,
    updateSection:updateSection,

};