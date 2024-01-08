interface IToken {
    token_type: string
    access_token: string
    employee_id: number
    employee_name: string
    employee_job_title: string
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

interface IStoreSection {
    store_section_id: number,
    store_section_name: string,
    store_id: number,
    created_at: Date,
    updated_at?: Date
}

interface IStoreSectionData extends IStoreSection {
    is_loaded: boolean
}

interface IStoreSectionsData {
    store_sections: IStoreSection[],
    is_loaded: boolean
}

interface ICount {
    count: number
}

interface ICountData extends ICount {
    is_loaded: boolean
}

interface ITotal {
    total_values: number
}

interface ITotalData extends ITotal {
    is_loaded: boolean
}

interface IIncident {
    incident_description: string
    product_name: string
    product_code: string
    product_quantity: string
    product_price: string
    total_value: string
    is_resolved: boolean
    store_section_id: number
    employee_id: number
    store_id: number
    region_id: number
    incident_id: number
    created_at: Date
    updated_at?: Date
}

interface IIncidentData extends IIncident {
    is_loaded: boolean
}

interface IIncidentsData {
    incidents: IIncident[],
    is_loaded: boolean
}

interface IMaxValue {
    store_section_name: string,
    max_value: number
}

interface IMaxValueData extends IMaxValue {
    is_loaded: boolean
}

interface INotoriousStore {
    store_name: string,
    max_value: number
}

interface INotoriousStoreData extends INotoriousStore {
    is_loaded: boolean
}

interface INotoriousRegion {
    region_name: string,
    max_value: number
}

interface INotoriousRegionData extends INotoriousRegion {
    is_loaded: boolean
}