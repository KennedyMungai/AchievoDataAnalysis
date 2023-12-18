interface IToken {
    token_type: string
    access_token: string
    employee_id: number
    is_loaded: boolean
    is_logged_in: boolean
}

interface ICredentials {
    employee_email: string,
    employee_password: string
}

interface IRegion {
    region_id: number,
    region_name: string,
    created_at: Date,
    updated_at?: Date
}

interface IRegionData extends IRegion {
    is_loaded: boolean
}

interface IRegionsData {
    regions: IRegion[],
    is_loaded: boolean
}

interface IStore {
    store_name: string,
    store_location: string,
    created_at: Date,
    updated_at?: Date
    region_id: number
    store_id: number
}

interface IStoreData extends IStore {
    is_loaded: boolean
}

interface IStoresData {
    stores: IStore[],
    is_loaded: boolean
}

interface IEmployee {
    employee_id: number,
    employee_phone_number: string,
    employee_password: string,
    updated_at?: Date,
    region_id: 1,
    employee_name: string,
    employee_email: string,
    employee_job_title: string,
    created_at: Date,
    store_id: 1
}

interface IEmployeeData extends IEmployee {
    is_loaded: boolean
}

interface IEmployeesData {
    employees: IEmployee[],
    is_loaded: boolean
}

interface IStoreSection
{
    store_section_id: number,
    store_section_name: string,
    store_id: number,
    created_at: Date,
    updated_at?: Date
}

interface IStoreSectionData extends IStoreSection
{
    is_loaded: boolean
}

interface IStoreSectionsData
{
    store_sections: IStoreSection[],
    is_loaded: boolean
}

interface ICount
{
    count: number
}

interface ICountData extends ICount
{
    is_loaded: boolean
}