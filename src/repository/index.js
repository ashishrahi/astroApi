import { CreateServiceListQuery, GetServiceListQuery, updateListQuery, deleteServiceQuery } from "../repository/serviceListRepository.js"

export const serviceListRepository = {
    CreateServiceListQuery :CreateServiceListQuery,
    GetServiceListQuery: GetServiceListQuery,
    updateListQuery: updateListQuery,
    deleteServiceQuery : deleteServiceQuery
}