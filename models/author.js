let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let {DateTime} = require('luxon');

let AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

//Virtual for author's full name
AuthorSchema.virtual('name')
.get(function(){
    return this.family_name + ', ' + this.first_name;
});

//Virtual for author's lifespan
AuthorSchema.virtual('lifespan')
.get(function(){
    if(!this.date_of_death && !this.date_of_birth) return 'unavailable';
    if(!this.date_of_death) return (new Date().getYear() - this.date_of_birth.getYear()).toString();
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

AuthorSchema.virtual('date_birth_formatted')
.get(function(){
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual('date_death_formatted')
.get(function(){
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

//Virtual for author's URL
AuthorSchema.virtual('url')
.get(function(){
    return '/catalog/author/' + this._id;
});

//export model
module.exports = mongoose.model('Author', AuthorSchema);