import Country from "../models/countryModel.js";


// find Country
export const findCountryByName = async(name) => {
return Country.findOne({countryName: {$regex: new RegExp(`^{name}$`, "i")}
});};


// findbyId
export const findCountryById = async(id) => {
return Country.findById(id)
}


// create Country
export const createCountry = async({countryName, countryCode})=>{
    const newCountry = new Country({countryName, countryCode})
    return newCountry.save()
}


// list of countries
export const getCountries = async({page, limit, search=''})=>{
const skip = (page - 1) * limit;
const query = search ? {countryName: {$regex: search, $option:'i'}} : {}
const [countries, total] = await Promise.all([Country.find(query).skip(skip).limit(limit),
    Country.countDocuments(query)
])
return{
    countries,
    total,
    page,
    totalPages: Math.ceil(total/limit)
}}


// update country
export const updatedCountry = (id, updatedData)=>{
    
    return Country.findByIdAndUpdate(id, updatedData, {new: true})
}

// deletedCountry
export const deletedCountry = (id) =>{
    return Country.findByIdAndDelete(id)
}